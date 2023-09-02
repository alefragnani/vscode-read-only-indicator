/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Alessandro Fragnani. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fs from "fs";
import { ConfigurationTarget, TextDocument, TextEditor, FileType, Uri, window, workspace, l10n, commands } from "vscode";
import { FileAccess, Scope } from "./constants";
import { minimatch } from "minimatch2";

export class Operations {
    public static updateEditorFileAccess(newFileAccess: FileAccess): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (!this.isValidDocument(window.activeTextEditor)) {
                return resolve(false);
            }

            if (Operations.isFileReadonlyPermissions(window.activeTextEditor.document.fileName)) {
                window.showInformationMessage(l10n.t("The file is read only"));
                return resolve(false);
            }

            const isReadOnly: boolean = this.isReadOnly(window.activeTextEditor.document);
            const activeFileAcess: FileAccess = isReadOnly ? FileAccess.ReadOnly : FileAccess.Writeable;

            if (newFileAccess === activeFileAcess) {
                const activeFileAcessDescription: string = isReadOnly ? l10n.t("Read-only") : l10n.t("Writeable");
                window.showInformationMessage(l10n.t("The file is already {0}", activeFileAcessDescription));
                return resolve(false);
            }
            return resolve(this.updateFileAccess(newFileAccess, window.activeTextEditor.document.uri));
        });
    }

    public static updateFileAccess(newFileAccess: FileAccess, uri: Uri): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                if (!fs.statSync(uri.fsPath).isFile()) {
                    return resolve(false);
                }
            } catch (error) {
                return resolve(false);
            }

            const filePath = uri.fsPath;
            if (newFileAccess === FileAccess.ReadOnly) {
                if (this.internalIsReadOnly(filePath)) {
                    return false;
                }
                this.updateReadOnly(filePath, true);
            } else if (newFileAccess === FileAccess.Writeable) {
                if (!this.internalIsReadOnly(filePath)) {
                    return false;
                }
                this.updateReadOnly(filePath, false);
            }
            return resolve(true);
        });
    }

    public static updateFolderAccess(newFileAccess: FileAccess, uri: Uri): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                if (!fs.statSync(uri.fsPath).isDirectory()) {
                    return resolve(false);
                }
            } catch (error) {
                resolve(false);
            }

            const path = "**/" + workspace.asRelativePath(uri.fsPath) + "/**";
            if (newFileAccess === FileAccess.ReadOnly) {
                this.updateReadOnly(path, true);
            } else if (newFileAccess === FileAccess.Writeable) {
                this.updateReadOnly(path, false);
            }
            return resolve(true);
        });
    }

    public static isReadOnly(doc: TextDocument): boolean {
        return this.internalIsReadOnly(doc.fileName);
    }

    private static internalIsReadOnly(filePath: string): boolean {
        filePath = this.convertPath(filePath);

        const config = workspace.getConfiguration("files");
        const readonlyExclude: { [key: string]: boolean } = config.get("readonlyExclude");
        for (const pattern in readonlyExclude) {
            if (readonlyExclude[pattern] && minimatch(filePath, pattern)) {
                return this.isFileReadonlyPermissions(filePath);
            }
        }

        const readonlyInclude: { [key: string]: boolean } = config.get("readonlyInclude");
        for (const pattern in readonlyInclude) {
            if (readonlyInclude[pattern] && minimatch(filePath, pattern)) {
                return true;
            }
        }

        return this.isFileReadonlyPermissions(filePath);
    }

    public static isFileReadonlyPermissions(filePath: string): boolean {
        try {
            fs.accessSync(filePath, fs.constants.W_OK);
            return false;
        } catch (error) {
            return true;
        }
    }

    public static isValidDocument(textEditor: TextEditor | undefined): boolean {
        if (!textEditor) {
            window.showInformationMessage(l10n.t("Open a file first to update it attributes"));
            return false;
        }
        if (textEditor.document.uri.scheme === "untitled") {
            window.showInformationMessage(l10n.t("Save the file first to update it attributes"));
            return false;
        }
        return true;
    }

    public static getFileType(uri: Uri): FileType {
        const stat = fs.statSync(uri.fsPath);
        if (stat.isFile()) return FileType.File;
        if (stat.isDirectory()) return FileType.Directory;
        if (stat.isSymbolicLink()) return FileType.SymbolicLink;
        return FileType.Unknown;
    }

    private static convertPath(pattern: string): string {
        switch (process.platform) {
            case "win32":
                pattern = pattern.replace(/\\/g, "/");
        }
        return pattern;
    }

    public static updateReadOnly(pattern: string, addInInclude = true): void {
        pattern = this.convertPath(pattern);

        const config = workspace.getConfiguration("files");
        const readonlyInclude: { [key: string]: boolean } = config.get("readonlyInclude", {});
        const readonlyExclude: { [key: string]: boolean } = config.get("readonlyExclude", {});
        if (addInInclude) {
            readonlyExclude[pattern] = undefined;
            readonlyInclude[pattern] = true;
        } else {
            readonlyInclude[pattern] = undefined;
            readonlyExclude[pattern] = true;
        }

        // scope
        const scopeString: string = workspace.getConfiguration("fileAccess").get("scope", "workspace");
        const scope: Scope = scopeString === "workspace" ? Scope.Workspace : Scope.User;
        let target = ConfigurationTarget.Workspace;
        if (scope === Scope.User) {
            target = ConfigurationTarget.Global;
        }
        config.update("readonlyInclude", readonlyInclude, target);
        config.update("readonlyExclude", readonlyExclude, target);

        try {
            if (fs.statSync(pattern).isFile()) {
                commands.executeCommand("workbench.action.files.toggleActiveEditorReadonlyInSession");
            }
        } catch (error) {}
    }
}
