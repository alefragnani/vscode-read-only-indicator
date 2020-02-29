/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import fs = require("fs");
import { StatusBarAlignment, StatusBarItem, TextDocument, window, workspace } from "vscode";
import { UIMode } from "./constants";
import { Operations } from "./operations";
export class StatusBar {
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
            const readOnly = Operations.isReadOnly(doc);
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

    public hideReadOnly() {
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
        }
    }
}
