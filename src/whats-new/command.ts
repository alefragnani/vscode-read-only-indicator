import { commands } from "vscode";
import { WhatsNewManager } from "../../vscode-whats-new/src/Manager";
import { Container } from "../container";
import { ReadOnlyIndicatorContentProvider } from "./contentProvider";

export function registerWhatsNew() {
    const provider = new ReadOnlyIndicatorContentProvider();
    const viewer = new WhatsNewManager(Container.context).registerContentProvider("read-only-indicator", provider);
    viewer.showPageInActivation();
    Container.context.subscriptions.push(commands.registerCommand("readOnly.whatsNew", () => viewer.showPage()));
}
