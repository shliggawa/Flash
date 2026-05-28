# Flash Module System Notes

Last updated: 2026-05-29

This repo currently hosts the early Flash module catalog and downloadable test packages.

## Catalog

`catalog.json` is the public module catalog read by Flash Store.

Each module entry should include:

- `id`
- `name`
- `shortName`
- `description`
- `latestVersion`
- `downloadUrl`
- `sha256`
- `minFlashVersion`
- `entryPage`
- `entry`
- `bannerUrl` or local module banner asset reference
- `changelog`

## Package

Current package shape:

```text
module.zip
  module.json
  entry.html
  assets/
```

Flash downloads the zip, verifies SHA256, extracts it, and loads `entry.html` from the installed module folder.

## Current Test Modules

- `ekflow-0.1.46.zip`: initial metadata package.
- `ekflow-0.1.47.zip`: module-host split test package with `entry.html`.
- `ekflow-0.1.48.zip`: runtime snapshot package copied from the current app and patched to boot directly into ekFlow mode.
- `ekflow-0.1.49.zip`: snapshot layout fix so installed ekFlow renders as an embedded module instead of a nested Flash shell.

## Release Process For A Module

1. Create `packages/<module-id>-<version>/`.
2. Add/update `module.json`.
3. Add/update `entry.html` and assets.
4. Zip package contents into `downloads/<module-id>-<version>.zip`.
5. Compute SHA256.
6. Update `catalog.json`.
7. Push to GitHub.

Later, replace `downloads/` in git with GitHub Releases or CDN URLs.
