/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { StatusBarAlignment, StatusBarItem, ThemeColor, window, workspace } from "vscode";
import { FileAccess, UIMode } from "./../constants";
import { Operations } from "./../operations";
import { codicons } from "vscode-ext-codicons";

export class StatusBar {
    private statusBarItem: StatusBarItem;

    constructor() {
        const locationString: string = (workspace.getConfiguration("fileAccess").get("position", "left"));
        const location: StatusBarAlignment = locationString === "left" ?
            StatusBarAlignment.Left : StatusBarAlignment.Right;
        
        this.statusBarItem = window.createStatusBarItem(location);
        this.statusBarItem.command = "readOnly.indicatorAction";
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
        const uimodeString: string = (workspace.getConfiguration("fileAccess").get("uiMode", "complete"));
        const uimode: UIMode = uimodeString === "complete" ? UIMode.Complete : UIMode.Simple;
        const readOnly = fileAccess ? fileAccess === FileAccess.ReadOnly : Operations.isReadOnly(activeDocument);

        // Update the status bar
        if (uimode === UIMode.Complete) {
            this.statusBarItem.text = !readOnly ? codicons.pencil + " [RW]" : codicons.circle_slash + " [RO]";
        } else {
            this.statusBarItem.text = !readOnly ? "RW" : "RO";
        }
        this.statusBarItem.color = new ThemeColor(readOnly 
                                    ? "fileAccess.readonlyForeground" 
                                    : "fileAccess.writableForeground");

        this.statusBarItem.tooltip = !readOnly ? "The file is writeable" : "The file is read only";

        // Show or hide the status bar indicator as appropriate
        const show = readOnly || !workspace.getConfiguration("fileAccess").get("hideWhenWritable", false);
        if (show) {
            this.statusBarItem.show();
        } else {
            this.statusBarItem.hide();
        }
    }
}
