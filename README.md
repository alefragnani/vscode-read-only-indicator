[![](https://vsmarketplacebadge.apphb.com/version-short/alefragnani.read-only-indicator.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.read-only-indicator)
[![](https://vsmarketplacebadge.apphb.com/downloads-short/alefragnani.read-only-indicator.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.read-only-indicator)
[![](https://vsmarketplacebadge.apphb.com/rating-short/alefragnani.read-only-indicator.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.read-only-indicator)
[![](https://img.shields.io/github/workflow/status/alefragnani/vscode-read-only-indicator/CI)](https://github.com/alefragnani/vscode-read-only-indicator/actions?query=workflow%3ACI)

<p align="center">
  <br />
  <a title="Learn more about Read-only Indicator" href="http://github.com/alefragnani/vscode-read-only-indicator"><img src="https://raw.githubusercontent.com/alefragnani/vscode-read-only-indicator/master/images/vscode-read-only-indicator-logo-readme.png" alt="Read-only Logo" width="70%" /></a>
</p>

# What's new in Read-only Indicator 3.4

* Adds **MacOS** and **Linux** support
* Adds **workbench.colorCustomizations** support
* Adds **Settings changes** detection
* Adds **Clickable** Status Bar indicator

## Support

**Read-only Indicator** is an open source extension created for **Visual Studio Code**. While being free and open source, if you find it useful, please consider supporting it.

<table align="center" width="60%" border="0">
  <tr>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=BR&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Patreon" href="https://www.patreon.com/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-patron-rounded-small.png"/></a>
    </td>
  </tr>
</table>

# Read-only Indicator

It adds an area in the status bar, indicating if the file is **read-only** or **writeable**. It will be automatically updated, every time you open any file.

# Features

The indicator is automatically updated. You don't need to do anything.

File Access | Status Bar Preview |
----------- | ------------------ |
Read-only |![Read-only](images/screenshot-readonly.png) 
Writeable |![Writeable](images/screenshot-writeable.png) 

## Available commands

* `File Access: Change File Access`
* `File Access: Make Read-only`
* `File Access: Make Writeable`

## Available settings

* Defines the position where the Status Bar indicator is located
    ```json
    "fileAccess.position": "left" // or "right"
    ```

* Define how much information is displayed in the Status Bar indicator
    ```json
    "fileAccess.uiMode": "complete" // or "simple"
    ```

* Hides the Status Bar indicator when the file is Writable
    ```json
    "fileAccess.hideWhenWritable": true // or false
    ```


* Set what to do when the Status Bar indicator is clicked
    ```json
    "fileAccess.indicatorAction": "choose" // or "toggle"
    ```

## Available colors

For more information about customizing colors in VSCode, see [Theme Color](https://code.visualstudio.com/api/references/theme-color).

* Choose the Status Bar indicator text color when the file is Read Only
```json
    "workbench.colorCustomizations": {
      "fileAccess.readonlyForeground": "#ff7fc0",  
    }
```

* Choose the Status Bar indicator text color when the file is Writable
```json
    "workbench.colorCustomizations": {
      "fileAccess.writableForeground": "#7fcc7f",
    }
```

## Contributors

Special thanks to the people that have contributed to the project:

* Chris Antos (@chrisant996) - Settings to choose the colors of the Status Bar text ([see PR](https://github.com/alefragnani/vscode-read-only-indicator/pull/24))
* Chris Antos (@chrisant996) - Only show Status Bar indicator when Read-only ([see PR](https://github.com/alefragnani/vscode-read-only-indicator/pull/24))
* joshwiker14 (@joshwiker14) - Add support for MacOs and Linux ([see PR](https://github.com/alefragnani/vscode-read-only-indicator/pull/13))
* Tom Chapple (@TomChapple) - Allow for toggling File Access via Status Bar ([see PR](https://github.com/alefragnani/vscode-read-only-indicator/pull/11))
* Franklin Yu (@FranklinYu) - Reformat Readme ([see PR](https://github.com/alefragnani/vscode-read-only-indicator/pull/9))

Also thanks to everyone who helped opening issues with ideas and bug reports.

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani