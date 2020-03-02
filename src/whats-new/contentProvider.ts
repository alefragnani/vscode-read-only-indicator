/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { 
    ChangeLogItem, 
    ChangeLogKind, 
    ContentProvider, 
    Header, 
    Image, 
    Sponsor } from "../../vscode-whats-new/src/ContentProvider";

export class ReadOnlyIndicatorContentProvider implements ContentProvider {

    public provideHeader(logoUrl: string): Header {
        return <Header> {logo: <Image> {src: logoUrl, height: 50, width: 50}, 
            message: `Easily <b>see</b> if you are working with <b>read-only</b> or <b>writeable</b> files,
            right in the <b>status bar</b>, automatically. Do you need to <b>change the file access</b>? 
            No problem. You can do that as well.`};
    }

    public provideChangeLog(): ChangeLogItem[] {
        const changeLog: ChangeLogItem[] = [];
        changeLog.push({kind: ChangeLogKind.NEW, message: "Adds <b>MacOS</b> and <b>Linux</b> support"});
        changeLog.push({kind: ChangeLogKind.NEW, message: `Adds <b>Settings changes</b> detection (<a title=\"Open Issue #21\" 
            href=\"https://github.com/alefragnani/vscode-read-only-indicator/issues/21\">
            Issue #21</a>)`});
        changeLog.push({kind: ChangeLogKind.NEW, message: "Adds <b>Clickable</b> status bar indicator"});
        return changeLog;
    }

    public provideSponsors(): Sponsor[] {
        const sponsors: Sponsor[] = [];
        return sponsors
    }   
}
