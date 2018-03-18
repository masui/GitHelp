//
//  GitHelp
//
const electron = window.require('electron');
const remote = electron.remote;
const shell = electron.shell;
const clipboard = electron.clipboard; // clipboard.writeText() でクリップボードに文字列が入る

const data = require("./data");
Generator = require('re_expand');

var files = '___';
var branches = 'master';
var params = 'param1|param2';
var numbers = '1|2|3';

//const change = '変更';
//const display = '表示する';
//const del = '消す';
//const modified = '変わった';
const glossary = require("./glossary"); // 各種定義をいれておく
for(var e in glossary){
    s = `${e} = '${glossary[e]}'`;
    eval(s);
}

var commands = [];
var commandind = 0;

var g; // ExpandHelp generator

function generator(patterns){
    var g = new Generator();

    files = remote.app.files(patterns); // レンダラプロセスではコマンド起動できないようなのでメインプロセスを利用してファイルリストを取得
    params = get_params(patterns);
    numbers = get_numbers(patterns);
    
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
    remote.getCurrentWindow().close();
}

function sel(e){
    clipboard.writeText(commands[$(e.target).attr('ind')]);
    finish();
}
    
function get_params(patterns){
    var a = new Set;
    for(var pattern of patterns){
	var m;
	if(m = pattern.match(/^'(.*)'$/)){
	    a.add(m[1]);
	}
	if(m = pattern.match(/^"(.*)"$/)){
	    a.add(m[1]);
	}
	if(m = pattern.match(/^\[(.*)\]$/)){
	    a.add(m[1]);
	}
    }
    a = Array.from(a);
    if(a.length == 0){
	a = ['param'];
    }
    return a.join('|');
}

function get_numbers(patterns){
    var a = new Set;
    for(var pattern of patterns){
	if(pattern.match(/^\d+$/)){
	    a.add(pattern);
	}
    }
    a = Array.from(a);
    if(a.length == 0){
	a = ['1'];
    }
    return a.join('|');
}

function addentry(a, cmd){ // 候補を整形してリストに追加
    var num = cmd.match(/\s*{(\d+)}$/,"$1")[1]; // 説明ページの番号を取得
    cmd = cmd.replace(/\s*{(\d+)}$/,"");
    if(commands.indexOf(cmd) >= 0) return;
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

var key_timeout = null;
function init(){
    $(window).on('keyup',function(e){
	//if(e.keyCode == 13){ // 終了処理
	//    // 変換確定キーで終了してしまふ...
	//    finish();
	//}
	// カーソルキーなどの処理をここでやるべきなのだろう
    });

    $('#query').on('keyup', function(e){
	$('#candidates').empty();
	commandind = 0;
	
	// インクリメンタルにファイル名やパラメタも計算してマッチング
	// したいところだがそれだとすごく遅い
	clearTimeout(key_timeout);
	setTimeout(function(){
	    var qstr = $('#query').val();
	    g = generator(qstr.split(/\s+/));
	    var pstr = qstr.replace(/'/g,'').replace(/"/g,'');
	    g.filter(` ${pstr} `, addentry, 0);
	},500);
    });
    
    g = generator([]);
    g.filter(' ', addentry, 0);

    // clipboard.writeText('');
    $('#query').focus();
}

$(function() {
    init();
});

