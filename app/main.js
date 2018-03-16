const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const clipboard = electron.clipboard;

//const {BrowserWindow} = require('electron').remote;
// console.log(`remote=${remote}`);

const exec = require('child_process').exec;

Generator = require('re_expand');
g = new Generator();

g.add( "「(abc|def)」ファイルを(1|2|3|4)分前の(もの|バージョン)と比較する", "git diff HEAD '@{$2 minutes ago}' $1");
function f(a, cmd){
    //console.log(`${a} => ${cmd}`);
}
g.filter(" 2 ", f, 0);

//console.log(process.argv.join('/'));

// window objectがGCされないようにするために、globalに定義する
let win;

var arg2 = process.argv[2];
console.log(arg2);

function createWindow () {
    win = new BrowserWindow({
	width: 800,
	height: 600
	// frame: false
    });
    
    win.loadURL(`file://${__dirname}/index.html`);
    
    win.on('closed', () => {
	// windowがクローズされたら null にして削除

	// clipboard.writeText("xxxxxxxxxxxxyyy");
	
	//var ks = require('node-key-sender');
	////ks.sendKeys(['a', 'k', 'j']);
	//ks.sendCombination(['cmd', 'v']);
	
	var command = 'osascript -l JavaScript -e \'Application("System Events").keystroke("v", {using:"command down"});\'';
	exec(command, (error, stdout, stderr) => {
    	    //console.log(stdout);
	});
	
        win = null;
	app.quit();
	
    });
}

app.on('ready', () => {
    //var command = 'ls';

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
	app.quit();
    }
});

app.on('activate', () => {

    //console.log(process.argv[1]);
    
    if (win === null) {
	createWindow();
    }
});
