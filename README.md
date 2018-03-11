<h2>GitHelp</h2>

<ul>
  <li>Gitのコマンドの使いこなしを支援</li>
  <li>詳細は<a href="https://masui.github.io/GitHelp/">こちら</a>
</li>

<!--

<h3>概要</h3>

Gitのような複雑なシステムは使い方がわからなくて難しい。
ある程度使い方を知っている場合でも
あまり標準的でない操作は難しい。
たとえば以下のような場合は
どういうコマンドを使えばいいだろうか?

<ul>
  <li><code>README.md</code>は3日前からどう変わった?</li>
  <li>2バージョン前の<code>README.md</code>を見たい</li>
  <li><code>package.json</code>に<code>coffee</code>という名前が入ったのはいつ?</li>
  <li>ここ1週間ぐらい変更されてないファイルは?</li>
  <li>最近最も大量に修正したファイルはどれだっけ?</li>
</ul>

複雑なシステムにはヘルプやマニュアルが用意されているものだし、
FAQや逆引き辞典が用意されていることもあるし、
答がWebでみつかることもあるが、
うまく検索できないことも多いし、
やり方がわかった場合でも
キーワードやパラメタを指定して実行しなおす必要があるので手間がかかる。
作成者側から見ると
ヘルプ/マニュアル/逆引きなどは別々に作成しなければならないのが普通である。
<b>このような問題を
Scrapbox
と
<a href="http://www.interaction-ipsj.org/archives/paper2012/data/Interaction2012/oral/data/pdf/12INT012.pdf">ExpandHelp</a>
で解決する。</b>

<h3>利用例</h3>

Gitに関連するタスクのキーワードやパラメタを指定して
<code>githelp</code>を起動すると
候補のリストが表示され、
カーソルで選択すると実行される。

<ul>
  <li><code>README</code> <code>8</code> <code>比較</code> のような引数を指定して
    <code>githelp</code>コマンドを起動すると以下のような候補リストが提示される</li>
  
  <pre>
    $ githelp README 8 比較
    [0] 「README.md」ファイルを8分前のものと比較する
    % git diff HEAD "@{8 minutes ago}" README.md
    [1] 「README.md」ファイルを8時間前のものと比較する
    % git diff HEAD "@{8 hours ago}" README.md
    [2] 「README.md」ファイルを8日前のものと比較する
    % git diff HEAD "@{8 days ago}" README.md
    $
  </pre>
  
  <li> <code>-x</code> オプションで<code>2</code>のような数字を指定すると実行できる</li>
  
  <pre>
    $ githelp README 8 比較 -x2
    diff --git a/README.md b/README.md
    index 862f185..34c8907 100644
    --- a/README.md
    +++ b/README.md
    @@ -1,90 +1,3 @@
    # GitHelp
    
    -**Gitのコマンドの使いこなしを支援する**
    -
    -### 解決したい問題
    ...</pre>
  
  <li><code>-i</code> オプションを指定すると対話的に選択できる</li>
</ul>

<h3>インストール</h3>

<pre>
  % gem install githelp</pre>

<h3>実装</h3>

<ul>
  <li><a href="https://github.com/masui/expand_ruby">re_expand</a>
    という正規表現展開ライブラリを利用</li>
  <li><a href="https://github.com/masui/GitHelp/tree/master/data"><code>data</code>ディレクトリ</a>の下に<b>問題パタン</b>と<b>解決コマンド</b>を並べたものを用意しておく</li>
  
  <pre>
    [
    "「(#{files.join('|')})」ファイルを(#{numbers.join('|')})分前の(もの|バージョン)と比較する",
    'git diff HEAD "@{#{$2} minutes ago}" #{$1}'
    ],
  </pre>
  
  <li>ファイル名にマッチする引数(e.g. <code>README</code>)や
    数字にマッチする引数(e.g. <code>8</code>)が指定されると1行目の記述にマッチすることになる</li>
  <li>ワンライナーでは難しい場合は <a href="https://github.com/masui/GitHelp/tree/master/exe"><code>exe</code></a>
    の下にヘルパーコマンドを用意する (e.g. [<code>exe/githelp-changed</code>](https://github.com/masui/GitHelp/tree/master/exe/githelp-changed) )</li>
</ul>

<h3>解説</h3>

<ul>
  <li>ExpandHelp方式とは、
    様々なタスクの説明と実際の操作を組にして記述しておき、
    ユーザが与えたキーワードやパラメタにマッチするものを
    リストして実行可能にするというものである。</li>
  <li>いろんなクエリに対応できるようにするため説明は正規表現で記述しておく。
    たとえばシステムの時刻をセットする機能の説明は<code>(時計|時刻|時間)を((設定|セット)する|あわせる)</code>
    のような正規表現で記述しておくことにより、<code>時刻をセットする</code> <code>時間をあわせる</code>
    などのクエリにマッチするようにする。</li>
  <li>Macのヘルプで「時間」と入力しても時間をセットする方法は出てこない。
  https://gyazo.com/8a4662344f4300d1be66426e58f03bdf
  <li>「README.mdを消す方法」はマニュアルには書いてない。
    「ファイルを消す方法」しか書いてない。
    ファイルを消す方法を知った後で「README.md」を指定して実行する必要がある。</li>
  <li>そういえば先日「らくらくホン」画面上の鬱陶しい「羊」を消す方法が全くわからなかったのだが、あれは「マチキャラ」
    と呼ばれるものなので「マチキャラ」を消すという操作が必要だった。
    「羊 消す」とか「消す」とかで消せるべきだろう。githelpでは <code>$ githelp 削除</code> と入力すれば削除関連で何ができるのかわかる。</li>
  <li>ヘルプといえば人工知能的なアプローチの方がトレンドかもしれないが、
    本方式だと
    自分が何をやりたいのかはっきりわかってない場合でも使えるし、
    正しいセンテンスを正確に入力したり発声したりする必要がないから楽だと思う。
    予測入力に近いといえるかもしれない。</li>
  <li><b>Gitは単なる適用例であり、広い範囲で使いたいと思っている。</b></li>
</ul>

<h3> 注意</h3>

<ul>
  <li>Gitリポジトリのディレクトリで実行して下さい</li>
  <li><a href="https://github.com/masui/expand_ruby">re_expand</a>の実装が富豪的なので
    大きなリポジトリだと不具合があるかもしれません</li>
</ul>

<h3>関連システム</h3>

[AnyCode](http://dl.acm.org/citation.cfm?id=2814295)

自然言語キーワードからJavaスニペットを検索する
<code>copy fileA fileB</code> みたいなキーワードから <code>FileUtil.copyFile(new File(fileA), new File(fileB))</code> みたいなコード候補を生成する

-->