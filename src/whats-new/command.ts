/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands } from "vscode";
import { WhatsNewManager } from "../../vscode-whats-new/src/Manager";
import { Container } from "../container";
import { ReadOnlyIndicatorContentProvider, ReadOnlyIndicatorSocialMediaProvider } from "./contentProvider";

export function registerWhatsNew() {
    const provider = new ReadOnlyIndicatorContentProvider();
    const viewer = new WhatsNewManager(Container.context)
                        .registerContentProvider("alefragnani", "read-only-indicator", provider)
                        .registerSocialMediaProvider(new ReadOnlyIndicatorSocialMediaProvider());
    viewer.showPageInActivation();
    Container.context.subscriptions.push(commands.registerCommand("readOnly.whatsNew", () => viewer.showPage()));
}
