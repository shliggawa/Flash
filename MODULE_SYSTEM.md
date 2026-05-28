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

## Module Runtime Types

Flash now separates module ownership/install state from runtime loading:

- `native-module` / `runtime: bundled`: complex Resolve-native modules that ship inside Flash and use the main Electron preload bridge. Store install enables/unlocks the bundled runtime instead of downloading runnable UI code. ekFlow uses this path.
- `downloadable-module`: lightweight future modules that can safely run from installed files through a controlled module API.
- `content-pack`: presets, themes, assets, banners, templates, or packs for a target module. These are downloaded, verified, installed, and read by the target module.

Do not package ekFlow as an iframe snapshot again unless a proper module bridge/runtime exists. It depends on hotkeys, Resolve polling, active freeform, wheel overlays, and native IPC.

## Current Test Modules

- `ekflow-0.1.46.zip`: initial metadata package.
- `ekflow-0.1.47.zip`: module-host split test package with `entry.html`.
- `ekflow-0.1.48.zip`: runtime snapshot package copied from the current app and patched to boot directly into ekFlow mode.
- `ekflow-0.1.49.zip`: snapshot layout fix so installed ekFlow renders as an embedded module instead of a nested Flash shell.
- `ekflow-0.1.50`: no runnable zip. ekFlow is a bundled native module; catalog install/unlock state points Flash back to the built-in runtime.
- `ekflow-0.1.51`: no runnable zip. Flash 0.2.16 routes ekFlow to the restored pre-Flash 0.1.46 native page (`ekflow-native.html`) to avoid regressions from the Flash shell renderer.

## Release Process For A Module

1. Create `packages/<module-id>-<version>/`.
2. Add/update `module.json`.
3. Add/update `entry.html` and assets.
4. Zip package contents into `downloads/<module-id>-<version>.zip`.
5. Compute SHA256.
6. Update `catalog.json`.
7. Push to GitHub.

Later, replace `downloads/` in git with GitHub Releases or CDN URLs.
