/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import * as fs from "fs";
import { TextDocument, TextEditor, window } from "vscode";
import { FileAccess } from "./constants";

export class Operations {

    public static updateFileAccess(newFileAccess: FileAccess): Promise<boolean> {
            
        return new Promise<boolean>((resolve, reject) => {

            if(!this.isValidDocument(window.activeTextEditor)){
                return resolve (false);
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
                    attribute = (newFileAccess === FileAccess.ReadOnly) ? "u-w" : "u+w";
                    break;
                default:
                    window.showInformationMessage(
                        "This command is not supported on this system (" + process.platform + ")");
                    return resolve (false);
            }

            const isReadOnly: boolean = this.isReadOnly(window.activeTextEditor.document);
            const activeFileAcess: FileAccess = isReadOnly ? FileAccess.ReadOnly : FileAccess.Writeable;

            if (newFileAccess === activeFileAcess) {
                const activeFileAcessDescription: string = isReadOnly ? "Read-only" : "Writeable";
                window.showInformationMessage("The file is already " + activeFileAcessDescription);
                return resolve (false);
            }  
            
            // eslint-disable-next-line @typescript-eslint/no-var-requires
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
                return resolve(true);
            });  
        });        
    }

    public static isReadOnly(doc: TextDocument): boolean {
        const filePath = doc.fileName;
        try {
            fs.accessSync(filePath, fs.constants.W_OK);
            return false;
        } catch (error) {
            return true;
        }
    }

    public static isValidDocument(textEditor: TextEditor | undefined): boolean {
        if (!textEditor) {
           window.showInformationMessage("Open a file first to update it attributes");
           return false;
        }
        if (textEditor.document.uri.scheme === "untitled") {
           window.showInformationMessage("Save the file first to update it attributes");
           return false;
        }
        return true;
    }

}