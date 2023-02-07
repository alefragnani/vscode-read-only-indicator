## [3.9.0] - 2023-02-06
### Internal
- Support **Translation** and **Localization** APIs (issue [#77](https://github.com/alefragnani/vscode-read-only-indicator/issues/77))
- Update Badges (issue [#80](https://github.com/alefragnani/vscode-read-only-indicator/issues/80))
- Security Alert: minimap (dependabot [PR #79](https://github.com/alefragnani/vscode-read-only-indicator/pull/79))

## [3.8.1] - 2022-11-01
### Internal
- Remove incorrect **Virtual Workspace** support mention (issue [#74](https://github.com/alefragnani/vscode-read-only-indicator/issues/74))

## [3.8.0] - 2022-10-01
### Internal
- Package cleanup (issue [#71](https://github.com/alefragnani/vscode-read-only-indicator/issues/71))
- Improve extension startup (issue [#70](https://github.com/alefragnani/vscode-read-only-indicator/issues/70))
- Security Alert: terser (dependabot [PR #69](https://github.com/alefragnani/vscode-read-only-indicator/pull/69))

## [3.7.1] - 2022-07-16
### Fixed
- Wrong description on README (Thanks to @k-kuroguro [PR #60](https://github.com/alefragnani/vscode-read-only-indicator/pull/67))

### Internal
- Add GitHub Sponsors support (PR [#54](https://github.com/alefragnani/vscode-read-only-indicator/pull/66))


## [3.7.0] - 2021-12-18
### Added
- Support **Folder Level** commands for MacOS (Thanks to @zzhaolei [PR #60](https://github.com/alefragnani/vscode-read-only-indicator/pull/60))

### Changed
- Update Extension setting name (issue [#53](https://github.com/alefragnani/vscode-read-only-indicator/issues/53))

### Internal
- Add Contributing (issue [#56](https://github.com/alefragnani/vscode-read-only-indicator/issues/56))
- Support CreateStatusBarItem API (issue [#48](https://github.com/alefragnani/vscode-read-only-indicator/issues/48))

## [3.6.0] - 2021-09-01
### Added
- Support **Folder Level** commands (Thanks to @k-kuroguro [PR #49](https://github.com/alefragnani/vscode-read-only-indicator/pull/49))

### Fixed
- Typos in settings names (Thanks to @k-kuroguro [PR #51](https://github.com/alefragnani/vscode-read-only-indicator/pull/51))

## [3.5.0] - 2021-06-02
### Added
- Support **Virtual Workspaces** (issue [#44](https://github.com/alefragnani/vscode-read-only-indicator/issues/44))
- Support **Workspace Trust** (issue [#43](https://github.com/alefragnani/vscode-read-only-indicator/issues/43))
- New Command: `File Access: Toggle File Access` (Thanks to @k-kuroguro [PR #40](https://github.com/alefragnani/vscode-read-only-indicator/pull/40))

### Internal
- Dispose registered commands (issue [#47](https://github.com/alefragnani/vscode-read-only-indicator/issues/47))
- Security Alert: lodash (dependabot [PR #42](https://github.com/alefragnani/vscode-read-only-indicator/pull/42))

## [3.4.1] - 2021-04-02
### Internal
- Do not show welcome message if installed by Settings Sync (issue [#38](https://github.com/alefragnani/vscode-read-only-indicator/issues/38))
- Security Alert: y18n (dependabot [PR #37](https://github.com/alefragnani/vscode-read-only-indicator/pull/37))
- Security Alert: elliptic (dependabot [PR #35](https://github.com/alefragnani/vscode-read-only-indicator/pull/35))

## [3.4.0] - 2020-08-04
### Internal
- Use `vscode-ext-codicons` package (issue [#28](https://github.com/alefragnani/vscode-read-only-indicator/issues/28))

### Fixed
- Security Alert: elliptic (dependabot [PR #30](https://github.com/alefragnani/vscode-read-only-indicator/pull/30))
- Security Alert: lodash (dependabot [PR #29](https://github.com/alefragnani/vscode-read-only-indicator/pull/29))

## [3.3.0] - 2020-06-11
### Internal
- Migrate from TSLint to ESLint (issue [#27](https://github.com/alefragnani/vscode-read-only-indicator/issues/27))

## [3.2.0] - 2020-05-10 
### Added
- Only show indicator when Read-Only (issue [#15](https://github.com/alefragnani/vscode-read-only-indicator/issues/15)) - (Thanks to @chrisant996 [PR #24](https://github.com/alefragnani/vscode-read-only-indicator/pull/24))
- Settings to choose the colors of the Status Bar text, using `workbench.colorCustomizations` (Thanks to @chrisant996 [PR #24](https://github.com/alefragnani/vscode-read-only-indicator/pull/24))

## [3.1.0] - 2019-03-01 
### Added
- Settings changes detection (issue [#21](https://github.com/alefragnani/vscode-read-only-indicator/issues/21))

### Internal
- Support VS Code package split

## [3.0.4] - 2019-07-12 
### Fixed
- Security Alert: diff v3.5.0

## [3.0.3] - 2019-05-27
### Fixed
- Security Alert: tar

## [3.0.2] - 2019-03-13
### Fixed
- What's New page broken in VS Code 1.32 due to CSS API changes

## [3.0.1] - 2018-11-25
### Added
- What's New

## [2.3.0] - 2018-11-20
### Added
- Support to MacOS and Linux (Thanks to @joshwiker14 [PR #13](https://github.com/alefragnani/vscode-read-only-indicator/pull/13))

## [2.2.0] - 2018-11-04
### Added
- Setting to choose if the indicator will let you _choose_ or _automatically toggle_ the file access (Thanks to @TomChapple [PR #11](https://github.com/alefragnani/vscode-read-only-indicator/pull/11))

## [2.1.0] - 2018-09-15
### Added
- Patreon button

## [0.7.0 - 2.0.0] - 2017-10-20
### Internal
- First steps for Unit-Test (AppVeyor and Travis support)

## [0.6.0 - 1.4.0] - 2017-01-19
### Added
- New Command: `File Access: Change File Access` - the status bar indicator is now clickable (issue [#4](https://github.com/alefragnani/vscode-read-only-indicator/issues/4))

## [0.5.0 - 1.3.0] - 2017-01-18
### Added
- Setting to choose if the indicator will display _icon_, _text_ and _brackets_, or _only text_ in the status bar (issue [#5](https://github.com/alefragnani/vscode-read-only-indicator/issues/5))

## [0.4.0 - 1.2.0] - 2016-12-27
### Added
- Setting to choose if the indicator will be located at `left` or `right` in the status bar (issue [#3](https://github.com/alefragnani/vscode-read-only-indicator/issues/3))

## [0.3.0 - 1.1.0] - 2016-11-24
### Added
- New Command: `File Access: Make Read-Only`
- New Command: `File Access: Make Writeable`

## [0.2.0 - 1.0.0] - 2016-01-16
### Added
- License updated

## [0.0.1 - 0.9.0] - 2015-11-13
- Initial release