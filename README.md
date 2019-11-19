# webcatalog-helper

webcatalog-helper is a simple Chrome/Firefox extension to improve usability of the Comiket Web Catalog (https://webcatalog.circle.ms/).

## Installation

### Chrome

https://chrome.google.com/webstore/detail/webcatalog-helper/epnfnpbamkifbioepdjekjhcjpddajga

### Firefox

Install via the XPI file on the [latest release](https://github.com/math4origami/webcatalog-helper/releases/latest). This file has been signed by Mozilla, and once installed the extension will auto-update when new releases are made.

## Features

### Favorites / お気に入り

> Note: [As of June 2019](https://docs.circle.ms/webcatalog/ctn/credit/001.html), you need a paid account in order to use Favorites.

![screenshot.png](images/screenshot.png)

* Adds the author name (執筆者名) between the circle name and genre.
* Enables clicking anywhere in the memo cell to open the memo text edit field.
* Autofocuses the text cursor on the memo text field when opened.
* Within the memo text field, adds keyboard shortcuts `Enter` or `Ctrl+S` to save changes, or `Esc` to revert changes.
* Changes the social media icons to links to their respective social media pages if present, instead of just going to circle info.

## Troubleshooting

### Firefox

![Firefox Override Keyboard Shortcuts setting](images/ff-permissions.png)

* In Firefox, the `Ctrl+S` hotkey may open the system `Save As` window. To disable this, open the [Page Info window](https://support.mozilla.org/en-US/kb/firefox-page-info-window), go to the `Permissions` tab, find the `Override Keyboard Shortcuts` line, and set it to `Allow`.

## Development

All code is contained in `src/script.js`.

### Releases

#### Chrome

TODO

#### Firefox

0. Bump the version in `manifest.json`.
1. Create the add-on zip with all necessary files: `manifest.json`, `updates.json`, `src/`, etc.
2. Sign the zip via the [Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/addons) ([alternatives](https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/#signing-your-addons)).
3. Download the signed zip, and upload to a [new Github release](https://github.com/math4origami/webcatalog-helper/releases/new).
4. Add a link to the new release to [`updates.json`](updates.json) (this can be done in the initial commit, [docs](https://extensionworkshop.com/documentation/manage/updating-your-extension/)).

## Meta

Written by Russell Chou ([@math4origami](https://twitter.com/math4origami)) with help from fc ([@usashiki7](https://twitter.com/usashiki7)). Distributed under the MIT license (see [`LICENSE`](LICENSE)). PRs welcome!
