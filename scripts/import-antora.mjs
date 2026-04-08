import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const sourceRoot = process.env.ANTORA_SOURCE
  ? path.resolve(process.env.ANTORA_SOURCE)
  : path.resolve(repoRoot, '../jmonkeyengine-wiki/wiki');
const docsOutDir = path.join(repoRoot, 'docs');
const staticOutDir = path.join(repoRoot, 'static', 'wiki-assets');
const reportPath = path.join(repoRoot, 'planning', 'conversion-report.md');
const sidebarsPath = path.join(repoRoot, 'sidebars.ts');
const JAVADOC_URL = 'https://javadoc.jmonkeyengine.org';

const SOURCE_COMPONENTS = [
  {name: 'docs', prefix: '', sourceDir: path.join(sourceRoot, 'docs')},
  {name: 'docs-wiki', prefix: 'wiki', sourceDir: path.join(sourceRoot, 'docs-wiki')},
];

const report = {
  unresolvedXrefs: [],
  unresolvedIncludes: [],
  unsupportedLines: [],
};

const pages = [];
const pageByKey = new Map();

await ensureDir(path.join(repoRoot, 'planning'));
await collectPages();
await resetOutputDirs();
await copyAssets();
await writePages();
await writeSidebars();
await writeReport();

async function collectPages() {
  for (const component of SOURCE_COMPONENTS) {
    const modulesDir = path.join(component.sourceDir, 'modules');
    const modules = await listDir(modulesDir);
    for (const moduleName of modules) {
      const pagesDir = path.join(modulesDir, moduleName, 'pages');
      if (!(await exists(pagesDir))) {
        continue;
      }
      const files = await walk(pagesDir);
      for (const file of files.filter((entry) => entry.endsWith('.adoc'))) {
        const relPath = path.relative(pagesDir, file).replaceAll(path.sep, '/');
        const relNoExt = relPath.slice(0, -'.adoc'.length);
        const outputBase =
          component.prefix === ''
            ? moduleName === 'ROOT'
              ? relNoExt
              : `${moduleName.toLowerCase()}/${relNoExt}`
            : `${component.prefix}/${relNoExt}`;
        const outputRel = `${outputBase}.md`;
        const record = {
          component: component.name,
          componentPrefix: component.prefix,
          componentSourceDir: component.sourceDir,
          module: moduleName,
          sourceFile: file,
          relPath,
          relNoExt,
          outputRel,
          docId: outputBase.replaceAll('\\', '/'),
        };
        pages.push(record);
        for (const key of pageKeys(record)) {
          pageByKey.set(key, record);
        }
      }
    }
  }
}

async function resetOutputDirs() {
  await fs.rm(docsOutDir, {recursive: true, force: true});
  await fs.rm(staticOutDir, {recursive: true, force: true});
  await fs.mkdir(docsOutDir, {recursive: true});
  await fs.mkdir(staticOutDir, {recursive: true});
}

async function copyAssets() {
  for (const component of SOURCE_COMPONENTS) {
    const modulesDir = path.join(component.sourceDir, 'modules');
    const modules = await listDir(modulesDir);
    for (const moduleName of modules) {
      const moduleDir = path.join(modulesDir, moduleName);
      for (const section of ['assets', 'resources']) {
        const sectionDir = path.join(moduleDir, section);
        if (!(await exists(sectionDir))) {
          continue;
        }
        const destDir = path.join(staticOutDir, component.name, moduleName, section);
        await copyTree(sectionDir, destDir);
      }
    }
  }
}

async function writePages() {
  for (const page of pages) {
    const raw = await fs.readFile(page.sourceFile, 'utf8');
    const expanded = await expandIncludes(raw, page);
    const converted = convertDocument(expanded, page);
    const destination = path.join(docsOutDir, page.outputRel);
    await ensureDir(path.dirname(destination));
    await fs.writeFile(destination, converted);
  }
}

