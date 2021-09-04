// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
//stty -echo &&

/**
 * @param {vscode.ExtensionContext} context
 */
let N_CONSOLE = 0;
let sfdxCmd;
let terminal;
let terminalD;
let terminalD2;
let tBool;
let tBool2;
let pathFile;
let UserId;
let Username;
const fs = require('fs');
const child = require("child_process");
const path = require('path');


function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('apex-remote.terminal', () => {
        let execLocation = context.asAbsolutePath('/ConsoleFile/myApexScript.apex');
        pathFile = execLocation.replace(/\\/g, "/");
        //vscode.window.showInformationMessage('Start Apex terminal');
        let panel = vscode.window.createWebviewPanel(
            'openWebview', // Identifies the type of the webview. Used internally
            'Enter Apex Code', // Title of the panel displayed to the user
            vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
            { // Enable scripts in the webview
                enableScripts: true //Set this to true if you want to enable Javascript.
            }
        );
        panel.webview.html = getWebviewContent();
        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'execute':
                        executeTail();
                        var currentdate = new Date();
                        var dateTime = currentdate.getDate() + (currentdate.getMonth() + 1) +
                            currentdate.getFullYear() + "_" +
                            currentdate.getHours() + "_" +
                            currentdate.getMinutes() + "_" + currentdate.getSeconds();
                        fs.writeFileSync(pathFile, message.data, 'utf8');
                        sfdxCmd = "sfdx force:apex:execute -f " + pathFile;
                        //let tailCmd = "sfdx force:apex:log:tail --debuglevel SFDC_DevConsole";
                        //terminal = vscode.window.createTerminal("CONSOLE_ScriptRun_" + N_CONSOLE);
                        if (message.token === "true") {
                            let command = message.text;


                            let nameFile = "./.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            let nameFileToOpen = "/.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            command = sfdxCmd + " > " + nameFile;
                            vscode.window.withProgress({
                                location: vscode.ProgressLocation.Notification,
                                title: 'Script launched',
                                cancellable: false
                            }, (progress, token) => {
                                token.onCancellationRequested(() => {
                                    return new Error(`User canceled Request`);
                                });

                                progress.report({
                                    message: ' in progress....'
                                });

                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        //executeTail(tailCmd);
                                        executeCommand(command);
                                        resolve();
                                    }, 5000);
                                });
                            })

                            //N_CONSOLE++;
                            setTimeout(function() {
                                const openPath = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.path + nameFileToOpen);
                                vscode.workspace.openTextDocument(openPath).then(doc => {
                                    vscode.window.showTextDocument(doc, {
                                        viewColumn: vscode.ViewColumn.Beside
                                    });
                                });
                            }, 7000);
                        } else {
                            let command = sfdxCmd;
                            vscode.window.withProgress({
                                location: vscode.ProgressLocation.Notification,
                                title: 'Script launched',
                                cancellable: false
                            }, (progress, token) => {
                                token.onCancellationRequested(() => {
                                    return new Error(`User canceled Request`);
                                });

                                progress.report({
                                    message: ' in progress....'
                                });

                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        //executeTail(tailCmd);
                                        executeCommand(command);
                                        resolve();
                                    }, 5000);
                                });
                            })
                            // N_CONSOLE++;
                        }
                        //panel.webview.postMessage({ command: 'test' })

                        return;
                    case 'executeHigh':
                        var currentdate = new Date();
                        var dateTime = currentdate.getDate() + (currentdate.getMonth() + 1) +
                            currentdate.getFullYear() + "_" +
                            currentdate.getHours() + "_" +
                            currentdate.getMinutes() + "_" + currentdate.getSeconds();
                        fs.writeFileSync(pathFile, message.data, 'utf8');
                        sfdxCmd = "sfdx force:apex:execute -f " + pathFile;
                        //tailCmd = "sfdx force:apex:log:tail --debuglevel SFDC_DevConsole | echo "+'"'+"System.debug('Start Trace');" +'"'+ " | sfdx force:apex:execute";
                        if (message.token === "true") {
                            let command = message.text;


                            let nameFile = "./.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            let nameFileToOpen = "/.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            command = sfdxCmd + " > " + nameFile;
                            vscode.window.withProgress({
                                location: vscode.ProgressLocation.Notification,
                                title: 'Script launched',
                                cancellable: false
                            }, (progress, token) => {
                                token.onCancellationRequested(() => {
                                    return new Error(`User canceled Request`);
                                });

                                progress.report({
                                    message: ' in progress....'
                                });

                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        //executeTail(tailCmd);
                                        executeCommand(command);
                                        resolve();
                                    }, 5000);
                                });
                            })

                            //N_CONSOLE++;
                            setTimeout(function() {
                                const openPath = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.path + nameFileToOpen);
                                vscode.workspace.openTextDocument(openPath).then(doc => {
                                    vscode.window.showTextDocument(doc, {
                                        viewColumn: vscode.ViewColumn.Beside
                                    });
                                });
                            }, 7000);
                        } else {
                            let command = sfdxCmd;
                            vscode.window.withProgress({
                                location: vscode.ProgressLocation.Notification,
                                title: 'Script launched',
                                cancellable: false
                            }, (progress, token) => {
                                token.onCancellationRequested(() => {
                                    return new Error(`User canceled Request`);
                                });

                                progress.report({
                                    message: ' in progress....'
                                });

                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        //executeTail(tailCmd);
                                        executeCommand(command);
                                        resolve();
                                    }, 5000);
                                });
                            })

                            //N_CONSOLE++;
                        }
                        return;
                    case 'executeDebugLevel':
                        let sfdxquery = "sfdx force:data:soql:query -q " + '"' + "SELECT Id, MasterLabel FROM DebugLevel where MasterLabel='SFDC_DevConsole'" + '"' + " -t";
                        let SFDX_COMMAND = message.data;
                        vscode.window.showInformationMessage('DebugLevel setup started!');

                        //vscode.window.showInformationMessage('QUERY '+sfdxquery);
                        executeQuery(sfdxquery, SFDX_COMMAND);
                        //panel.webview.postMessage({ command: 'test' })
                        return;
                    case 'userDebugT':
                        let sfdxCmdu = "sfdx force:apex:log:tail --color | grep USER_DEBUG";
                        if (vscode.window.terminals.length > 0) {
                            if (tBool2) {
                                vscode.window.showWarningMessage(`Debug Log USER_DEBUG alredy running!`);
                            } else {
                                tBool2 = true;
                                vscode.window.showInformationMessage('Debug Log FINEST Started - USER_DEBUG only');
                                terminalD2 = vscode.window.createTerminal("DEBUG_LOG_CONSOLE_USER");
                                terminalD2.sendText(sfdxCmdu);
                            }
                        }
                        return;
                    case 'finestDebugT':
                        let sfdxCmdf = "sfdx force:apex:log:tail --color";
                        if (vscode.window.terminals.length > 0) {
                            if (tBool) {
                                vscode.window.showWarningMessage(`Debug Log alredy running!`);
                            } else {
                                tBool = true;
                                vscode.window.showInformationMessage('Debug Log FINEST Started');
                                terminalD = vscode.window.createTerminal("DEBUG_LOG_CONSOLE")
                                terminalD.sendText(sfdxCmdf);
                            }
                        }
                        return;
                    case 'deleteLocalLogs':
						vscode.window.showInformationMessage('Local logs deleted!');
                        deleteLocalLogs();
                        return;
                    case 'deleteRemoteLogs':
						vscode.window.showInformationMessage('Org logs delete operation started!');
                        getUser();
                        return;
                }
            },
            undefined,
            context.subscriptions
        );


    }));
    //Next release
    /*
    context.subscriptions.push(vscode.commands.registerCommand('anonymous-apex.runSelectedText', () => {
    	vscode.window.showInformationMessage('Anonymous Apex code launched');
        const sfdxCmd ="sfdx force:apex:execute -f myApexScript.apex";
    	terminal = vscode.window.createTerminal("CONSOLE_ScriptRun_"+N_CONSOLE);
    	terminal.sendText(sfdxCmd);
    	N_CONSOLE++;

    }));
    context.subscriptions.push(vscode.commands.registerCommand('anonymous-apex.runText', () => {
    	vscode.window.showInformationMessage('Anonymous Apex code launched');
        const sfdxCmd ="sfdx force:apex:execute -f myApexScript.apex";
    	terminal = vscode.window.createTerminal("CONSOLE_ScriptRun_"+N_CONSOLE);
    	terminal.sendText(sfdxCmd);
    	N_CONSOLE++;

    }));
    context.subscriptions.push(vscode.commands.registerCommand('anonymous-apex.activeDebugLog', () => {
        const sfdxCmd ="sfdx force:apex:log:tail --color";
    	if(vscode.window.terminals.length > 0){
    	if(tBool){
    		vscode.window.showWarningMessage(`Debug Log alredy running!`);
    	}else{
    	tBool = true;
    	vscode.window.showInformationMessage('Debug Log FINEST Started');
    	terminalD = vscode.window.createTerminal("DEBUG_LOG_CONSOLE")
    	terminalD.sendText(sfdxCmd);}}
    }));
    context.subscriptions.push(vscode.commands.registerCommand('anonymous-apex.activeDebugLogUserOnly', () => {
        const sfdxCmd ="sfdx force:apex:log:tail --color | grep USER_DEBUG";
    	if(vscode.window.terminals.length > 0){
    	if(tBool2){
    		vscode.window.showWarningMessage(`Debug Log USER_DEBUG alredy running!`);
    	}else{
    	tBool2 = true;
    	vscode.window.showInformationMessage('Debug Log FINEST Started - USER_DEBUG only');
    	terminalD2 = vscode.window.createTerminal("DEBUG_LOG_CONSOLE_USER");
    	terminalD2.sendText(sfdxCmd);}}
    }));*/

}


