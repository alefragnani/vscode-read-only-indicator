<p align="center">
  <br />
  <a title="Learn more about Read-only Indicator" href="http://github.com/alefragnani/vscode-read-only-indicator"><img src="https://raw.githubusercontent.com/alefragnani/vscode-read-only-indicator/master/images/vscode-read-only-indicator-logo-readme.png" alt="Read-only Logo" width="70%" /></a>
</p>

# What's new in Read-only Indicator 3

* Adds **MacOS** and **Linux** support
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

* Set what to do when the Status Bar indicator is clicked
    ```json
    "fileAccess.indicatorAction": "choose" // or "toggle"
    ```

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani