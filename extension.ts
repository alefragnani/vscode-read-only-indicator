// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {window, workspace, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';
import fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: ExtensionContext) { 

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "read-only-indicator" is now active!'); 

	// create a new read only indicator
    let readOnlyIndicator = new ReadOnlyIndicator();
    let controller = new ReadOnlyIndicatorController(readOnlyIndicator);

    // add to a list of disposables which are disposed when this extension
    // is deactivated again.
    ctx.subscriptions.push(controller);
    ctx.subscriptions.push(readOnlyIndicator);
}

export class ReadOnlyIndicator {

    private statusBarItem: StatusBarItem;

    dispose() {
        this.hideReadOnly();
    }

    public updateReadOnly() {

        // Create as needed
        if (!this.statusBarItem) {
            this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        } 

        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            this.statusBarItem.hide();
            return;
        }

        let doc = editor.document;

        // Only update status if an MD file
        if (!doc.isUntitled) {
            let readOnly = this.isReadOnly(doc);

            // Update the status bar
            this.statusBarItem.text = !readOnly ? '$(pencil) [RW]' : '$(circle-slash) [RO]';
			this.statusBarItem.tooltip = !readOnly ? 'The file is writeable' : 'The file is read only';
            this.statusBarItem.show();
        } else {
            this.statusBarItem.hide();
        }
    }
	
	public isReadOnly(doc: TextDocument): Boolean {
		let filePath = doc.fileName;
		try {
				fs.accessSync(filePath, fs.W_OK);
				return false;
			} catch (error) {
				return true;
			}
	}
    
    public hideReadOnly() {
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
        }
    }
}

class ReadOnlyIndicatorController {

    private readOnlyIndicator: ReadOnlyIndicator;
    private disposable: Disposable;

    constructor(wordCounter: ReadOnlyIndicator) {
        this.readOnlyIndicator = wordCounter;
        this.readOnlyIndicator.updateReadOnly();

        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this.onEvent, this, subscriptions);

        // create a combined disposable from both event subscriptions
        this.disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this.disposable.dispose();
    }

    private onEvent() {
        this.readOnlyIndicator.updateReadOnly();
    }
}