import { Disposable, window } from "vscode";
import { ReadOnlyIndicator } from "./statusBar";
export class ReadOnlyIndicatorController {
    private readOnlyIndicator: ReadOnlyIndicator;
    private disposable: Disposable;
    constructor(wordCounter: ReadOnlyIndicator) {
        this.readOnlyIndicator = wordCounter;
        this.readOnlyIndicator.updateReadOnly();
        // subscribe to selection change and editor activation events
        const subscriptions: Disposable[] = [];
        window.onDidChangeActiveTextEditor(this.onEvent, this, subscriptions);
        // create a combined disposable from both event subscriptions
        this.disposable = Disposable.from(...subscriptions);
    }
    public dispose() {
        this.disposable.dispose();
    }
    private onEvent() {
        this.readOnlyIndicator.updateReadOnly();
    }
}
