const electron = window.require('electron');
//const remote = window.require('electron').remote;
//const shell = window.require('electron').shell;
const remote = electron.remote;
const shell = electron.shell;
const clipboard = electron.clipboard;

//alert(remote);
//
//setTimeout(function(){
//    let w = remote.getCurrentWindow();
//    alert(w);
//    w.close();
//
//    //window.open('about:blank','_self').close();
//},2000);
//
//process.exit()


data = require("./data");
Generator = require('re_expand');

const files = 'files';
const change = '変更';
const numbers = '1|2|3';
const display = '表示する';
const params = 'param1|param2';
const del = '消す';
const branches = 'branch1';
const modified = '変わった';

var out = '';

function init(){
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

    $(window).on('keyup',function(e){
	if(e.keyCode == 13){
	    let w = remote.getCurrentWindow();
	    w.close();
	}
	// カーソルキーなどの処理
    });

    $('#query').on('keyup', function(event){
	$('#result').empty();

	g.filter(' ' + $('#query').val() + ' ', f, 0);

    });

    function f(a, cmd){
	var num = cmd.match(/\s*{(\d+)}$/,"$1")[1];
	cmd = cmd.replace(/\s*{(\d+)}$/,"");
	var li = $('<li>');
	$('#result').append(li);
	var span = $('<span>');
	span.attr('class','title');
	span.text(a);
	li.append(span);
	var icon = $('<img>');
	icon.attr('src',"https://www.iconsdb.com/icons/preview/orange/info-xxl.png");
	icon.attr('class','icon');
	icon.attr('id',num);
	icon.on('click',function(e){
	    // とてもよくわからないがこれで外部ブラウザを開ける
	    var t = data.pages[$(e.target).attr('id')];
	    var url = `https://scrapbox.io/GitHelp/${t}`;
	    //shell.openExternal(url);
	    clipboard.writeText(url);
	});
	li.append(icon);
	var code = $('<code>');
	code.text(cmd);
	$('#result').append(code);
    }
}

$(function() {
    init();
});