async function writeSidebars() {
  const sidebarItems = [];
  const navFiles = [
    ['docs', 'ROOT'],
    ['docs', 'tutorials'],
    ['docs', 'core'],
    ['docs', 'physics'],
    ['docs', 'networking'],
    ['docs', 'contributions'],
    ['docs', 'sdk'],
    ['docs-wiki', 'ROOT'],
  ];

  for (const [componentName, moduleName] of navFiles) {
    const component = SOURCE_COMPONENTS.find((entry) => entry.name === componentName);
    const navPath = path.join(component.sourceDir, 'modules', moduleName, 'nav.adoc');
    if (!(await exists(navPath))) {
      continue;
    }
    const content = await fs.readFile(navPath, 'utf8');
    const items = parseNav(content, {
      component: componentName,
      module: moduleName,
    });
    sidebarItems.push(...items);
  }

  const serialized = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';\n\nconst sidebars: SidebarsConfig = {\n  docsSidebar: ${serialize(sidebarItems, 2)},\n};\n\nexport default sidebars;\n`;
  await fs.writeFile(sidebarsPath, serialized);
}

async function writeReport() {
  const lines = [
    '# Conversion Report',
    '',
    `Generated from \`${sourceRoot}\` on ${new Date().toISOString()}.`,
    '',
    '## Summary',
    '',
    `- Converted pages: ${pages.length}`,
    `- Unresolved xrefs: ${report.unresolvedXrefs.length}`,
    `- Unresolved includes: ${report.unresolvedIncludes.length}`,
    `- Unsupported lines: ${report.unsupportedLines.length}`,
    '',
    '## Unresolved Xrefs',
    '',
    ...listSection(report.unresolvedXrefs),
    '',
    '## Unresolved Includes',
    '',
    ...listSection(report.unresolvedIncludes),
    '',
    '## Unsupported Lines',
    '',
    ...listSection(report.unsupportedLines),
    '',
  ];
  await fs.writeFile(reportPath, lines.join('\n'));
}

function convertDocument(input, page) {
  const text = input.replaceAll('\r\n', '\n');
  const lines = text.split('\n');
  const converted = parseLines(lines, page);
  return `${converted.trim()}\n`;
}

