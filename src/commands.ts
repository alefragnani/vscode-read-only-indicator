/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Alessandro Fragnani. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { commands, FileType, l10n, QuickPickItem, QuickPickOptions, Uri, window, workspace } from "vscode";
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
        const options = <QuickPickOptions>{
            placeHolder: l10n.t("Select Action"),
        };

        window.showQuickPick(items, options).then((selection) => {
            if (typeof selection === "undefined") {
                return;
            }

            if (selection.label === "File Access: Make Read Only") {
                updateEditorFileAccess(FileAccess.ReadOnly);
            } else {
                updateEditorFileAccess(FileAccess.Writeable);
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
                window.showErrorMessage(l10n.t("No indicator action '{0}' is available", action));
        }
    }

    function toggleFileAccess() {
        if (!Operations.isValidDocument(window.activeTextEditor)) {
            return;
        }
        if (Operations.isReadOnly(window.activeTextEditor.document)) {
            updateEditorFileAccess(FileAccess.Writeable);
        } else {
            updateEditorFileAccess(FileAccess.ReadOnly);
        }
    }

    async function updateEditorFileAccess(fileAccess: FileAccess) {
        if (await Operations.updateEditorFileAccess(fileAccess)) {
            controller.updateStatusBar(fileAccess);
        }
    }

    async function updateFileAccess(fileAccess: FileAccess, uri: Uri) {
        if (await Operations.updateFileAccess(fileAccess, uri)) {
            controller.updateStatusBar(fileAccess);
        }
    }

    async function updateFolderAccess(fileAccess: FileAccess, uri: Uri) {
        if (await Operations.updateFolderAccess(fileAccess, uri)) {
            controller.updateStatusBar(fileAccess);
        }
    }

    async function updateByFileType(fileAccess: FileAccess, uri: Uri) {
        const fileType = Operations.getFileType(uri);
        if (fileType === FileType.File) {
            updateFileAccess(fileAccess, uri);
            return;
        }
        if (fileType === FileType.Directory) {
            const fileAccessDescription: string =
                fileAccess === FileAccess.ReadOnly ? l10n.t("Read-only") : l10n.t("Writeable");
            const userSelection = await window.showInformationMessage(
                l10n.t("Are you sure you want to make files in {0} {1} recursive?", uri.fsPath, fileAccessDescription),
                l10n.t("Make {0}", fileAccessDescription),
                l10n.t("Cancel")
            );
            if (userSelection === l10n.t("Cancel")) return;
            updateFolderAccess(fileAccess, uri);
        }
    }

    Container.context.subscriptions.push(
        commands.registerCommand("readOnly.makeWriteable", () => {
            updateEditorFileAccess(FileAccess.Writeable);
        })
    );

    Container.context.subscriptions.push(
        commands.registerCommand("readOnly.makeReadOnly", () => {
            updateEditorFileAccess(FileAccess.ReadOnly);
        })
    );

    Container.context.subscriptions.push(
        commands.registerCommand("readOnly.makeWriteableForContextMenu", (uri?: Uri) => {
            if (!uri) return;
            updateByFileType(FileAccess.Writeable, uri);
        })
    );

    Container.context.subscriptions.push(
        commands.registerCommand("readOnly.makeReadOnlyForContextMenu", (uri?: Uri) => {
            if (!uri) return;
            updateByFileType(FileAccess.ReadOnly, uri);
        })
    );

    Container.context.subscriptions.push(
        commands.registerCommand("readOnly.changeFileAccess", () => {
            changeFileAccess();
        })
    );

    Container.context.subscriptions.push(
        commands.registerCommand("readOnly.toggleFileAccess", () => {
            toggleFileAccess();
        })
    );

    Container.context.subscriptions.push(
        commands.registerCommand("readOnly.indicatorAction", () => {
            indicatorAction();
        })
    );
}