vscode.window.onDidCloseTerminal((terminal) => {
    vscode.window.showInformationMessage(`${terminal.name} CLOSED`);

    if (terminal.name == 'DEBUG_LOG_CONSOLE') {
        tBool = false;
    } else if (terminal.name == 'DEBUG_LOG_CONSOLE_USER') {
        tBool2 = false;
    }
});

vscode.window.showTextDocument(pathFile, {
        preview: true,
        preserveFocus: false
    })
    .then(() => {
        return vscode.commands.executeCommand('workbench.action.closeActiveEditor');
    });


//vscode.window.onDidWriteTerminalData((e) => {console.log(e.data)})

function executeCommand(command) {


    let promise = new Promise(resolve => {
        let result = child.exec(command, {
            maxBuffer: 1024 * 1024 * 6,
            cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
        });
        result.stdout.on("data", (data) => {
            console.log('stdout: ' + data);
            vscode.window.showInformationMessage('Apex script successful executed!');

        });
        result.stderr.on("data", (data) => {
            console.log('stderr: ' + data);
            vscode.window.showErrorMessage(data);
            resolve();
        });
        result.stdin.on("data", (data) => {
            console.log('stdin: ' + data);
            resolve();
        });

    })

    return promise;



}

function executeTail() {


    let result;
    let command = "sfdx force:apex:log:tail --debuglevel SFDC_DevConsole";
    let promise = new Promise(resolve => {
        result = child.exec(command, {
            maxBuffer: 1024 * 1024 * 6,
            cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
        });
        result.stdout.on("data", (data) => {
            console.log('stdout: ' + data);
        });
        result.stderr.on("data", (data) => {
            console.log('stderr: ' + data);
            resolve();
        });
        result.stdin.on("data", (data) => {
            console.log('stdin: ' + data);
            resolve();
        });

    })

    return promise;


}