function parseLines(lines, page) {
  const out = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      out.push('');
      continue;
    }

    if (/^:/.test(trimmed)) {
      continue;
    }

    if (/^\/\//.test(trimmed)) {
      continue;
    }

    const headingMatch = trimmed.match(/^(=+)\s+(.*)$/);
    if (headingMatch) {
      out.push(`${'#'.repeat(headingMatch[1].length)} ${transformInline(headingMatch[2], page)}`);
      continue;
    }

    const inlineAdmonition = trimmed.match(/^(TIP|NOTE|IMPORTANT|WARNING|CAUTION):\s*(.*)$/);
    if (inlineAdmonition) {
      out.push(`:::${inlineAdmonition[1].toLowerCase()}`);
      if (inlineAdmonition[2]) {
        out.push(transformInline(inlineAdmonition[2], page));
      }
      out.push(':::');
      out.push('');
      continue;
    }

    const blockAdmonition = trimmed.match(/^\[(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]$/);
    if (blockAdmonition && lines[i + 1]?.trim() === '====') {
      let j = i + 2;
      const inner = [];
      while (j < lines.length && lines[j].trim() !== '====') {
        inner.push(lines[j]);
        j += 1;
      }
      out.push(`:::${blockAdmonition[1].toLowerCase()}`);
      out.push(parseLines(inner, page).trim());
      out.push(':::');
      out.push('');
      i = j;
      continue;
    }

    const sourceMatch = trimmed.match(/^\[source(?:,([a-zA-Z0-9_+-]+))?[^\]]*\]$/);
    if (sourceMatch && lines[i + 1]?.trim() === '----') {
      let j = i + 2;
      const block = [];
      while (j < lines.length && lines[j].trim() !== '----') {
        block.push(lines[j]);
        j += 1;
      }
      out.push(`\`\`\`${sourceMatch[1] ?? ''}`.trimEnd());
      out.push(...block);
      out.push('```');
      out.push('');
      i = j;
      continue;
    }

    if (trimmed === '----') {
      let j = i + 1;
      const block = [];
      while (j < lines.length && lines[j].trim() !== '----') {
        block.push(lines[j]);
        j += 1;
      }
      out.push('```');
      out.push(...block);
      out.push('```');
      out.push('');
      i = j;
      continue;
    }

    if (trimmed === '....') {
      let j = i + 1;
      const block = [];
      while (j < lines.length && lines[j].trim() !== '....') {
        block.push(lines[j]);
        j += 1;
      }
      out.push('```');
      out.push(...block);
      out.push('```');
      out.push('');
      i = j;
      continue;
    }

    if (trimmed === '++++') {
      let j = i + 1;
      const block = [];
      while (j < lines.length && lines[j].trim() !== '++++') {
        const blockLine = lines[j].trim();
        if (blockLine.startsWith('<iframe')) {
          const srcMatch = blockLine.match(/\bsrc=([^ >]+)/);
          block.push(srcMatch ? `[Embedded content](${srcMatch[1]})` : transformInline(blockLine, page));
        } else {
          block.push(transformInline(lines[j], page));
        }
        j += 1;
      }
      out.push(...block);
      out.push('');
      i = j;
      continue;
    }

    if (trimmed.startsWith('[cols=')
      && lines[i + 1]?.trim() === '|===') {
      const {tableLines, endIndex} = collectDelimitedBlock(lines, i + 1, '|===');
      out.push(renderTable(lines[i], tableLines, page));
      out.push('');
      i = endIndex;
      continue;
    }

    if (trimmed === '|===') {
      const {tableLines, endIndex} = collectDelimitedBlock(lines, i, '|===');
      out.push(renderTable('', tableLines, page));
      out.push('');
      i = endIndex;
      continue;
    }

    if (/^\[\.[\w-]+\]$/.test(trimmed)) {
      continue;
    }

    if (trimmed === '+') {
      out.push('');
      continue;
    }

    if (trimmed === "'''") {
      out.push('---');
      continue;
    }

    if (trimmed.startsWith('video::')) {
      out.push(transformInline(trimmed, page));
      continue;
    }

    if (trimmed.startsWith('<iframe')) {
      const srcMatch = trimmed.match(/\bsrc=([^ >]+)/);
      out.push(srcMatch ? `[Embedded content](${srcMatch[1]})` : transformInline(trimmed, page));
      continue;
    }

    if (trimmed.startsWith('image::')) {
      out.push(transformInline(trimmed, page));
      continue;
    }

    const ordered = line.match(/^(\.+)\s+(.*)$/);
    if (ordered) {
      out.push(`${'  '.repeat(ordered[1].length - 1)}1. ${transformInline(ordered[2], page)}`);
      continue;
    }

    const unordered = line.match(/^(\*+)\s+(.*)$/);
    if (unordered) {
      out.push(`${'  '.repeat(unordered[1].length - 1)}- ${transformInline(unordered[2], page)}`);
      continue;
    }

    const anchorMatch = trimmed.match(/^\[\[([^\]]+)\]\]$/);
    if (anchorMatch) {
      out.push(`<a id="${anchorMatch[1]}"></a>`);
      continue;
    }

    if (trimmed.includes('ifdef::') || trimmed.includes('ifndef::') || trimmed.includes('ifeval::')) {
      report.unsupportedLines.push(`${page.relPath}: ${trimmed}`);
      continue;
    }

    out.push(transformInline(line, page));
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function transformInline(line, page) {
  let result = line;
  result = result.replace(/^\s*image::([^\[]+)\[(.*?)\]\s*$/, (_match, target, attrs) => {
    const alt = extractBracketText(attrs) || path.basename(target);
    return `![${escapeBrackets(alt)}](${resolveAssetUrl(target, page)})`;
  });
  result = result.replace(/video::([^\[]+)\[(.*?)\]/g, (_match, target) => {
    const url = `https://www.youtube.com/watch?v=${target}`;
    return `[Video](${url})`;
  });
  result = result.replace(/\{link-javadoc\}/g, JAVADOC_URL);
  result = result.replace(/\{orgname\}/g, 'jMonkeyEngine');
  result = result.replace(/\+\+\+(.+?)\+\+\+/g, '$1');
  result = result.replace(/pass:\[(.*?)\]/g, '$1');
  result = result.replace(/menu:([^\[]+)\[([^\]]+)\]/g, (_match, head, tail) => `"${head} > ${tail}"`);
  result = result.replace(/btn:\[([^\]]+)\]/g, '**$1**');
  result = result.replace(/kbd:\[([^\]]+)\]/g, '`$1`');
  result = result.replace(/xref:([^\[]+)\[([^\]]*)\]/g, (_match, target, label) => convertXref(target, label, page));
  result = result.replace(/<<([^,>]+),\s*([^>]+)>>/g, (_match, target, label) => convertXref(target, label, page));
  result = result.replace(/<<([^>]+)>>/g, (_match, target) => convertXref(target, '', page));
  result = result.replace(/link:([^\[]+)\[([^\]]*)\]/g, (_match, target, label) => convertLink(target, label, page));
  result = result.replace(/(https?:\/\/[^\s\[]+)\[([^\]]+)\]/g, (_match, url, label) => `[${escapeBrackets(label)}](${url})`);
  result = result.replace(/&amp;/g, '&');
  return sanitizeInline(result);
}

