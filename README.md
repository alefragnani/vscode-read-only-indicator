# Functionality

Adds a status bar indicating if a file is read-only or writeable.

# Installation

Press `F1` in VSCode, type `ext install` and then look for `Status Bar Read-Only Indicator`.

# Usage

You don't need to do anthing. It automatically adds itself in the status bar.

### Read-only

![Read-only](images/screenshot-readonly.png)

### Writeable

![Writeable](images/screenshot-writeable.png)

## Available commands

* **File Access: Make Read-only** Make the file Read-Only
* **File Access: Make Writeable** Make the file Writeable

![Commands](images/read-only-commands.png)

## Available settings

* Defines the position where the Status Bar indicator is located
```json
    "fileAccess.position": "left" // or "right"
```

## Version 0.4.0

* **New Setting:** Choose if the indicator will be located at `left` or `right` in the status bar (issue [#3](https://github.com/alefragnani/vscode-read-only-indicator/issues/3))

## Version 0.3.0

* **New Command:** File Access: Make Read-Only
* **New Command:** File Access: Make Writeable

## Version 0.2.0

* License updated

## Version 0.0.1

* Initial release

## Participate

If you have any idea, feel free to create issues and pull requests

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani

---

[![Paypal Donations](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted) a :coffee: if you enjoy using this extension :thumbsup: