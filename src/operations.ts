import * as fs from "fs";
import { ParameterInformation, TextDocument, window } from "vscode";

export type FileAccess = "+R" | "-R";

export class Operations {

    public static updateFileAccess(newFileAccess: FileAccess): Promise<boolean> {
            
        return new Promise<boolean>((resolve, reject) => {

            if (!window.activeTextEditor) {
                window.showInformationMessage("Open a file first to update it attributes");
                return resolve (false);
            }
            
            if (window.activeTextEditor.document.uri.scheme === "untitled") {
                window.showInformationMessage("Save the file first to update it attributes");
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
                    attribute = (newFileAccess === "+R") ? "u-w" : "u+w";
                    break;
                default:
                    window.showInformationMessage(
                        "This command is not supported on this system (" + process.platform + ")");
                    return resolve (false);
            }

            const isReadOnly: boolean = this.isReadOnly(window.activeTextEditor.document);
            const activeFileAcess: FileAccess = isReadOnly ? "+R" : "-R";

            if (newFileAccess === activeFileAcess) {
                let activeFileAcessDescription: string;
                activeFileAcessDescription = isReadOnly ? "Read-only" : "Writeable";
                window.showInformationMessage("The file is already " + activeFileAcessDescription);
                return resolve (false);
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

}