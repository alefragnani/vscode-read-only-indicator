import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');
		const testTempDir = process.platform === 'darwin' && fs.existsSync('/tmp')
			? `/tmp/roi-vscode-test-${process.pid}`
			: path.join(os.tmpdir(), `roi-vscode-test-${process.pid}`);

		// Download VS Code, unzip it and run the integration test
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs: [
				`--extensions-dir=${path.join(testTempDir, 'extensions')}`,
				`--user-data-dir=${path.join(testTempDir, 'user-data')}`
			]
		});
	} catch (err) {
		console.error(err);
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
