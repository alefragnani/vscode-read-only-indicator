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
    SupportChannel,
    SocialMediaProvider} from "../../vscode-whats-new/src/ContentProvider";

export class ReadOnlyIndicatorContentProvider implements ContentProvider {

    public provideHeader(logoUrl: string): Header {
        return <Header> {logo: <Image> {src: logoUrl, height: 50, width: 50}, 
            message: `Easily <b>see</b> if you are working with <b>read-only</b> or <b>writeable</b> files,
            right in the <b>status bar</b>, automatically. Do you need to <b>change the file access</b>? 
            No problem. You can do that as well.`};
    }

    public provideChangeLog(): ChangeLogItem[] {
        const changeLog: ChangeLogItem[] = [];

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.7.0", releaseDate: "November 2021" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Folder Level</b> commands for MacOS",
                id: 60,
                kind: IssueKind.PR,
                kudos: "zzhaolei"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.CHANGED,
            detail: {
                message: "Update Extension setting name",
                id: 53,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Add Contributing",
                id: 56,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Support CreateStatusBarItem API",
                id: 48,
                kind: IssueKind.Issue
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.6.0", releaseDate: "August 2021" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Folder Level</b> commands",
                id: 49,
                kind: IssueKind.PR,
                kudos: "k-kuroguro"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.FIXED,
            detail: {
                message: "Typos in settings names",
                id: 51,
                kind: IssueKind.PR,
                kudos: "k-kuroguro"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.5.0", releaseDate: "May 2021" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Virtual Workspaces</b>",
                id: 44,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Workspace Trust</b>",
                id: 43,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "New Command: Toggle File Access",
                id: 40,
                kind: IssueKind.PR,
                kudos: "k-kuroguro"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Dispose registered commands",
                id: 47,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: lodash",
                id: 42,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.4.1", releaseDate: "April 2021" } });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Do not show welcome message if installed by Settings Sync",
                id: 28,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: y18n",
                id: 37,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: elliptic",
                id: 35,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        return changeLog;
    }

    public provideSupportChannels(): SupportChannel[] {
        const supportChannels: SupportChannel[] = [];
        supportChannels.push({
            title: "Become a sponsor on GitHub",
            link: "https://www.github.com/sponsors/alefragnani",
            message: "Become a Sponsor"
        });
        supportChannels.push({
            title: "Donate via PayPal",
            link: "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted",
            message: "Donate via PayPal"
        });
        return supportChannels;
    }
}

export class ReadOnlyIndicatorSocialMediaProvider implements SocialMediaProvider {
    public provideSocialMedias() {
        return [{
            title: "Follow me on Twitter",
            link: "https://www.twitter.com/alefragnani"
        }];
    }
}
