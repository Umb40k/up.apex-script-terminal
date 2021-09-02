## Salesforce Apex Script terminal VS Code



This extension provides a User Interface to run Apex scripts from vscode without access to the org developer console, the code editor is made with ACE Editor Link: https://ace.c9.io/, the editor provide syntax highlighter for Apex language, the extension use the follow DX commands:

**Execute or Execute Highlighted**

sfdx force:apex:execute -f = execute the code

**Open USER_DEBUG only log on Terminal**

sfdx force:apex:log:tail --color | grep USER_DEBUG = launch a terminal and show all executed code debug (only user debug)

**Open FINEST log on Terminal**

sfdx force:apex:log:tail --color = launch a terminal and show all executed code

**Open Log checkbox**

save the log on the debug\log folder of the Salesforce project

**Set DebugLevel**

Create or Update a custom DebugLevel with the piclist menu



## Prerequisites


Before you set up Apex Script terminal for VS Code, make sure that you have these essentials.

Salesforce Extensions for Visual Studio Code
Visual Studio Code v1.59.0 or later

## How to use?

To start the extension show command palette and select SFDX Start Apex Terminal: Enter Apex Code

![2](https://user-images.githubusercontent.com/15142774/131256727-a4be8b97-40b3-485a-b949-6fac81ade93e.PNG)

Enter your Apex code into the editor and click execute to run all code on the editor or execute Highlighted only for the selected row:

![Catturattttttt](https://user-images.githubusercontent.com/15142774/131915538-904f1784-cd54-458e-9d8b-eb822db923d9.PNG)

To run the script press Execute for the test or Execute Highlighted only for the selected text:

![Cattura1111](https://user-images.githubusercontent.com/15142774/131915852-d14857ce-f4c8-4106-92c6-f2384b50ae2e.PNG)


To run the script and show the log select the checkbox:

![Cattura99999](https://user-images.githubusercontent.com/15142774/131916083-e0cd45f5-7ad3-4213-bf28-5973b6df0aa6.PNG)


To setup a custom log level use the picklist menu under Logs option and press Set DebugLevel:

![Cattura222222](https://user-images.githubusercontent.com/15142774/131916049-56b809b9-9fb0-4a79-b432-51003c020a68.PNG)
