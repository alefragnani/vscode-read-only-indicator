import { commands, QuickPickItem, QuickPickOptions, window, workspace } from "vscode";
import { FileAccess } from "./constants";
import { Container } from "./container";
import { Controller } from "./controller";
import { Operations } from "./operations";

export function registerCommands() {

    const controller = new Controller();
    Container.context.subscriptions.push(controller);

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
                updateFileAccess(FileAccess.ReadOnly);
            } else {
                updateFileAccess(FileAccess.Writeable);
            }
        });
    }
    
    function indicatorAction() {
        const action: string = workspace.getConfiguration("fileAccess").get("indicatorAction");
        switch (action) {
            case "toggle":
                if (Operations.isReadOnly(window.activeTextEditor.document)) {
                    updateFileAccess(FileAccess.Writeable);
                } else {
                    updateFileAccess(FileAccess.ReadOnly);
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
    
    async function updateFileAccess(fileAccess: FileAccess) {
        if (await Operations.updateFileAccess(fileAccess)) {
            controller.updateStatusBar();
        };
    }
    
    commands.registerCommand("readOnly.makeWriteable", () => {        
        updateFileAccess(FileAccess.Writeable);
    });
    
    commands.registerCommand("readOnly.makeReadOnly", () => {        
        updateFileAccess(FileAccess.ReadOnly);
    });    
    
    commands.registerCommand("readOnly.changeFileAccess", () => {
        changeFileAccess();
    });

    commands.registerCommand("readOnly.indicatorAction", () => {
        indicatorAction();
    });
}