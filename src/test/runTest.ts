import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
	// Keep macOS test profile paths short to avoid the VS Code IPC socket path limit.
	const testTempDir = fs.mkdtempSync(
		process.platform === 'darwin'
			? '/tmp/roi-vscode-test-'
			: path.join(os.tmpdir(), 'roi-vscode-test-')
	);
	let exitCode = 0;

	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		// Download VS Code, unzip it and run the integration test
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs: [
				`--extensions-dir=${path.join(testTempDir, 'ext')}`,
				`--user-data-dir=${path.join(testTempDir, 'data')}`
			]
		});
	} catch (err) {
		console.error(err);
		console.error('Failed to run tests');
		exitCode = 1;
	} finally {
		try {
			fs.rmSync(testTempDir, { recursive: true, force: true });
		} catch (err) {
			console.error(`Failed to clean up test temporary directory: ${testTempDir}`, err);
		}
	}

	if (exitCode !== 0) {
		process.exit(exitCode);
	}
}

main();
