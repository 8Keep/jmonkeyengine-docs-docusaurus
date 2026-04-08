# jMonkeyEngine Docs on Docusaurus

Experimental Docusaurus migration of the jMonkeyEngine Antora wiki.

## Commands

```bash
npm install
npm run convert:content
npm run build
```

The importer reads from the sibling repo at `../jmonkeyengine-wiki/wiki` by default.
Override with `ANTORA_SOURCE=/path/to/wiki npm run convert:content`.

## Tracking

Planning and migration notes live in [`planning/migration-plan.md`](./planning/migration-plan.md).
