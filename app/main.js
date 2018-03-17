const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

// window objectがGCされないようにするために、globalに定義する
let win;

function files(){
    var command = 'git ls-files';
    var list = execSync(command).toString().split(/\n/);
    var argv = process.argv;
    var files = new Set;
    for(var file of list){
	for(var i=2;i<argv.length;i++){
	    var re = new RegExp(argv[i],'i');
	    if(file.match(re)){
		files.add(file);
	    }
	}
    }
    var a = Array.from(files);
    if(a.length == 0) a = ["xxxxx"];
    return a.join("|");
}

//console.log(files());

app.files = files;

function createWindow () {
    win = new BrowserWindow({
	width: 800,
	height: 600
	// frame: false
    });
    
    win.loadURL(`file://${__dirname}/index.html`);
    
    win.on('closed', () => {
	// windowがクローズされたら null にして削除
	// nullにする必要は??

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
