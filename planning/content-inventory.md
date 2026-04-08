# Content Inventory

## Source Repositories

- `../jmonkeyengine-wiki/wiki/docs`
- `../jmonkeyengine-wiki/wiki/docs-wiki`

## Current Snapshot

- AsciiDoc pages: 273
- Navigation files: 10
- Partials: 5
- Primary content modules: `ROOT`, `tutorials`, `core`, `physics`, `networking`, `contributions`, `sdk`
- Admin/contributor component: `docs-wiki`

## Known Conversion Hotspots

- Antora `xref:` links across modules and components
- `include::` partials
- Image and resource path rewrites
- AsciiDoc tables
- UI macros such as `btn:`, `kbd:`, and `menu:`
- Video macros and embedded media
- Antora-only attributes such as `{link-javadoc}`

## Generated Artifacts

- `docs/` for converted Markdown docs
- `static/wiki-assets/` for copied assets and resources
- `sidebars.ts` generated from Antora nav files
- `planning/conversion-report.md` for unresolved references and unsupported patterns
