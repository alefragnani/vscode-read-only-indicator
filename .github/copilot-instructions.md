# Read-Only Indicator VS Code Extension

Always reference these instructions first and fall back to additional search or terminal commands only when project files do not provide enough context.

## Project Overview

Read-Only Indicator is a Visual Studio Code extension that displays a read-only/writeable indicator in the status bar. The extension is built with TypeScript, webpack, and follows VS Code extension development patterns.

## Technology Stack

- Language: TypeScript
- Runtime: VS Code Extension API (Node + Web)
- Bundler: Webpack 5
- Linting: ESLint (`eslint-config-vscode-ext`)
- Testing: Mocha + `@vscode/test-electron`

## Working Effectively

Bootstrap and local setup:

```bash
git submodule init
git submodule update
npm install
```

Build and development quickstart:

```bash
npm run build
npm run lint
```

- Use `npm run watch` during active development.
- Use VS Code "Launch Extension" (F5) to validate behavior in Extension Development Host.
- Expected command timings are usually under 10 seconds.
- Never cancel `npm install`, `npm run watch`, or `npm test` once started.
## Build and Development Commands

- `npm run compile` - TypeScript compilation
- `npm run build` - Webpack development build
- `npm run watch` - Continuous webpack build
- `npm run lint` - ESLint validation
- `npm run test` - Full test suite
- `npm run vscode:prepublish` - Production build

## Testing and Validation

### Manual Testing Scenarios
1. Basic status bar indicator for read-only/writeable files.
2. Context-menu and command-palette file access commands.
3. Settings behavior (`fileAccess.uiMode`, `fileAccess.position`, `fileAccess.hideWhenWriteable`).

### CI Validation
- Run `npm run lint` before committing.
- CI runs on Windows, macOS, and Ubuntu.
- `ENOTFOUND update.code.visualstudio.com` during tests is expected in sandboxed environments.

## Project Structure and Key Files

```
src/
├── extension.ts          # Extension activation
├── commands.ts           # Command implementations
├── operations.ts         # File access operations
├── statusBar/
│   └── statusBar.ts      # Status bar indicator
├── container.ts          # Dependency container
└── test/                 # Test files

dist/                     # Webpack bundles (extension.js)
l10n/                     # Localization files
out/                      # Compiled TypeScript files
vscode-whats-new/         # Git submodule for What's New
```

## Coding Conventions and Patterns

### Indentation

- Use spaces, not tabs.
- Use 4 spaces for indentation.

### Naming Conventions

- Use PascalCase for `type` names
- Use PascalCase for `enum` values
- Use camelCase for `function` and `method` names
- Use camelCase for `property` names and `local variables`
- Use whole words in names when possible

### Types

- Do not export `types` or `functions` unless you need to share it across multiple components
- Do not introduce new `types` or `values` to the global namespace
- Prefer `const` over `let` when possible.

### Strings

- Prefer double quotes for new code; some existing files may still use single quotes.
- User-facing strings use two localization mechanisms:
  - **Manifest contributions** (commands, settings, walkthrough metadata): use `%key%` placeholders in `package.json`, with translations in `package.nls.json` and `package.nls.{LANGID}.json`. Do **not** use `l10n.t` for these.
  - **Runtime messages** (shown from extension code): use `l10n.t("message")`, with translations in `l10n/bundle.l10n.json` and `l10n/bundle.l10n.{LANGID}.json`.
- Externalized strings must not use string concatenation. Use placeholders instead (`{0}`).

### Code Quality

- All production source files under `src/` (excluding tests under `src/test`) must include the standard project copyright header
- Prefer `async` and `await` over `Promise` and `then` calls
- All user facing messages must be localized using the applicable localization framework (for example `l10n.t` method)
- Keep imports organized: VS Code first, then internal modules.
- Use semicolons at the end of statements.
- Keep changes minimal and aligned with existing style.

### Import Organization

- Import VS Code API first: `import * as vscode from "vscode"`
- Group related imports together
- Use named imports for specific VS Code types
- Import from local modules using relative paths

## Extension Features and Configuration

### Key Features
1. **File Status**: Status bar indicator for read-only/writeable files
2. **File Access Commands**: Context menu and command palette commands to change file access
3. **Multi-root workspace**: Manage file status per workspace folder
4. **Internationalization support**: Localization of all user-facing strings

### Important Settings
- `fileAccess.indicatorAction`

## Dependencies and External Tools

- No external runtime dependencies required beyond the VS Code extension stack.
- `VS Code-whats-new` submodule should be initialized for complete lint/test flows.

## Troubleshooting and Known Limitations

- Tests may fail in restricted networks due to VS Code download requirements.
- If extension host does not reflect changes, reload window or restart debug session.
- If status bar indicator is missing, verify an editable file is active.

## CI and Pre-Commit Validation

Before committing:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Run `npm run test-compile`.
4. Perform manual Extension Host validation.

## Common Tasks

1. Update command logic in `src/commands.ts`.
2. Update status bar behavior in `src/statusBar/statusBar.ts`.
3. Keep `package.json` command/settings contributions synchronized with code.
