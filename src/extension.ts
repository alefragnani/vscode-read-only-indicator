import {commands, ExtensionContext, QuickPickItem, QuickPickOptions, window, workspace} from "vscode";

import { WhatsNewManager } from "../vscode-whats-new/src/Manager";
import { ReadOnlyIndicatorController } from "./controller";
import { FileAccess, Operations } from "./operations";
import { ReadOnlyIndicator } from "./statusBar";
import { WhatsNewReadOnlyIndicatorContentProvider } from "./whats-new/ReadOnlyIndicatorContentProvider";

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
                if (Operations.isReadOnly(window.activeTextEditor.document)) {
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

    async function updateFileAccess(fileAccess: FileAccess) {
        if (await Operations.updateFileAccess(fileAccess)) {
            readOnlyIndicator.updateReadOnly();
        };
    }
}
