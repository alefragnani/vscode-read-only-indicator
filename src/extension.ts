/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ExtensionContext } from "vscode";
import { registerCommands } from "./commands";
import { Container } from "./container";
import { registerWhatsNew } from "./whats-new/command";

export function activate(ctx: ExtensionContext) { 

    Container.context = ctx;

    registerWhatsNew();
    registerCommands();
}