function deleteLocalLogs() {


    const openPath = vscode.workspace.workspaceFolders[0].uri.path + "/.sfdx/tools/debug/logs";

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Deleting my org Logs: ",
        cancellable: false
    }, (progress, token) => {
        token.onCancellationRequested(() => {
            console.log("Operation cancelled!: deleteLocalLogs");
            return new Error(`User canceled Request`);
        });
		progress.report({
                    message: ' in progress....'
                });
        let result;
        let promise = new Promise(resolve => {
            let pathf = openPath.substring(1);
            let command = pathf;

            result =
                fs.readdir(command, (err, files) => {
                    if (err) throw err;

                    for (const file of files) {
                        fs.unlink(path.join(command, file), err => {
                            if (err) throw err;
                        });
                    }
                });
            result.stdout.on("data", (data) => {
                console.log('stdout: ' + data);
            });
            result.stderr.on("data", (data) => {
                console.log('stderr: ' + data);
                resolve();
            });
            result.stdin.on("data", (data) => {
                console.log('stdin: ' + data);
                resolve();
            });

        })
        return promise;

    });




}

function getUser() {

    let command = "sfdx force:org:display --json";
    console.log(command);

    let result
    result = child.exec(command, {
        maxBuffer: 1024 * 1024 * 6,
        cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
    });
    result.stdout.on("data", (data) => {
        console.log('stdout3: ' + data);
        let datajson = JSON.parse(data);
        Username = datajson.result.username;
		let command = "sfdx force:data:soql:query -q " + '"' + "SELECT Id FROM User WHERE Username = '" + Username + "' and IsActive = true" + '"' + " --json";
		console.log(command);
		let result2 = child.exec(command, {
			maxBuffer: 1024 * 1024 * 6,
			cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
		});
		result2.stdout.on("data", (data) => {
			console.log('stdout2: ' + data);
			let datajson = JSON.parse(data);
			UserId = datajson.result.records[0].Id;
			    });
        getId();
    });
    result.stderr.on("data", (data) => {
        console.log('stderr: ' + data);
    });
    result.stdin.on("data", (data) => {
        console.log('stdin: ' + data);
    });

}