function convertLink(target, label, page) {
  const text = label || target;
  if (/^(https?:)?\/\//.test(target) || target.startsWith('mailto:')) {
    return `[${escapeBrackets(text)}](${target})`;
  }
  if (target.endsWith('.adoc')) {
    return convertXref(target, label, page);
  }
  const assetUrl = resolveAssetUrl(target, page, {allowFallback: true});
  return `[${escapeBrackets(text)}](${assetUrl})`;
}

function convertXref(rawTarget, label, page) {
  const normalized = rawTarget.replace('#.adoc', '.adoc').trim();
  const [targetPath, anchor = ''] = normalized.split('#');
  if (targetPath.startsWith('http://') || targetPath.startsWith('https://')) {
    return `[${escapeBrackets(label || targetPath)}](${normalized})`;
  }

  const resolved = resolvePageTarget(targetPath, page);
  if (!resolved) {
    report.unresolvedXrefs.push(`${page.relPath} -> ${rawTarget}`);
    return label || rawTarget;
  }

  const relativeTarget = path
    .relative(path.dirname(page.outputRel), resolved.outputRel)
    .replaceAll(path.sep, '/');
  const href = `${relativeTarget}${anchor ? `#${slugifyAnchor(anchor)}` : ''}`;
  const text = label || resolved.relNoExt.split('/').at(-1);
  return `[${escapeBrackets(text)}](${href})`;
}

function resolvePageTarget(targetPath, currentPage) {
  if (!targetPath || targetPath === '#') {
    return currentPage;
  }

  const tokens = targetPath.split(':');
  const candidates = [];

  if (tokens.length === 3) {
    candidates.push(`${tokens[0]}:${tokens[1]}:${normalizeDocTarget(tokens[2])}`);
  } else if (tokens.length === 2 && tokens[0] !== '') {
    candidates.push(`${currentPage.component}:${tokens[0]}:${normalizeDocTarget(tokens[1])}`);
    candidates.push(`docs:${tokens[0]}:${normalizeDocTarget(tokens[1])}`);
    candidates.push(`docs-wiki:${tokens[0]}:${normalizeDocTarget(tokens[1])}`);
  } else if (targetPath.includes('::')) {
    const [component, docPath] = targetPath.split('::');
    candidates.push(`${component}:ROOT:${normalizeDocTarget(docPath)}`);
  } else {
    const docTarget = normalizeDocTarget(targetPath);
    candidates.push(`${currentPage.component}:${currentPage.module}:${docTarget}`);
    candidates.push(`${currentPage.component}:ROOT:${docTarget}`);
    candidates.push(`docs:${currentPage.module}:${docTarget}`);
    candidates.push(`docs:ROOT:${docTarget}`);
    candidates.push(`docs-wiki:ROOT:${docTarget}`);
  }

  for (const candidate of candidates) {
    const match = pageByKey.get(candidate);
    if (match) {
      return match;
    }
  }

  return null;
}

