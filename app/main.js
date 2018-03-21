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

var fs = require('fs');
function _pwd(){
    var pwd = process.env['HOME'];
    var pwdfile = "/tmp/githelp.pwd";

    try {
	fs.statSync(pwdfile);
    } catch(err) {
	return pwd;
    }
    return fs.readFileSync(pwdfile, 'utf8').replace(/\n/,'');
}
var pwd = _pwd();

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
app.pwd = pwd;

function createWindow () {
    var command = `cd ${pwd}; git rev-parse --git-dir > /dev/null >& /dev/null`;
    try {
	execSync(command);
    } catch(err) {
	app.quit();
	return;
    }

    win = new BrowserWindow({
	width: 600,
	height: 400,
	frame: false
    });
    win.loadURL(`file://${__dirname}/index.html`);

    // 常に最前面でフォーカスされるようにする
    win.setAlwaysOnTop(true);
    win.on('blur', () => {
	win.focus();
    });

    var curpos = fs.readFileSync('/tmp/githelp.cursorpos', 'utf8').replace(/\n/,'').split(/ /);
    var col = Number(curpos[1]);
    var row = Number(curpos[0]);
    
    var winpos = execSync("osascript -e 'tell application \"System Events\" to get position of first window of application process \"Terminal\"'").toString().split(/\n/)[0].split(/,\s*/);
    var x = Number(winpos[0]);
    var y = Number(winpos[1]);

    //console.log(`x = ${x}`);
    //console.log(`y = ${y}`);
    //console.log(`col = ${col}`);
    //console.log(`row = ${row}`);
    
    win.setPosition(x + col * 10 + 20, y + row * 14 + 52);

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