function getId() {

	let result;

    result = child.exec("sfdx force:data:soql:query -q " + '"' + "SELECT Id FROM ApexLog WHERE LogUserId = '" + UserId + "'" + '"' , {
        maxBuffer: 1024 * 1024 * 6,
        cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
    });
    result.stdout.on("data", (dataArg) => {
        console.log('stdout: ' + dataArg.replace(/\n/g, ''));

        if (dataArg.replace(/\n/g, '') == 'Total number of records retrieved: 0.') {
			vscode.window.showInformationMessage('No org logs found, operation terminated!');
        } else if (dataArg.replace(/\n/g, '') !== 'Total number of records retrieved: 0.') {
			child.exec("sfdx force:data:soql:query -q " + '"' + "SELECT Id FROM ApexLog WHERE LogUserId = '" + UserId + "'" + '"' + " -r " + '"' + "csv" + '"' + " > ./.sfdx/tools/debug/logs/apexlog.csv", {
				maxBuffer: 1024 * 1024 * 6,
				cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
			});
			sleep(3000).then(() => {
				deleteRemoteLogs();
            	});
        }
    });
    result.stderr.on("data", (data) => {
        console.log('stderr: ' + data);
    });



}

function deleteRemoteLogs() {


    let command = "sfdx force:data:bulk:delete -s ApexLog -f ./.sfdx/tools/debug/logs/apexlog.csv";
	 vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Deleting my org Logs: "
    }, (progress, token) => {
        token.onCancellationRequested(() => {
            console.log("Operation cancelled!: deleteLocalLogs");
        });
		progress.report({
			message: ' in progress....'
		});
        console.log(command);
		let promise = new Promise(resolve => {
        let result
        result = child.exec(command, {
            maxBuffer: 1024 * 1024 * 6,
            cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
        });
        result.stdout.on("data", (data) => {
            console.log('stdout3: ' + data);
            vscode.window.showInformationMessage('My org logs deleted!');
        });
        result.stderr.on("data", (data) => {
            console.log('stderr: ' + data);
			resolve();

        });
        result.stdin.on("data", (data) => {
            console.log('stdin: ' + data);
			resolve();

        });


	})
	return promise;
});



}



