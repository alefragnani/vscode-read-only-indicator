import { Disposable, window } from "vscode";
import { Container } from "./container";
import { StatusBar } from "./statusBar";

export class Controller {
    private statusBar: StatusBar;
    private disposable: Disposable;

    constructor() {
        this.statusBar = new StatusBar();
        this.statusBar.updateReadOnly();

        Container.context.subscriptions.push(this.statusBar);

        // subscribe to selection change and editor activation events
        const subscriptions: Disposable[] = [];
        window.onDidChangeActiveTextEditor(this.onEvent, this, subscriptions);
        
        // create a combined disposable from both event subscriptions
        this.disposable = Disposable.from(...subscriptions);
    }

    public dispose() {
        this.disposable.dispose();
    }

    public updateStatusBar() {
        this.statusBar.updateReadOnly();
    }

    private onEvent() {
        this.statusBar.updateReadOnly();
    }
}
