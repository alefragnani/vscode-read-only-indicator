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
    IssueKind, 
    Sponsor} from "../../vscode-whats-new/src/ContentProvider";

export class ReadOnlyIndicatorContentProvider implements ContentProvider {

    public provideHeader(logoUrl: string): Header {
        return <Header> {logo: <Image> {src: logoUrl, height: 50, width: 50}, 
            message: `Easily <b>see</b> if you are working with <b>read-only</b> or <b>writeable</b> files,
            right in the <b>status bar</b>, automatically. Do you need to <b>change the file access</b>? 
            No problem. You can do that as well.`};
    }

    public provideChangeLog(): ChangeLogItem[] {
        const changeLog: ChangeLogItem[] = [];
        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.2.0", releaseDate: "May 2020" } });

        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Only show indicator when Read-Only",
                id: 24,
                kind: IssueKind.PR,
                kudos: "@chrisant996"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Settings to choose the colors of the Status Bar text, using <b>workbench.colorCustomizations</b>",
                id: 24,
                kind: IssueKind.PR,
                kudos: "@chrisant996"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.1.0", releaseDate: "March 2020" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Settings changes detection",
                id: 21,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Support VS Code package split",
                id: 19,
                kind: IssueKind.Issue
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.0.4", releaseDate: "July 2019" } });
        changeLog.push({
            kind: ChangeLogKind.FIXED,
            detail: {
                message: "Security Alert: diff",
                id: 22,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.0.3", releaseDate: "May 2019" } });
        changeLog.push({
            kind: ChangeLogKind.FIXED,
            detail: {
                message: "Security Alert: tar",
                id: 16,
                kind: IssueKind.Issue
            }
        });

        return changeLog;
    }

    public provideSponsors(): Sponsor[] {
        const sponsors: Sponsor[] = [];
        return sponsors
    }   
}
