//
// Node版GitHelp メイン
//
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;

var child_process = require('child_process');
var exec = child_process.exec;
var execSync = child_process.execSync;

// window objectがGCされないようにするために、globalに定義する
var win;

var pwd = process.cwd();
//console.log(pwd);

//console.log(process.cwd());
//console.log(__dirname);

//function pwd(){
//    return process.cwd();
//}

// パタンにマッチするファイルのリストを計算 (レンダラプロセスから呼ばれる)
function files(patterns){
    const command = `cd ${pwd}; git ls-files`;
    var list = execSync(command).toString().split(/\n/);
    var files = new Set;
    for(var file of list){
	for(var i=0;i<patterns.length;i++){
	    var pattern = patterns[i];
	    if(pattern.length > 0){
		var re = new RegExp(pattern,'i');
		if(file.match(re)){
		    files.add(file);
		}
	    }
	}
    }
    var a = Array.from(files);
    if(a.length == 0) a = ["xxxxx"];
    return a.join("|");
}

// ブランチリスト (レンダラプロセスから呼ばれる)
function branches(){
    const command = 'cd ${pwd}; git branch';
    var list = execSync(command).toString().split(/\n/);
    var branches = [];
    for(var branch of list){
	if(branch != ''){
	    branches.push(branch.replace(/^\s*/,'').replace(/^\*\s*/,''));
	}
    }
    if(branches.length == 0) branches = ["xxxxx"];
    return branches.join("|");
}

// レンダリングプロセスから呼べるようにする
app.files = files;
app.branches = branches;
//app.pwd = pwd;
//app.pwd = process.env['PWD'];
//app.pwd = app.getAppPath();

function createWindow () {
    win = new BrowserWindow({
	width: 600,
	height: 400,
	frame: false
    });
    win.loadURL(`file://${__dirname}/index.html`);

    // win.webContents.openDevTools();
    
    win.on('closed', () => {
	// windowがクローズされたら null にして削除 (nullにする必要性は不明...)
	var command = 'osascript -l JavaScript -e \'Application("System Events").keystroke("v", {using:"command down"});\'';
	exec(command, (error, stdout, stderr) => {
    	    //console.log(stdout);
	});
        win = null;
	app.quit();
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
	app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
	createWindow();
    }
});
