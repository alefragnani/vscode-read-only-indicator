/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import fs = require("fs");
import {commands, Disposable, ExtensionContext, QuickPickItem, QuickPickOptions, StatusBarAlignment, 
        StatusBarItem, TextDocument, window, workspace} from "vscode";

import { WhatsNewManager } from "../vscode-whats-new/src/Manager";
import { WhatsNewReadOnlyIndicatorContentProvider } from "./whats-new/ReadOnlyIndicatorContentProvider";

type FileAccess = "+R" | "-R";

const enum UIMode {
    Complete,
    Simple
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: ExtensionContext) { 

    // create a new read only indicator
    const readOnlyIndicator = new ReadOnlyIndicator();
    const controller = new ReadOnlyIndicatorController(readOnlyIndicator);

    const provider = new WhatsNewReadOnlyIndicatorContentProvider();
    const viewer = new WhatsNewManager(ctx).registerContentProvider("read-only-indicator", provider);
    viewer.showPageInActivation();
    ctx.subscriptions.push(commands.registerCommand("readOnly.whatsNew", () => viewer.showPage()));

    // add to a list of disposables which are disposed when this extension
    // is deactivated again.
    ctx.subscriptions.push(controller);
    ctx.subscriptions.push(readOnlyIndicator);
    
    function updateFileAccess(newFileAccess: FileAccess) {
        
        if (!window.activeTextEditor) {
            window.showInformationMessage("Open a file first to update it attributes");
            return;
        }
        
        if (window.activeTextEditor.document.uri.scheme === "untitled") {
            window.showInformationMessage("Save the file first to update it attributes");
            return;
        }
        
        // determine what operating system we are running on and change the
        // command and arguments used to change the file permissions
        let command;
        let attribute;
        switch (process.platform) {
            case "win32":
                command = "attrib";
                attribute = newFileAccess.toString();
                break;
            case "linux":
            case "darwin": /* darwin is the response for macos */
                command = "chmod";
                // 'u' for user, '-w' for remove write permission
                attribute = (newFileAccess === "+R") ? "u-w" : "u+w";
                break;
            default:
                window.showInformationMessage(
                    "This command is not supported on this system (" + process.platform + ")");
                return;
        }

        const isReadOnly: boolean = readOnlyIndicator.isReadOnly(window.activeTextEditor.document);
        const activeFileAcess: FileAccess = isReadOnly ? "+R" : "-R";

        if (newFileAccess === activeFileAcess) {
            let activeFileAcessDescription: string;
            activeFileAcessDescription = isReadOnly ? "Read-only" : "Writeable";
            window.showInformationMessage("The file is already " + activeFileAcessDescription);
            return;
        }  
        
        const spawn = require("child_process").spawn;
        const ls = spawn(command, [attribute, window.activeTextEditor.document.fileName]);

        ls.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on("data", (data) => {
            console.log(`stderr: ${data}`);
            window.showErrorMessage(`Some error occured: ${data}`);
        });

        ls.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
            readOnlyIndicator.updateReadOnly();
        });  
    }
    
    function changeFileAccess() {
        const items: QuickPickItem[] = [];
        items.push({ label: "File Access: Make Read Only", description: "" });
        items.push({ label: "File Access: Make Writeable", description: "" });
        const options = <QuickPickOptions> {
            placeHolder: "Select Action"
        };

        window.showQuickPick(items, options).then(selection => {
            if (typeof selection === "undefined") {
                return;
            }
            
            if (selection.label === "File Access: Make Read Only") {
                updateFileAccess("+R");
            } else {
                updateFileAccess("-R");
            }
        });
    }

    function indicatorAction() {
        const action: string = workspace.getConfiguration("fileAccess").get("indicatorAction");
        switch (action) {
            case "toggle":
                if (readOnlyIndicator.isReadOnly(window.activeTextEditor.document)) {
                    updateFileAccess("-R");
                } else {
                    updateFileAccess("+R");
                }
                break;

            case "choose":
                changeFileAccess();
                break;

            default:
                console.log(`Received bad action '${action}'`);
                window.showErrorMessage(`No indicator action '${action}' is available`);
        }
    }
    
    commands.registerCommand("readOnly.makeWriteable", () => {        
        updateFileAccess("-R");
    });
    
    commands.registerCommand("readOnly.makeReadOnly", () => {        
        updateFileAccess("+R");
    });    
    
    commands.registerCommand("readOnly.changeFileAccess", () => {
        changeFileAccess();
    });

    commands.registerCommand("readOnly.indicatorAction", () => {
        indicatorAction();
    });
}

export class ReadOnlyIndicator {

    private statusBarItem: StatusBarItem;

    public dispose() {
        this.hideReadOnly();
    }

    public updateReadOnly() {
        
        // ui
        const uimodeString: string = (workspace.getConfiguration("fileAccess").get("uiMode", "complete"));
        const uimode: UIMode = uimodeString === "complete" ? UIMode.Complete : UIMode.Simple;
        
        // location
        const locationString: string = (workspace.getConfiguration("fileAccess").get("position", "left"));
        const location: StatusBarAlignment = locationString === "left" ? 
            StatusBarAlignment.Left : StatusBarAlignment.Right;

        // Create as needed
        if (!this.statusBarItem) {
            this.statusBarItem = window.createStatusBarItem(location);
            this.statusBarItem.command = "readOnly.indicatorAction";
        } 

        // Get the current text editor
        const editor = window.activeTextEditor;
        if (!editor) {
            this.statusBarItem.hide();
            return;
        }

        const doc = editor.document;

        // Only update status if an MD file
        if (!doc.isUntitled) {
            const readOnly = this.isReadOnly(doc);

            // Update the status bar
            if (uimode === UIMode.Complete) {
                this.statusBarItem.text = !readOnly ? "$(pencil) [RW]" : "$(circle-slash) [RO]";
            } else {
                this.statusBarItem.text = !readOnly ? "RW" : "RO";
            }
            this.statusBarItem.tooltip = !readOnly ? "The file is writeable" : "The file is read only";
            this.statusBarItem.show();
        } else {
            this.statusBarItem.hide();
        }
    }

    public isReadOnly(doc: TextDocument): boolean {
        const filePath = doc.fileName;
        try {
            fs.accessSync(filePath, fs.constants.W_OK);
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
        const subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this.onEvent, this, subscriptions);

        // create a combined disposable from both event subscriptions
        this.disposable = Disposable.from(...subscriptions);
    }

    public dispose() {
        this.disposable.dispose();
    }

    private onEvent() {
        this.readOnlyIndicator.updateReadOnly();
    }
}
