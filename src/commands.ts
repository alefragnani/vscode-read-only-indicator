/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands, QuickPickItem, QuickPickOptions, Uri, window, workspace } from "vscode";
import { FileAccess } from "./constants";
import { Container } from "./container";
import { Operations } from "./operations";
import { Controller } from "./statusBar/controller";

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
                toggleFileAccess();
                break;

            case "choose":
                changeFileAccess();
                break;

            default:
                console.log(`Received bad action '${action}'`);
                window.showErrorMessage(`No indicator action '${action}' is available`);
        }
    }

    function toggleFileAccess() {
        if(!Operations.isValidDocument(window.activeTextEditor)){
            return;
        }
        if (Operations.isReadOnly(window.activeTextEditor.document)) {
            updateFileAccess(FileAccess.Writeable);
        } else {
            updateFileAccess(FileAccess.ReadOnly);
        }
    }

    async function updateFileAccess(fileAccess: FileAccess) {
        if (await Operations.updateFileAccess(fileAccess)) {
            controller.updateStatusBar(fileAccess);
        }
    }

    async function updateFolderAccess(fileAccess: FileAccess, uri: Uri) {
        if (await Operations.updateFolderAccess(fileAccess, uri)) {
            controller.updateStatusBar(fileAccess); 
        }
    }

    Container.context.subscriptions.push(commands.registerCommand("readOnly.makeWriteable", () => {
        updateFileAccess(FileAccess.Writeable);
    }));

    Container.context.subscriptions.push(commands.registerCommand("readOnly.makeReadOnly", () => {
        updateFileAccess(FileAccess.ReadOnly);
    }));

    Container.context.subscriptions.push(commands.registerCommand("readOnly.makeWriteableRecursive", (uri?: Uri) => {
        if(!uri) return;
        updateFolderAccess(FileAccess.Writeable, uri);
    }));

    Container.context.subscriptions.push(commands.registerCommand("readOnly.makeReadOnlyRecursive", (uri?: Uri) => {
        if(!uri) return;
        updateFolderAccess(FileAccess.ReadOnly, uri);
    }));

    Container.context.subscriptions.push(commands.registerCommand("readOnly.changeFileAccess", () => {
        changeFileAccess();
    }));

    Container.context.subscriptions.push(commands.registerCommand("readOnly.toggleFileAccess", () => {
        toggleFileAccess();
    }));

    Container.context.subscriptions.push(commands.registerCommand("readOnly.indicatorAction", () => {
        indicatorAction();
    }));
}