/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { StatusBarAlignment, StatusBarItem, window, workspace } from "vscode";
import { FileAccess, UIMode } from "./../constants";
import { Operations } from "./../operations";
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
        const colorConfigString: string = (workspace.getConfiguration("fileAccess").get(readOnly ? "readonlyColor" : "writableColor", "none"));
        const colorString: string = colorConfigString === "none" || colorConfigString === "" ? "" : colorConfigString;

        // Update the status bar
        if (uimode === UIMode.Complete) {
            this.statusBarItem.text = !readOnly ? "$(pencil) [RW]" : "$(circle-slash) [RO]";
        } else {
            this.statusBarItem.text = !readOnly ? "RW" : "RO";
        }
        if (colorString != "") {
            this.statusBarItem.color = colorString;
        }

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
