import {commands, ExtensionContext, QuickPickItem, QuickPickOptions, window, workspace} from "vscode";

import { WhatsNewManager } from "../vscode-whats-new/src/Manager";
import { registerCommands } from "./commands";
import { Container } from "./container";
import { WhatsNewReadOnlyIndicatorContentProvider } from "./whats-new/ReadOnlyIndicatorContentProvider";

export function activate(ctx: ExtensionContext) { 

    Container.context = ctx;

    const provider = new WhatsNewReadOnlyIndicatorContentProvider();
    const viewer = new WhatsNewManager(ctx).registerContentProvider("read-only-indicator", provider);
    viewer.showPageInActivation();
    ctx.subscriptions.push(commands.registerCommand("readOnly.whatsNew", () => viewer.showPage()));

    registerCommands();
}
