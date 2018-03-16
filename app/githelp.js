const electron = window.require('electron');
const remote = electron.remote;
const shell = electron.shell;
const clipboard = electron.clipboard; // clipboard.writeText(...) でクリップボードに文字列が入る

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

    function finish(){
	let w = remote.getCurrentWindow();
	w.close();
    }
    
    $(window).on('keyup',function(e){
	if(e.keyCode == 13){ // 終了処理
	    // 変換確定キーで終了してしまふ...
	    finish();
	}
	// カーソルキーなどの処理をここでやるべきなのだろう
    });

    $('#query').on('keyup', function(event){
	$('#candidates').empty();
	g.filter(' ' + $('#query').val() + ' ', f, 0);
    });
    
    g.filter(' ', f, 0);

    function f(a, cmd){ // 候補を整形してリストに追加
	var num = cmd.match(/\s*{(\d+)}$/,"$1")[1]; // 説明ページの番号を取得
	cmd = cmd.replace(/\s*{(\d+)}$/,"");
	var div = $('<div>')
		.attr('class','entry')
		.appendTo($('#candidates'));
	var span = $('<span>')
		.attr('class','title')
		.text(a)
		.appendTo(div);
	var icon = $('<img>')
		.attr('src',"https://www.iconsdb.com/icons/preview/orange/info-xxl.png")
		.attr('class','icon')
		.attr('id',num)
		.appendTo(div);
	$('<br>').appendTo(div);
	icon.on('click',function(e){
	    // とてもよくわからないがこれで外部ブラウザを開ける
	    var t = data.pages[$(e.target).attr('id')];
	    var url = `https://scrapbox.io/GitHelp/${t}`;
	    shell.openExternal(url);
	});
	var code = $('<code>')
		.text(cmd)
		.appendTo(div);
    }
}

$(function() {
    init();
});