function executeQuery(command, SFDX_COMMAND) {
    let result;

    result = child.exec(command, {
        maxBuffer: 1024 * 1024 * 6,
        cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
    });
    result.stdout.on("data", (dataArg) => {
        console.log('stdout: ' + dataArg.replace(/\n/g, ''));

        if (dataArg.replace(/\n/g, '') == 'Total number of records retrieved: 0.') {
            let sfdxLogCmdCreate = "sfdx force:data:record:create -s DebugLevel -t -v " + SFDX_COMMAND;
            SFDX_COMMAND_FINAL = sfdxLogCmdCreate;

            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Create DebugLevel',
                cancellable: false
            }, (progress, token) => {
                token.onCancellationRequested(() => {
                    return new Error(`User canceled Request`);
                });

                progress.report({
                    message: ' in progress....'
                });

                return new Promise((resolve) => {
                    setTimeout(() => {
                        let result2;
                        result2 = child.exec(SFDX_COMMAND_FINAL, {
                            maxBuffer: 1024 * 1024 * 6,
                            cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
                        });
                        result2.stdout.on("data", (data) => {
                            console.log('stdout: ' + data);
                            vscode.window.showInformationMessage('DebugLevel setup successful Created!');

                        });
                        result2.stderr.on("data", (data) => {
                            console.log('stderr: ' + data);
                            vscode.window.showErrorMessage(data);
                            resolve();
                        });
                        result2.stdin.on("data", (data) => {
                            console.log('stdin: ' + data);
                            resolve();
                        });
                    }, 5000);
                });
            })


        } else if (dataArg.replace(/\n/g, '') !== 'Total number of records retrieved: 0.') {
            let sfdxLogCmdUpdate = "sfdx force:data:record:update -s DebugLevel -t -w " + '"' + "MasterLabel='SFDC_DevConsole'" + '"' + " -v " + SFDX_COMMAND;
            SFDX_COMMAND_FINAL = sfdxLogCmdUpdate;

            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Update DebugLevel',
                cancellable: false
            }, (progress, token) => {
                token.onCancellationRequested(() => {
                    return new Error(`User canceled Request`);
                });

                progress.report({
                    message: ' in progress....'
                });

                return new Promise((resolve) => {
                    setTimeout(() => {
                        let result2;
                        result2 = child.exec(SFDX_COMMAND_FINAL, {
                            maxBuffer: 1024 * 1024 * 6,
                            cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
                        });
                        result2.stdout.on("data", (data) => {
                            console.log('stdout: ' + data);
                            vscode.window.showInformationMessage('DebugLevel setup successful Updated!');

                        });
                        result2.stderr.on("data", (data) => {
                            console.log('stderr: ' + data);
                            vscode.window.showErrorMessage(data);
                            resolve();
                        });
                        result2.stdin.on("data", (data) => {
                            console.log('stdin: ' + data);
                            resolve();
                        });
                    }, 5000);
                });
            })

        }


    });
    result.stderr.on("data", (data) => {
        console.log('stderr: ' + data);
    });




}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function getWebviewContent() {
    return `<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<style type="text/css">
			.button {
				padding: 15px 25px;
				font-size: 24px;
				text-align: center;
				cursor: pointer;
				outline: none;
				color: #17A0DB;
				background-color: #04AA6D;
				border: none;
				border-radius: 15px;
			}

			.button:hover {
				background-color: #3e8e41
			}

			.button:active {
				background-color: #17A0DB;
				transform: translateY(4px);
			}

			.log-button {
				padding: 15px 25px;
				font-size: 24px;
				text-align: center;
				cursor: pointer;
				outline: none;
				color: #17A0DB;
				background-color: #04AA6D;
				border: none;
				border-radius: 15px;
			}

			.log-button-cancelLocal {
				padding: 15px 25px;
				font-size: 24px;
				text-align: center;
				cursor: pointer;
				outline: none;
				color: #ff0000;
				background-color: #04AA6D;
				border: none;
				border-radius: 15px;
			}

			.log-button-cancelLocal:hover {
				background-color: #04AA6D
			}

			.log-button-cancelLocal:active {
				background-color: #04AA6D;
				transform: translateY(4px);
			}

			.picklistmenu {
				padding-top: 25px;
				position: relative;
				display: inline-block;
			}

			.buttonDebug {
				padding: 10px;
				font-size: 4px;
				cursor: pointer;
				outline: none;
				color: #17A0DB;
				background-color: #04AA6D;
				border: none;
				border-radius: 15px;
			}

			.buttonDebug:hover {
				background-color: #3e8e41
			}

			.buttonDebug:active {
				background-color: #17A0DB;
				transform: translateY(4px);
			}

			#editor-container {
				font: 14px/1.4 sans-serif;
				color: white;
				border: 7px solid #17A0DB;
				display: inline-block;
				position: relative;
				background-color: white;
				width: 98%;
				height: 100%;
				min-width: 1011px;
			}

			#editor-menu {
				padding: 10px;
				padding-top: 20px;
			}

			#picklist-menu {
				display: none;
			}

			.label-picklist {
				display: inline-block;
				font: 1rem 'Fira Sans', sans-serif;
				color: #17A0DB;

			}

			#editor-menu button {
				font: 14px/1.4 sans-serif;
				border: 3px solid #17A0DB;
				background-color: white;
				padding: 10px;
				margin: 0 10px 10px 0;
				float: right;
			}

			.highight-menu {
				background-color: #777777 !important;
				color: white !important;
			}

			.title {
				font-size: 1.67em;
				font-weight: bold;
				text-align: center;
			}

			#editor {
				position: relative;
				height: 500px;
				border-bottom: 2px solid #17A0DB;
			}

			textarea[name="editor"] {
				display: none;
			}

			.as-console-wrapper {
				display: none !important;
			}

			.menu-btn {
				padding: 15px 25px;
				font-size: 24px;
				text-align: center;
				cursor: pointer;
				outline: none;
				color: #17A0DB;
				background-color: #17A0DB;
				border: none;
				border-radius: 15px;
			}

			.dropdown-menu {
				position: relative;
				display: inline-block;
				padding: 2px 2px;
			}

			.log-menu {
				position: relative;
				display: inline-block;
				padding: 2px 2px;
			}

			.log-cancel {
				position: relative;
				display: inline-block;
				padding: 2px 2px;
			}

			.menu-content {
				display: none;
				position: absolute;
				bottom: 50px;
				background-color: #017575;
				min-width: 160px;
				z-index: 1;
			}

			.links {
				color: rgb(255, 255, 255);
				padding: 12px 16px;
				text-decoration: none;
				display: block;
				font-size: 12px;
				font-weight: bold;
				border-bottom: 1px solid black;
				background-color: #17A0DB;
			}

			.links:hover {
				background-color: #17A0DB;
				color: #c3c5c6;
				left: 50px;
			}

			.dropdown-menu:hover .menu-content {
				display: inline-block;
			}

			.dropdown-menu:hover .menu-btn {
				background-color: #3e8e41;
			}

			.myCheckbox input {
				background-color: #04AA6D;
				border: 10px solid #17A0DB;
				border-radius: 2px;
			}

			.label {
				color: #17A0DB;
			}

			.checkbox_container {
				position: relative;
				display: inline-block;
				padding-right: 10px;
				padding-top: 14px;
				float: right;
			}
		</style>
		<link href="prism.css" rel="stylesheet" />
	</head>

	<body oncontextmenu="return false;" style="min-width:920px;">
		<div id="editor-container" content="width=device-width, initial-scale=1.0">


			<div id="editor" class="editor" contenteditable="true"></div>
			<div id="editor-menu">
				<div class="log-menu">

					<button class="log-button" Onclick="showMenu()" id="logOption" title="Open to set the debuglog level">Logs Option ˅</button>
				</div>

				<div class="dropdown-menu">

					<button class="menu-btn">Terminals Option </button>

					<div class="menu-content">

						<a class="links" id="userDebug" onclick="userDebugT()">Open USER_DEBUG only log on Terminal</a>
						<a class="links" id="finestDebug" onclick="finestDebugT()">Open FINEST log on Terminal</a>

					</div>

				</div>

				<div class="log-cancel">
					<button class="log-button-cancelLocal" onclick="deleteRemoteLogs()" id="logLocalCancel" title="Delete my user logs from the org">Delete my org logs</button>

					<button class="log-button-cancelLocal" onclick="deleteLocalLogs()" id="logLocalCancel" title="Delete Local logs file">Delete local Logs</button>
				</div>


				<button class="button" id="executehigh-button" title="Execute Highlighted" onclick="executeHigh()">Execute Highlighted</button>

				<button class="button" id="execute-button" title="Execute" onClick="execute()">Execute</button>
				<div class="checkbox_container">
					<input type="checkbox" name="log" id="checkboxLog" /><label class="label" for="test">Open Log</label>
				</div>
				<div class="picklistmenu" id="picklist-menu">
					<div class="label-picklist"> <button class="buttonDebug" id="execute-button-debug" title="Execute" onClick="executeDebugLevel()">Set DebugLevel</button>
						<label class="label-picklist" for="Preset">Preset<br>
							<select name="Preset" id="Preset" onchange="changeSet();">
								<option value="SELECT" disabled>--Select--</option>
								<option value="NONE">NONE</option>
								<option value="FINEST">ALL_FINEST</option>
								<option value="ERROR">ALL_ERROR</option>
								<option value="WARN">ALL_WARNING</option>
							</select>&nbsp;&nbsp;&nbsp;
						</label>
						<label class="label-picklist" for="Database">Database<br>
							<select name="Database" id="Database">
								<option value="NONE">NONE</option>
								<option value="INFO">INFO</option>
								<option value="FINEST">FINEST</option>
							</select></label>
						<label class="label-picklist" for="Callouts">Callouts<br>
							<select name="Callouts" id="Callouts">
								<option value="NONE">NONE</option>
								<option value="ERROR">ERROR</option>
								<option value="INFO">INFO</option>
								<option value="FINER">FINER</option>
								<option value="FINEST">FINEST</option>
							</select></label>
						<label class="label-picklist" for="Apex">Apex<br>
							<select name="Apex" id="Apex">
								<option value="NONE">NONE</option>
								<option value="ERROR">ERROR</option>
								<option value="WARN">WARN</option>
								<option value="INFO">INFO</option>
								<option value="DEBUG">DEBUG</option>
								<option value="FINE">FINE</option>
								<option value="FINER">FINER</option>
								<option value="FINEST">FINEST</option>
							</select></label>
						<label class="label-picklist" for="Validation">Validation<br>
							<select name="Validation" id="Validation">
								<option value="NONE">NONE</option>
								<option value="INFO">INFO</option>
								<option value="FINEST">FINEST</option>
							</select></label>
						<label class="label-picklist" for="Workflow">Workflow<br>
							<select name="Workflow" id="Workflow">
								<option value="NONE">NONE</option>
								<option value="ERROR">ERROR</option>
								<option value="WARN">WARN</option>
								<option value="INFO">INFO</option>
								<option value="FINE">FINE</option>
								<option value="FINER">FINER</option>
								<option value="FINEST">FINEST</option>
							</select></label>
						<label class="label-picklist" for="Profiling">Profiling<br>
							<select name="Profiling" id="Profiling">
								<option value="NONE">NONE</option>
								<option value="INFO">INFO</option>
								<option value="FINE">FINE</option>
								<option value="FINEST">FINEST</option>
							</select></label>
						<label class="label-picklist" for="Visualforce">Visualforce<br>
							<select name="Visualforce" id="Visualforce">
								<option value="NONE">NONE</option>
								<option value="INFO">INFO</option>
								<option value="FINE">FINE</option>
								<option value="FINER">FINER</option>
								<option value="FINEST">FINEST</option>
							</select></label>
						<label class="label-picklist" for="System">System<br>
							<select name="System" id="System">
								<option value="NONE">NONE</option>
								<option value="INFO">INFO</option>
								<option value="DEBUG">DEBUG</option>
								<option value="FINE">FINE</option>
								<option value="FINEST">FINEST</option>
							</select></label>&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
				</div>
			</div>
		</div>
		<script src="https://ajaxorg.github.io/ace-builds/src/ace.js" type="text/javascript" charset="utf-8"></script>
		<script>
			var logOption = false;
			var dragging = false;
			var wpoffset = 0;
			var editor = ace.edit('editor');
			var txtAra = document.querySelector('textarea[name="editor"]');
			var jsbOpts = {
				indent_size: 5
			};

			editor.setTheme("ace/theme/chrome");
			editor.getSession().setMode({
				path: "ace/mode/apex",
				inline: true
			});
			editor.setOptions({
				fontSize: "14pt",
				enableBasicAutocompletion: true,
				showPrintMargin: false
			});

			const vscode = acquireVsCodeApi();


			function execute() {
				var Database = document.getElementById("Database").value;
				var Callouts = document.getElementById("Callouts").value;
				var Apex = document.getElementById("Apex").value;
				var Validation = document.getElementById("Validation").value;
				var Workflow = document.getElementById("Workflow").value;
				var Profiling = document.getElementById("Profiling").value;
				var Visualforce = document.getElementById("Visualforce").value;
				var System = document.getElementById("System").value;
				let sfdxLogCmd = "sfdx force:data:record:create -s DebugLevel -t -v " + '"' + "DeveloperName=SFDC_DevConsole MasterLabel=SFDC_DevConsole ApexCode=" + Apex + " ApexProfiling=" + Profiling + " Callout=" + Callouts + " Database=" + Database + " System=" + System + " Validation=" + Validation + " Visualforce=" + Visualforce + " Workflow=" + Workflow + '"';
				let text1 = editor.getValue();
				let box;
				if (document.getElementById('checkboxLog').checked) {
					box = "true";
				} else {
					box = "false";
				}
				vscode.postMessage({
					command: 'execute',
					data: text1,
					token: box,
					text: sfdxLogCmd
				})
				window.addEventListener('message', event => {

					const message = event.data; // The JSON data our extension sent

				});
			}

			function executeDebugLevel() {

				var Database = document.getElementById("Database").value;
				var Callouts = document.getElementById("Callouts").value;
				var Apex = document.getElementById("Apex").value;
				var Validation = document.getElementById("Validation").value;
				var Workflow = document.getElementById("Workflow").value;
				var Profiling = document.getElementById("Profiling").value;
				var Visualforce = document.getElementById("Visualforce").value;
				var System = document.getElementById("System").value;
				let sfdxLogCmd = '"' + "DeveloperName=SFDC_DevConsole MasterLabel=SFDC_DevConsole ApexCode=" + Apex + " ApexProfiling=" + Profiling + " Callout=" + Callouts + " Database=" + Database + " System=" + System + " Validation=" + Validation + " Visualforce=" + Visualforce + " Workflow=" + Workflow + '"';
				vscode.postMessage({
					command: 'executeDebugLevel',
					data: sfdxLogCmd,
				})
			}


			function executeHigh() {
				let text2 = editor.getSelectedText();
				let box2;
				if (document.getElementById('checkboxLog').checked) {
					box2 = "true";
				} else {
					box2 = "false";
				}

				vscode.postMessage({
					command: 'executeHigh',
					data: text2,
					token: box2
				})

				window.addEventListener('message', event => {

					const message = event.data; // The JSON data our extension sent

				});
			}

			function deleteRemoteLogs() {
				confirm("This will delete all logs from the org, confirm?");

				vscode.postMessage({
					command: 'deleteRemoteLogs'
				})

				window.addEventListener('message', event => {

					const message = event.data; // The JSON data our extension sent

				});
			}

			function deleteLocalLogs() {

				vscode.postMessage({
					command: 'deleteLocalLogs'
				})

			}




			function userDebugT() {
				vscode.postMessage({
					command: 'userDebugT'
				})
			}

			function finestDebugT() {
				vscode.postMessage({
					command: 'finestDebugT'
				})
			}


			// Main Logic
			setTimeout(formatCode, 500);

			// Functions
			function syncEditor() {
				editor.getSession().setValue(txtAra.value);
			}

			function commitChanges() {
				txtAra.value = editor.getSession().getValue();
			}

			function formatCode() {
				var session = editor.getSession();
				session.setValue(js_beautify(session.getValue(), jsbOpts));
			}


			function showMenu() {
				var x = document.getElementById("picklist-menu");
				var y = document.getElementById("logOption");
				if (x.style.display === "block") {
					x.style.display = "none";
					y.textContent = "Logs Option ˅";
					logOption = true;
				} else {
					x.style.display = "block";
					y.textContent = "Logs Option ˄";
					logOption = false;
				}
			}

			function changeSet() {
				if (document.getElementById('Preset').value == 'FINEST') {
					document.getElementById("Database").value = 'FINEST';
					document.getElementById("Callouts").value = 'FINEST';
					document.getElementById("Apex").value = 'FINEST';
					document.getElementById("Validation").value = 'FINEST';
					document.getElementById("Workflow").value = 'FINEST';
					document.getElementById("Profiling").value = 'FINEST';
					document.getElementById("Visualforce").value = 'FINEST';
					document.getElementById("System").value = 'FINEST';
				} else if (document.getElementById('Preset').value == 'WARN') {
					document.getElementById("Apex").value = 'WARN';
					document.getElementById("Workflow").value = 'WARN';
				} else if (document.getElementById('Preset').value == 'ERROR') {
					document.getElementById("Callouts").value = 'ERROR';
					document.getElementById("Apex").value = 'ERROR';
					document.getElementById("Workflow").value = 'ERROR';
				} else if (document.getElementById('Preset').value == 'NONE') {
					document.getElementById("Database").value = 'NONE';
					document.getElementById("Callouts").value = 'NONE';
					document.getElementById("Apex").value = 'NONE';
					document.getElementById("Validation").value = 'NONE';
					document.getElementById("Workflow").value = 'NONE';
					document.getElementById("Profiling").value = 'NONE';
					document.getElementById("Visualforce").value = 'NONE';
					document.getElementById("System").value = 'NONE';
				}

			};
		</script>
	</body>

	</html>`;

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}