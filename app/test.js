data = require("./data");

const files = 'files';
const change = '変更';
const numbers = '1|2|3';
const display = '表示する';
const params = 'param1|param2';
const del = '消す';
const branches = 'branch1';
const modified = '変わった';

Generator = require('re_expand');
g = new Generator();

var lines = [];
for(var def of data.defs){
    m = def.match(/^\s*\$\s*(.*)\s*$/);
    if(m){
        lines.push(m[1]);
    }
    m = def.match(/^\s*\%\s*(.*)\s*$/);
    if(m){
	cmd = m[1];
	for(var line of lines){
	    var desc = line.replace(/\s*{(\d+)}\s*$/,'');
	    desc = ("\`"+desc+"\`").replace(/#{/g,'${');
	    var cmd = cmd.replace(/#{\$(\d+)}/g,"DOLLAR$1").replace(/DOLLAR/g,'$');
	    g.add(`${eval(desc)}`,cmd);
	}
    }
}

function f(a, cmd){
    // var num  = 0;
    //a = a.replace(/\s*{(\d+)}$/,function(s){
    //	num = s;
    //	return '';
    //    });
    var num = cmd.match(/\s*{(\d+)}$/,"$1")[1];
    cmd = cmd.replace(/\s*{(\d+)}$/,"");
    console.log(`${num}: ${a} => ${cmd}`);
}

g.filter(" 2 時間 ", f, 0);