function resolveAssetUrl(target, page, options = {}) {
  if (/^(https?:)?\/\//.test(target)) {
    return target;
  }
  if (target.startsWith('/')) {
    return target;
  }

  let moduleName = page.module;
  let cleaned = target.replace(/^attachment\$/, '').replace(/^image\$/, '');
  if (/^[a-zA-Z0-9_-]+:/.test(cleaned) && !cleaned.startsWith('http')) {
    const colonIndex = cleaned.indexOf(':');
    moduleName = cleaned.slice(0, colonIndex).replace(/^docs-/, '');
    cleaned = cleaned.slice(colonIndex + 1).replace(/^\//, '');
  }
  const assetCandidates = [
    `/wiki-assets/${page.component}/${moduleName}/assets/images/${cleaned}`,
    `/wiki-assets/${page.component}/${moduleName}/assets/attachments/${cleaned}`,
    `/wiki-assets/${page.component}/${moduleName}/resources/${cleaned}`,
    `/wiki-assets/docs/${moduleName}/assets/images/${cleaned}`,
    `/wiki-assets/docs/${moduleName}/assets/attachments/${cleaned}`,
    `/wiki-assets/docs/${moduleName}/resources/${cleaned}`,
  ];

  for (const candidate of assetCandidates) {
    const absolute = path.join(repoRoot, 'static', candidate.replace(/^\//, ''));
    if (existsSync(absolute)) {
      return candidate;
    }
  }

  return options.allowFallback ? cleaned : assetCandidates[0];
}

function renderTable(attributesLine, tableLines, page) {
  const colCountMatch = attributesLine.match(/cols="(\d+)/);
  const colCount = colCountMatch ? Number(colCountMatch[1]) : null;
  const hasHeader = attributesLine.includes('options="header"');
  const cells = [];
  let current = null;

  for (const rawLine of tableLines) {
    const line = rawLine.trimEnd();
    const match = line.match(/^\s*((?:\d+\+)?[<^>]?(?:[a-z])?\|)(.*)$/);
    if (match) {
      if (current) {
        cells.push(current);
      }
      const prefix = match[1];
      const spanMatch = prefix.match(/(\d+)\+/);
      current = {
        colspan: spanMatch ? Number(spanMatch[1]) : 1,
        content: [transformInline(match[2].trim(), page)],
      };
    } else if (current) {
      current.content.push(transformInline(line.trim(), page));
    }
  }
  if (current) {
    cells.push(current);
  }

  const rows = [];
  let row = [];
  let width = 0;
  const targetCols = colCount ?? Math.max(1, cells.length);
  for (const cell of cells) {
    row.push(cell);
    width += cell.colspan;
    if (width >= targetCols) {
      rows.push(row);
      row = [];
      width = 0;
    }
  }
  if (row.length > 0) {
    rows.push(row);
  }

  const parts = ['<table>'];
  const bodyRows = [...rows];
  if (hasHeader && bodyRows.length > 0) {
    const header = bodyRows.shift();
    parts.push('  <thead>');
    parts.push('    <tr>');
    for (const cell of header) {
      parts.push(renderCell(cell, 'th', 3));
    }
    parts.push('    </tr>');
    parts.push('  </thead>');
  }
  parts.push('  <tbody>');
  for (const bodyRow of bodyRows) {
    parts.push('    <tr>');
    for (const cell of bodyRow) {
      parts.push(renderCell(cell, 'td', 3));
    }
    parts.push('    </tr>');
  }
  parts.push('  </tbody>');
  parts.push('</table>');
  return parts.join('\n');
}

function renderCell(cell, tag, indentLevel) {
  const attrs = cell.colspan > 1 ? ` colspan="${cell.colspan}"` : '';
  const indent = '  '.repeat(indentLevel);
  return `${indent}<${tag}${attrs}>${cell.content.join('<br />')}</${tag}>`;
}

function collectDelimitedBlock(lines, startIndex, delimiter) {
  const tableLines = [];
  let j = startIndex + 1;
  while (j < lines.length && lines[j].trim() !== delimiter) {
    tableLines.push(lines[j]);
    j += 1;
  }
  return {tableLines, endIndex: j};
}

async function expandIncludes(input, page) {
  const lines = input.replaceAll('\r\n', '\n').split('\n');
  const out = [];
  for (const line of lines) {
    const includeMatch = line.trim().match(/^include::([^\[]+)\[[^\]]*\]$/);
    if (!includeMatch) {
      out.push(line);
      continue;
    }
    const target = includeMatch[1];
    const includePath = resolveIncludeTarget(target, page);
    if (!includePath || !(await exists(includePath))) {
      report.unresolvedIncludes.push(`${page.relPath} -> ${target}`);
      continue;
    }
    const included = await fs.readFile(includePath, 'utf8');
    out.push(included);
  }
  return out.join('\n');
}

function resolveIncludeTarget(target, page) {
  const moduleDir = path.join(page.componentSourceDir, 'modules', page.module);
  if (target.startsWith('partial$')) {
    return path.join(moduleDir, 'partials', target.slice('partial$'.length));
  }
  if (target.startsWith('attachment$')) {
    return path.join(moduleDir, 'assets', 'attachments', target.slice('attachment$'.length));
  }
  if (target.startsWith('./') || target.startsWith('../')) {
    return path.resolve(path.dirname(page.sourceFile), target);
  }
  if (target.includes(':partial$')) {
    const [moduleName, rel] = target.split(':partial$');
    return path.join(page.componentSourceDir, 'modules', moduleName, 'partials', rel);
  }
  return null;
}

function parseNav(content, pageContext) {
  const lines = content.replaceAll('\r\n', '\n').split('\n');
  const root = [];
  const stack = [{indent: 0, items: root}];

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line || line.trimStart().startsWith('//')) {
      continue;
    }
    const match = line.match(/^(\*+)\s+(.*)$/);
    if (!match) {
      continue;
    }

    const depth = match[1].length;
    const body = match[2];
    let item;
    const xrefMatch = body.match(/^xref:([^\[]+)\[([^\]]+)\]$/);
    const externalMatch = body.match(/^(?:link:)?((?:https?:)?\/\/[^\[]+)\[([^\]]+)\]$/);
    const attrLinkMatch = body.match(/^\{link-javadoc\}\[([^\]]+)\]$/);

    if (xrefMatch) {
      const resolved = resolvePageTarget(xrefMatch[1], {
        ...pageContext,
        outputRel: 'index.md',
        relPath: 'nav.adoc',
      });
      if (!resolved) {
        report.unresolvedXrefs.push(`nav:${pageContext.component}/${pageContext.module} -> ${xrefMatch[1]}`);
        item = {type: 'html', value: xrefMatch[2], defaultStyle: true};
      } else {
        item = {
          type: 'doc',
          id: resolved.docId,
          label: xrefMatch[2],
        };
      }
    } else if (externalMatch) {
      item = {
        type: 'link',
        label: externalMatch[2],
        href: externalMatch[1],
      };
    } else if (attrLinkMatch) {
      item = {
        type: 'link',
        label: attrLinkMatch[1],
        href: JAVADOC_URL,
      };
    } else {
      item = {
        type: 'category',
        label: transformInline(body, {
          ...pageContext,
          outputRel: 'index.md',
          relPath: 'nav.adoc',
        }),
        items: [],
      };
    }

    while (stack.length > 1 && stack.at(-1).indent >= depth) {
      stack.pop();
    }

    stack.at(-1).items.push(item);
    if (item.type === 'category') {
      stack.push({indent: depth, items: item.items});
    }
  }

  return root;
}

function pageKeys(page) {
  const docTarget = normalizeDocTarget(page.relPath);
  const keys = new Set([
    `${page.component}:${page.module}:${docTarget}`,
    `${page.module}:${docTarget}`,
    docTarget,
  ]);
  if (page.module === 'ROOT') {
    keys.add(`${page.component}::${docTarget}`);
    keys.add(`ROOT:${docTarget}`);
  }
  return keys;
}

function normalizeDocTarget(target) {
  return target.replace(/^\.\//, '').replaceAll('\\', '/');
}

function escapeBrackets(value) {
  return value.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
}

function extractBracketText(attrs) {
  const first = attrs.split(',')[0].trim();
  return first.replace(/^"/, '').replace(/"$/, '');
}

function slugifyAnchor(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function listSection(items) {
  if (items.length === 0) {
    return ['- None'];
  }
  return items.slice(0, 200).map((item) => `- ${item}`);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, {recursive: true});
}

async function copyTree(src, dest) {
  await ensureDir(dest);
  for (const entry of await fs.readdir(src, {withFileTypes: true})) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyTree(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else {
      files.push(entryPath);
    }
  }
  return files;
}

async function listDir(dir) {
  return (await fs.readdir(dir, {withFileTypes: true}))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

function serialize(value, indent = 0) {
  const spacing = ' '.repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    return `[\n${value
      .map((item) => `${spacing}  ${serialize(item, indent + 2)}`)
      .join(',\n')}\n${spacing}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    return `{\n${entries
      .map(([key, item]) => `${spacing}  ${key}: ${serialize(item, indent + 2)}`)
      .join(',\n')}\n${spacing}}`;
  }
  return JSON.stringify(value);
}

function sanitizeInline(value) {
  let result = value;
  result = result.replace(
    /<iframe\b[^>]*\bsrc=([^ >]+)[^>]*><\/iframe>/g,
    (_match, url) => `[Embedded content](${url})`,
  );
  result = result.replace(/[{}]/g, (char) => (char === '{' ? '&#123;' : '&#125;'));
  result = result.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return result;
}
