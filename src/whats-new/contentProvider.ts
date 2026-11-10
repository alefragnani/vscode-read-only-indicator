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

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.12.0", releaseDate: "October 2026" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "<b>az</b> translations",
                id: 130,
                kind: IssueKind.PR,
                kudos: "jamalkamaladdin"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: fast-uri",
                id: 137,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: brace-expansion",
                id: 136,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: serialize-javascript",
                id: 135,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: serialize-javascript, mocha and terser-webpack-plugin",
                id: 134,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: glob",
                id: 133,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: js-yaml",
                id: 132,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: brace-expansion",
                id: 129,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: browserslist",
                id: 128,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: fast-uri",
                id: 127,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: js-yaml",
                id: 122,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: fast-uri",
                id: 121,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: js-yaml",
                id: 118,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: fast-uri",
                id: 117,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: picomatch",
                id: 110,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: flatted",
                id: 109,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: minimatch, @typescript-eslint/eslint-plugin and @typescript-eslint/parser",
                id: 105,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: webpack",
                id: 104,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: js-yaml",
                id: 103,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: serialize-javascript and mocha",
                id: 97,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.11.0", releaseDate: "November 2024" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "New config for <b>fileAccess.uiMode</b> setting",
                id: 76,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Acronym (as suffix) to <b>Make Writeable</b> and <b>Make Read Only</b> commands",
                id: 92,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: webpack",
                id: 96,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: braces",
                id: 93,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.10.0", releaseDate: "March 2024" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Published to Open VSX",
                id: 91,
                kind: IssueKind.Issue
            }
        });        
        changeLog.push({
            kind: ChangeLogKind.CHANGED,
            detail: {
                message: "Avoid What's New when using Gitpod",
                id: 84,
                kind: IssueKind.Issue
            }
        });        
        changeLog.push({
            kind: ChangeLogKind.CHANGED,
            detail: {
                message: "Avoid What's New when installing lower versions",
                id: 84,
                kind: IssueKind.Issue
            }
        });        
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: word-wrap",
                id: 85,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });        
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: webpack",
                id: 82,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.9.0", releaseDate: "January 2023" } });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Support <b>Translation</b> and <b>Localization</b> APIs",
                id: 77,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Update Badges",
                id: 80,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: minimap",
                id: 79,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "3.8.1", releaseDate: "October 2022" } });
        changeLog.push({
            kind: ChangeLogKind.FIXED,
            detail: {
                message: "Remove incorrect <b>Virtual Workspace</b> support mention",
                id: 74,
                kind: IssueKind.Issue
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
