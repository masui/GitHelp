//
//
//
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

const child_process = require('child_process');
const exec = child_process.exec;
const execSync = child_process.execSync;

// window objectがGCされないようにするために、globalに定義する
let win;

// パタンにマッチするファイルのリストを計算
function files(patterns){
    const command = 'git ls-files';
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

// レンダリングプロセスから呼べるようにする
app.files = files;

function createWindow () {
    win = new BrowserWindow({
	width: 800,
	height: 600
	// frame: false
    });
    win.loadURL(`file://${__dirname}/index.html`);
    
    win.on('closed', () => {
	// windowがクローズされたら null にして削除 (nullにする必要は?)
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
