/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { l10n, StatusBarAlignment, StatusBarItem, ThemeColor, window, workspace } from "vscode";
import { FileAccess, UIMode } from "./../constants";
import { Operations } from "./../operations";
import { codicons } from "vscode-ext-codicons";

export class StatusBar {
    private statusBarItem: StatusBarItem;

    constructor() {
        const locationString: string = (workspace.getConfiguration("fileAccess").get("position", "left"));
        const location: StatusBarAlignment = locationString === "left" ?
            StatusBarAlignment.Left : StatusBarAlignment.Right;
        
        this.statusBarItem = window.createStatusBarItem("fileAccess.statusBar", location);
        this.statusBarItem.name = "File Access";
        if (workspace.isTrusted) { 
            this.statusBarItem.command = "readOnly.indicatorAction";
        }
    }

    public dispose() {
        this.statusBarItem.dispose();
    }

    public update(fileAccess?: FileAccess) {
        
        if (!window.activeTextEditor) {
            this.statusBarItem.hide();
            return;
        }
        
        const activeDocument = window.activeTextEditor.document;
        if (activeDocument.isUntitled) {
            this.statusBarItem.hide();
            return;
        }

        // ui
        const uimode = workspace.getConfiguration("fileAccess").get<UIMode>("uiMode", UIMode.Complete);
        const readOnly = fileAccess ? fileAccess === FileAccess.ReadOnly : Operations.isReadOnly(activeDocument);

        // Update the status bar
        switch (uimode) {
            case UIMode.Complete:
                this.statusBarItem.text = !readOnly ? codicons.pencil + " [RW]" : codicons.lock_small + " [RO]";    
                break;
            case UIMode.Simple:
                this.statusBarItem.text = !readOnly ? "RW" : "RO";
                break;
            case UIMode.IconOnly:
                this.statusBarItem.text = !readOnly ? codicons.pencil : codicons.lock_small;
                break;
        
            default:
                break;
        }
        this.statusBarItem.color = new ThemeColor(readOnly 
                                    ? "fileAccess.readonlyForeground" 
                                    : "fileAccess.writeableForeground");

        this.statusBarItem.tooltip = !readOnly 
            ? l10n.t("The file is writeable") 
            : l10n.t("The file is read only");

        // Show or hide the status bar indicator as appropriate
        const show = readOnly || !workspace.getConfiguration("fileAccess").get("hideWhenWriteable", false);
        if (show) {
            this.statusBarItem.show();
        } else {
            this.statusBarItem.hide();
        }
    }
}
