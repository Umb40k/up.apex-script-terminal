Salesforce Apex Script terminal VS Code

This extension provides a User Interface to run Apex scripts from vscode without access to the org developer console, the code editor is made with ACE Editor Link: https://ace.c9.io/, the editor provide syntax highlighter for Apex language, the extension use the follow DX commands:

Execute or Execute Highlighted
sfdx force:apex:execute -f = execute the code

Open USER_DEBUG only log on Terminal

sfdx force:apex:log:tail --color | grep USER_DEBUG = launch a terminal and show all executed code debug (only user debug)

Open FINEST log on Terminal

sfdx force:apex:log:tail --color = launch a terminal and show all executed code

Open Log checkbox

save the log on the debug\log folder of the Salesforce project



Prerequisites

Before you set up Apex Script terminal for VS Code, make sure that you have these essentials.

Salesforce Extensions for Visual Studio Code
Visual Studio Code v1.26 or later



How to use?

To start the extension show command palette and select SFDX Start Apex Terminal: Enter Apex Code

![2](https://user-images.githubusercontent.com/15142774/131256727-a4be8b97-40b3-485a-b949-6fac81ade93e.PNG)

Enter your Apex code into the editor and click execute for run all code on the edior or execute Highlighted only for the selected row:

![6](https://user-images.githubusercontent.com/15142774/131256867-8df835f8-e8a0-4a9e-85ad-fc2194964f35.PNG)


To save and show the log select the checkbox:

![5](https://user-images.githubusercontent.com/15142774/131256809-7d1c1b45-73f9-4bc7-b1cb-7d71d962e808.PNG)







