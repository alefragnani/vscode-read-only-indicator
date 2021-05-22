/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Disposable, window, workspace } from "vscode";
import { FileAccess } from "./../constants";
import { Container } from "./../container";
import { StatusBar } from "./statusBar";

export class Controller {
    private statusBar: StatusBar;
    private disposable: Disposable;

    constructor() {
        this.statusBar = new StatusBar();
        this.statusBar.update();

        Container.context.subscriptions.push(this.statusBar);

        window.onDidChangeActiveTextEditor(() => {
            this.statusBar.update();
        }, null, Container.context.subscriptions);

        workspace.onDidChangeConfiguration(cfg => {
            if (cfg.affectsConfiguration("fileAccess.position")) {
                this.statusBar.dispose();
                this.statusBar = undefined;
                
                this.statusBar = new StatusBar();
            }
            if (cfg.affectsConfiguration("fileAccess")) {
                this.updateStatusBar();
            }
        }, null, Container.context.subscriptions);

        workspace.onDidGrantWorkspaceTrust(() => {
            this.statusBar.dispose();
            this.statusBar = undefined;
            
            this.statusBar = new StatusBar();
        })
    }

    public dispose() {
        this.disposable.dispose();
    }

    public updateStatusBar(fileAccess?: FileAccess) {
        this.statusBar.update(fileAccess);
    }
}
