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
const fs = require('fs');

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('apex-remote.terminal', () => {
        let execLocation = context.asAbsolutePath('/ConsoleFile/myApexScript.apex');
        pathFile = execLocation.replace(/\\/g, "/");
        vscode.window.showInformationMessage('Start Apex terminal');
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
                        var currentdate = new Date();
                        var dateTime = currentdate.getDate() + (currentdate.getMonth() + 1) +
                            currentdate.getFullYear() + "_" +
                            currentdate.getHours() + "_" +
                            currentdate.getMinutes() + "_" + currentdate.getSeconds();
                        vscode.window.showInformationMessage('Apex script launched');
                        fs.writeFileSync(pathFile, message.data, 'utf8');
                        sfdxCmd = "sfdx force:apex:execute -f " + pathFile;
                        terminal = vscode.window.createTerminal("CONSOLE_ScriptRun_" + N_CONSOLE);
                        if (message.token === "true") {
                            let nameFile = "./.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            let nameFileToOpen = "/.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            terminal.sendText(sfdxCmd + " > " + nameFile);
                            N_CONSOLE++;
                            setTimeout(function() {
                                const openPath = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.path + nameFileToOpen);
                                vscode.workspace.openTextDocument(openPath).then(doc => {
                                    vscode.window.showTextDocument(doc, {
                                        viewColumn: vscode.ViewColumn.Beside
                                    });
                                });
                            }, 7000);
                        } else {
                            terminal.sendText(sfdxCmd);
                            N_CONSOLE++;
                        }
                        //panel.webview.postMessage({ command: 'test' })

                        return;
                    case 'executeHigh':
                        var currentdate = new Date();
                        var dateTime = currentdate.getDate() + (currentdate.getMonth() + 1) +
                            currentdate.getFullYear() + "_" +
                            currentdate.getHours() + "_" +
                            currentdate.getMinutes() + "_" + currentdate.getSeconds();
                        vscode.window.showInformationMessage('Apex script launched');
                        fs.writeFileSync(pathFile, message.data, 'utf8');
                        sfdxCmd = "sfdx force:apex:execute -f " + pathFile;
                        terminal = vscode.window.createTerminal("CONSOLE_ScriptRun_" + N_CONSOLE);
                        if (message.token === "true") {
                            let nameFile = "./.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            let nameFileToOpen = "/.sfdx/tools/debug/logs/APEX_CODE_LOG_" + dateTime + ".log";
                            terminal.sendText(sfdxCmd + " > " + nameFile);
                            N_CONSOLE++;
                            setTimeout(function() {
                                const openPath = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.path + nameFileToOpen);
                                vscode.workspace.openTextDocument(openPath).then(doc => {
                                    vscode.window.showTextDocument(doc, {
                                        viewColumn: vscode.ViewColumn.Beside
                                    });
                                });
                            }, 7000);
                        } else {
                            terminal.sendText(sfdxCmd);
                            N_CONSOLE++;
                        }
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
				 .button:hover {background-color: #3e8e41}
				 .button:active {
				 background-color: #17A0DB;
				 transform: translateY(4px);
				 }
				 #editor-container {
				 font: 14px/1.4 sans-serif;
				 color: white;
				 border: 7px solid #17A0DB;
				 display: inline-block;
				 background-color: white;
				 }
				 #editor-menu {
				 padding: 15px;
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
				 #editor-text {
				 width: 1000px;
				 height: 500px;
				 border-top: 6px solid #17A0DB;
				 border-left: 6px solid #17A0DB;
				 border-right: 6px solid #17A0DB;
				 border-bottom: 6px solid #17A0DB;
				 outline: none;
				 padding: 10px;
				 overflow: auto;
				 background-color: white;
				 font: 1rem 'Fira Sans', sans-serif;
				 font-color: black;
				 }
				 #editor-text img {
				 max-width: 600px;
				 }
				 .title {
				 font-size: 1.67em;
				 font-weight: bold;
				 text-align: center;
				 }
				 #editor {
				 width: 770px;
				 height: 570px;
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
				 padding: 2px 35px;
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
				 color:#c3c5c6;
				 left:50px;
				 }
				 .dropdown-menu:hover .menu-content {
				 display: inline-block;
				 }
				 .dropdown-menu:hover .menu-btn {
				 background-color: #3e8e41;
				 }
				 .myCheckbox input {
				 position: relative;
				 left:170px;
				 bottom:30px;
				 background-color: #04AA6D;
				 border: 10px solid #17A0DB;
				 border-radius: 2px;
				 }
				 .label{
				 color: #17A0DB;
				 position: relative;
				 left:170px;
				 bottom:30px;
				 }
			  </style>
			  <link href="prism.css" rel="stylesheet" />
		   </head>
		   <body oncontextmenu="return false;">
			  <div id="editor-container" content="width=device-width, initial-scale=1.0">
				 <div id="editor" class="editor"  contenteditable="true" ></div>
				 <div id="editor-menu">
					<div class="dropdown-menu">
					   <button class="menu-btn">Logs Option </button>
					   <div class="menu-content">
						  <a class="links"  id="userDebug" onclick="userDebugT()">Open USER_DEBUG only log on Terminal</a>
						  <a class="links"  id="finestDebug" onclick="finestDebugT()">Open FINEST log on Terminal</a>
					   </div>
					</div>
					<button class="button" id="executehigh-button" title="Execute Highlighted" onclick="executeHigh()">Execute Highlighted</button>
					<button class="button" id="execute-button" title="Execute" onClick="execute()">Execute</button>
					<label class="myCheckbox">
					<input type="checkbox" name="log" id="checkboxLog" />
					<label class="label" for="test">Open Log</label>
					</label>
				 </div>
			  </div>
			  <script src="https://ajaxorg.github.io/ace-builds/src/ace.js" type="text/javascript" charset="utf-8"></script>
			  <script>
			  var dragging = false;
              var wpoffset = 0;
				 var editor = ace.edit('editor');
					   var txtAra = document.querySelector('textarea[name="editor"]');
					   var jsbOpts = {
					   indent_size : 5
					   };

				 editor.setTheme("ace/theme/chrome");
				 editor.getSession().setMode({path:"ace/mode/apex", inline: true });
				 editor.setOptions({
				 fontSize: "14pt",
				 enableBasicAutocompletion: true,
				 showPrintMargin: false
				 });

				 const vscode = acquireVsCodeApi();
				 function execute() {
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
				 token: box
				 })
				 window.addEventListener('message', event => {

				 const message = event.data; // The JSON data our extension sent

				 });
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