# Read-Only Indicator VSCode Extension

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

Read-Only Indicator is a Visual Studio Code extension that displays a read-only/writeable indicator in the status bar. The extension is built with TypeScript, webpack, and follows VSCode extension development patterns.

## Working Effectively

### Bootstrap, Build, and Test the Repository

**Prerequisites:**
- Git >= 2.22.0  
- Node.js >= 14.17.27

**Initial Setup:**
```bash
git clone https://github.com/alefragnani/vscode-read-only-indicator.git
cd vscode-read-only-indicator
git submodule init
git submodule update
npm install
```

**Build Commands:**
- `npm run build` -- Development build using webpack. Takes ~2.5 seconds. NEVER CANCEL.
- `npm run vscode:prepublish` -- Production build using webpack with minification. Takes ~3.2 seconds. NEVER CANCEL.
- `npm run watch` -- Development build in watch mode. Initial build ~2.5 seconds, then incremental updates. NEVER CANCEL.

**Testing Commands:**
- `npm run lint` -- ESLint validation. Takes ~1 second. Expect exactly 7 existing warnings (non-breaking).
- `npm run test` -- Full test suite including compilation and VSCode test runner. Takes ~5 seconds for compilation, but test execution will fail with `ENOTFOUND update.code.visualstudio.com` in sandboxed environments - this is expected and not a code issue.
- `npm run compile` -- TypeScript compilation only. Takes ~2.4 seconds.
- `npm run test-compile` -- TypeScript compilation + webpack build. Takes ~4.9 seconds.

### Development Workflow

**For VSCode Extension Development:**
1. Open the project in VSCode
2. Run the bootstrap steps above
3. Press `F5` or use "Launch Extension" debug configuration to start a new Extension Development Host
4. The extension will be loaded in the new VSCode window
5. Open any file to see the read-only/writeable indicator in the status bar

**For Code Changes:**
1. Make changes to TypeScript files in `src/`
2. Run `npm run build` to compile (or use `npm run watch` for continuous building)
3. Test changes using `F5` debug launch or "Reload Window" command in Extension Development Host
4. Always run `npm run lint` before committing changes

## Validation

### Manual Testing Scenarios

**After making changes, always test these scenarios:**

1. **Basic Status Bar Indicator:**
   - Open any regular file - should show read-only `[RO]` or writeable `[RW]` indicator in status bar
   - Open an untitled file - indicator should be hidden
   - Close all files - indicator should be hidden

2. **File Access Commands:**
   - Right-click a file in Explorer (Windows/Mac only) - should show "Make Read Only" and "Make Writeable" context menu options
   - Use Command Palette commands: "File Access: Make Read Only", "File Access: Make Writeable", "File Access: Change File Access", "File Access: Toggle File Access"
   - Click the status bar indicator - should show toggle or choice dialog based on `fileAccess.indicatorAction` setting

3. **Settings Configuration:**
   - Test different `fileAccess.uiMode` values: "complete", "simple", "iconOnly"
   - Test different `fileAccess.position` values: "left", "right"  
   - Test `fileAccess.hideWhenWriteable: true` - indicator should hide for writeable files

**CRITICAL**: Extensions cannot be fully tested without VSCode UI interaction. Use the Launch Extension debug configuration to manually verify functionality works as expected.

### CI Validation
- Always run `npm run lint` before committing - CI will fail on linting errors
- CI build process: `npm install` → `npm test` (includes compile + lint + tests)
- CI runs on Windows, macOS, and Ubuntu  
- Test failures due to network connectivity (`ENOTFOUND update.code.visualstudio.com`) are expected in sandboxed environments

### Build Times Summary
All build times measured on typical development environment:
- `npm install`: ~3 seconds (after submodule init)
- `npm run compile`: ~2.4 seconds  
- `npm run build`: ~2.5 seconds
- `npm run vscode:prepublish`: ~3.2 seconds
- `npm run lint`: ~1 second
- `npm run test-compile`: ~4.9 seconds

## Common Tasks

### Repository Structure
```
.
├── .github/           # GitHub Actions workflows and templates
├── .vscode/          # VSCode settings, tasks, and launch configs
├── dist/             # Webpack production build output  
├── images/           # Extension icons and screenshots
├── l10n/             # Localization files
├── out/              # TypeScript compilation output
├── src/              # Source code
│   ├── commands.ts       # Command implementations
│   ├── constants.ts      # Shared constants and enums
│   ├── container.ts      # Dependency injection container
│   ├── extension.ts      # Main extension entry point
│   ├── operations.ts     # File system operations
│   ├── statusBar/        # Status bar implementation
│   ├── test/            # Test files
│   └── whats-new/       # What's New feature
├── vscode-whats-new/ # Git submodule for What's New functionality
├── package.json      # Extension manifest and dependencies
├── tsconfig.json     # TypeScript configuration
└── webpack.config.js # Webpack build configuration
```

### Key Files for Development

**Main Extension Logic:**
- `src/extension.ts` - Extension activation and initialization
- `src/commands.ts` - All extension commands (toggle, change access, etc.)
- `src/statusBar/statusBar.ts` - Status bar indicator implementation
- `src/operations.ts` - File access operations (Windows/macOS file attribute changes)

**Configuration:**
- `package.json` - Extension manifest, commands, settings, activation events
- `.vscode/launch.json` - Debug configurations for extension development
- `.vscode/tasks.json` - Build tasks for VSCode

**Build System:**
- `webpack.config.js` - Webpack configuration for bundling
- `tsconfig.json` - TypeScript compiler options

### Frequently Used Commands Output

**npm scripts (package.json):**
```json
{
  "build": "webpack --mode development",
  "watch": "webpack --watch --mode development", 
  "vscode:prepublish": "webpack --mode production",
  "compile": "tsc -p ./",
  "lint": "eslint -c package.json --ext .ts src vscode-whats-new",
  "test": "npm run test-compile && npm run just-test"
}
```

**Extension Commands (package.json contributes.commands):**
- `readOnly.makeWriteable` - Make current file writeable
- `readOnly.makeReadOnly` - Make current file read-only  
- `readOnly.changeFileAccess` - Show picker to choose access level
- `readOnly.toggleFileAccess` - Toggle between read-only and writeable
- `readOnly.makeWriteableForContextMenu` - Context menu: make writeable
- `readOnly.makeReadOnlyForContextMenu` - Context menu: make read-only

## Troubleshooting

**Build Issues:**
- If `npm install` fails: ensure Node.js >= 14.17.27 and npm are properly installed
- If submodule errors occur: run `git submodule init && git submodule update`
- If webpack build fails: delete `node_modules` and `dist/` directories, then `npm install && npm run build`

**Test Issues:**
- Test failures with `ENOTFOUND update.code.visualstudio.com` are expected in sandboxed environments
- For local development, ensure internet connectivity for VSCode download during tests
- Use `npm run compile && npm run lint` to validate code without running VSCode tests

**Extension Development Issues:**
- If Extension Development Host doesn't start: ensure VSCode is properly installed and accessible
- If changes don't appear: use "Reload Window" command in Extension Development Host or restart the debug session
- If status bar doesn't appear: check that files are open and not untitled

**NEVER CANCEL long-running builds or tests.** Builds typically complete in 2-3 seconds, tests in ~10 seconds for compilation phase.