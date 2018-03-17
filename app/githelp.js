//
//  GitHelp
//
const electron = window.require('electron');
const remote = electron.remote;
const shell = electron.shell;
const clipboard = electron.clipboard; // clipboard.writeText() でクリップボードに文字列が入る

data = require("./data");
Generator = require('re_expand');

var files = 'README.md|index.html|Makefile|main.js|githelp.js';
const params = 'param1|param2';
const numbers = '1|2|3';

const change = '変更';
const display = '表示する';
const del = '消す';
const branches = 'branch1';
const modified = '変わった';

var commands = [];
var commandind = 0;

var g; // ExpandHelp generator

function generator(patterns){
    var g = new Generator();

    files = remote.app.files(patterns); // レンダラプロセスではコマンド起動できないようなのでメインプロセスを利用してファイルリストを取得
    
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
    return g;
}

function finish(){
    let w = remote.getCurrentWindow();
    w.close();
}

function sel(e){
    clipboard.writeText(commands[$(e.target).attr('ind')]);
    finish();
}
    
function addentry(a, cmd){ // 候補を整形してリストに追加
    var num = cmd.match(/\s*{(\d+)}$/,"$1")[1]; // 説明ページの番号を取得
    cmd = cmd.replace(/\s*{(\d+)}$/,"");
    commands[commandind] = cmd;
    var div = $('<div>')
	    .on('click',sel)
	    .attr('ind',commandind)
	    .attr('class','entry')
	    .appendTo($('#candidates'));
    var span = $('<span>')
	    .on('click',sel)
	    .attr('ind',commandind)
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
	    .on('click',sel)
	    .attr('ind',commandind)
	    .text(cmd)
	    .appendTo(div);
    
    commandind += 1;
}

function init(){
    $(window).on('keyup',function(e){
	//if(e.keyCode == 13){ // 終了処理
	//    // 変換確定キーで終了してしまふ...
	//    finish();
	//}
	// カーソルキーなどの処理をここでやるべきなのだろう
    });

    $('#query').on('keyup', function(event){
	$('#candidates').empty();
	commandind = 0;
	
	// インクリメンタルにファイル名やパラメタも計算してマッチング
	var qstr = $('#query').val();
	g = generator(qstr.split(/\s+/));
	g.filter(` ${qstr} `, addentry, 0);
    });
    
    g = generator([]);
    g.filter(' ', addentry, 0);

    clipboard.writeText('');
    $('#query').focus();
}

$(function() {
    init();
});

