var data = {
    "defsxxx": [
	"$ xxxxというファイルを2日前のものと比較する {8}",
	"$ 2日前のxxxxというファイルを現在のものと比較する {8}",
	"% git diff HEAD '@{2 days ago}' xxxx {8}"
    ],
    "defs": [
	"$ xxxxというファイルを2日前のものと比較する {8}",
	"$ 2日前のxxxxというファイルを現在のものと比較する {8}",
	"% git diff HEAD '@{2 days ago}' xxxx {8}",
	"$ 「(#{files})」ファイルを(#{numbers})分前の(もの|バージョン)と比較する {8}",
	"$ 「(#{files})」ファイルが(#{numbers})分前から(変化した|変わった)ところを(#{display}) {8}",
	"% git diff HEAD '@{#{$2} minutes ago}' #{$1} {8}",
	"$ (#{numbers})分前の「(#{files})」ファイルと現在の(もの|バージョン)を比較する {8}",
	"% git diff HEAD '@{#{$1} minutes ago}' #{$2} {8}",
	"$ (#{numbers})日前の「(#{files})」ファイルと現在のものを(比較する|比べる) {8}",
	"% git diff HEAD '@{#{$1} days ago}' #{$2} {8}",
	"$ 現在の「(#{files})」ファイルを(#{numbers})日前のものを(比較する|比べる) {8}",
	"% git diff HEAD '@{#{$2} days ago}' #{$1} {8}",
	"$ (1つ|ひとつ)前のバージョンの(#{files})と比較 {8}",
	"$ (1つ|ひとつ)前のバージョンの(#{files})からの変更点 {8}",
	"% git diff $(git rev-list -n 1 HEAD -- #{$2})^ -- #{$2} {8}",
	"$ (#{files})を(1つ|ひとつ)前のバージョンと比較 {8}",
	"$ (#{files})の(1つ|ひとつ)前のバージョンからの変更点 {8}",
	"% git diff $(git rev-list -n 1 HEAD -- #{$1})^ -- #{$1} {8}",
	"$ (#{files})の最新版の変更点を(#{display}) {8}",
	"$ 最新の(#{files})の変更個所は? {8}",
	"$ (#{files})は最後にどこを変えた? {8}",
	"$ (#{files})の(一番新しい|最新の)変更は? {8}",
	"% git diff $(git rev-list -n 1 HEAD -- #{$1})^ -- #{$1} {8}",
	"$ (2つ|ふたつ)前のバージョンの(#{files})と比較 {8}",
	"$ (2つ|ふたつ)前のバージョンの(#{files})からの変更点を(#{display}) {8}",
	"% git diff $(git rev-list -n 1 HEAD -- #{$2})^^ -- #{$2} {8}",
	"$ (#{files})を(2つ|ふたつ)前のバージョンと比較 {8}",
	"$ (#{files})の(2つ|ふたつ)前のバージョンのからの変更点を(#{display}) {8}",
	"% git diff $(git rev-list -n 1 HEAD -- #{$1})^^ -- #{$1} {8}",
	"$ ファイルを大きい順に表示する {9}",
	"% git ls-files | xargs du -s | sort -r -n {9}",
	"$ 直前のコミットを取り消す {10}",
	"% git reset --soft HEAD^ {10}",
	"$ ひとつ前のコミットの状態に完全に戻す {10}",
	"% git reset --hard HEAD^ {10}",
	"$ コミット後の変更を全部消す {10}",
	"% git reset --hard HEAD {10}",
	"$ すごい昔の状態で動作を確認したい {10}",
	"% git reset --hard 昔のコミットのハッシュ値 {10}",
	"$ 直前のリセットをなかったことにする {10}",
	"% git reset --hard ORIG_HEAD {10}",
	"$ 過去のあらゆる操作履歴を見る {11}",
	"% git reflog {11}",
	"$ 過去のコミット履歴を見る {11}",
	"% git log {11}",
	"$ ブランチ(のリスト)?を(#{display}) {14}",
	"% git branch {14}",
	"$ (#{params})というブランチを作成する {14}",
	"% git branch #{$1} {14}",
	"$ (#{branches})というブランチを(#{del}) {14}",
	"% git branch -d #{$1} {14}",
	"$ 現在の編集状態を(#{display}) {18}",
	"$ 編集中のファイルを(#{display}) {18}",
	"% git status {18}",
	"$ (#{numbers})個前までのコミットをまとめる {22}",
	"% git rebase -i HEAD~#{$1} {22}",
	"$ ひとつ前の「(#{files})」ファイルを(#{display}) {24}",
	"$ 1バージョン前の「(#{files})」ファイルを(#{display}) {24}",
	"% git show HEAD~:#{$1} {24}",
	"$ ふたつ前の「(#{files})」ファイルを(#{display}) {24}",
	"$ 2バージョン前の「(#{files})」ファイルを(#{display}) {24}",
	"% git show HEAD~~:#{$1} {24}",
	"$ (#{numbers})個前の「(#{files})」ファイルを(#{display}) {24}",
	"$ (#{numbers})バージョン前の「(#{files})」ファイルを(#{display}) {24}",
	"% git show HEAD~#{$1}:#{$2} {24}",
	"$ (#{numbers})分前の「(#{files})」ファイルを(#{display}) {24}",
	"% git show '@{#{$1} minutes ago}':#{$2} {24}",
	"$ (#{numbers})時間前の「(#{files})」ファイルを(#{display}) {24}",
	"% git show '@{#{$1} hours ago}':#{$2} {24}",
	"$ (#{numbers})日前の「(#{files})」ファイルを(#{display}) {24}",
	"% git show '@{#{$1} days ago}':#{$2} {24}",
	"$ 昨日の「(#{files})」ファイルを(#{display}) {24}",
	"% git show @{yesterday}:#{$1} {24}",
	"$ (#{numbers})分前(から|以降に)(#{modified})ファイルをリストする {26}",
	"% git diff --name-only '@{#{$1} minutes ago}' {26}",
	"$ (#{numbers})時間前(から|以降に)(#{modified})ファイルをリストする {26}",
	"% git diff --name-only '@{#{$1} hours ago}' {26}",
	"$ (#{numbers})日前(から|以降に)(#{modified})ファイルをリストする {26}",
	"% git diff --name-only '@{#{$1} days ago}' {26}",
	"$ (#{numbers})日前からの変更を(#{display}) {26}",
	"% git log --stat --since=\"#{$1} days ago\" {26}",
	"$ 編集中のファイルをリストする {27}",
	"% git ls-files -m {27}",
	"$ (#{params})という文字列がはじめて出現した(バージョン|コミット)の情報を(#{display}) {28}",
	"% git log -1 `git rev-list --all | xargs git grep '#{$1}' | tail -1 | ruby -e \"STDIN.each {|line| puts line[0..39] }\"` {28}",
	"$ (#{params})という文字列がはじめて出現した(バージョン|コミット)に一時的に戻す {28}",
	"% git checkout `git rev-list --all | xargs git grep '#{$1}' | tail -1 | ruby -e \"STDIN.each {|line| puts line[0..39] }\"` {28}",
	"$ (#{numbers})個前のバージョンに一時的に戻す {29}",
	"% git checkout HEAD~#{$1} {29}",
	"$ (#{numbers})日前の状態に一時的に戻す {29}",
	"% git checkout \"@{#{$1} days ago}\"  {29}",
	"$ (#{numbers})時間前の状態に一時的に戻す {29}",
	"% git checkout \"@{#{$1} hours ago}\"  {29}",
	"$ (#{numbers})分前の状態に一時的に戻す {29}",
	"% git checkout \"@{#{$1} mins ago}\"  {29}",
	"$ 「(#{params})」という文字列を含むファイルを捜す {30}",
	"% git grep '#{$1}' {30}",
	"$ 「(#{params})」という文字列を含むファイルを全履歴から捜す {30}",
	"% git rev-list --all | xargs git grep '#{$1}' {30}",
	"$ ブランチ名を(#{params})に変える {31}",
	"% git branch -m #{$1} {31}",
	"$ ファイルの(編集|修正)のランキングを(#{display}) {34}",
	"$ (よく|頻繁に)(編集|修正)(されてる|されている)ファイルを(#{display}) {34}",
	"$ ファイルの編集頻度を(#{display}) {34}",
	"$ ファイルを編集頻度順にソート {34}",
	"% git log --name-only --pretty=\"format:\" | grep -ve \"^$\" | sort | uniq -c | sort -r {34}",
	"$ (1つ|ひとつ)前のコミットで(削除した|消した)(#{files})を(復元する|元に戻す) {36}",
	"% git checkout $(git rev-list -n 1 HEAD -- #{$2})^ -- #{$2} {36}",
	" $ ファイル「(#{files})」の(#{numbers})分前からの(#{change})履歴を(#{display}) {37}",
	" % git log --since \"#{$2} minutes ago\" #{$1} {37}",
	" $ (#{numbers})分前からのファイル「(#{files})」の(#{change})履歴を(#{display}) {37}",
	" % git log --since \"#{$1} minutes ago\" #{$2} {37}",
	" $ ファイル「(#{files})」の(#{numbers})分前からの(#{change})を(#{display}) {37}",
	" % git diff HEAD \"@{#{$2} minutes ago}\" #{$1} {37}",
	" $ (#{numbers})分前からのファイル「(#{files})」の(#{change})を(#{display}) {37}",
	" % git diff HEAD \"@{#{$1} minutes ago}\" #{$2} {37}",
	" $ ファイル「(#{files})」の(#{numbers})時間前からの(#{change})履歴を(#{display}) {37}",
	" % git log --since \"#{$2} hours ago\" #{$1} {37}",
	" $ (#{numbers})時間前からのファイル「(#{files})」の(#{change})履歴を(#{display}) {37}",
	" % git log --since \"#{$1} hours ago\" #{$2} {37}",
	" $ ファイル「(#{files})」の(#{numbers})時間前からの(#{change})を(#{display}) {37}",
	" % git diff HEAD \"@{#{$2} hours ago}\" #{$1} {37}",
	" $ (#{numbers})時間前からのファイル「(#{files})」の(#{change})を(#{display}) {37}",
	" % git diff HEAD \"@{#{$1} hours ago}\" #{$2} {37}",
	" $ ファイル「(#{files})」の(#{numbers})日前からの(#{change})履歴を(#{display}) {37}",
	" % git log --since \"#{$2} days ago\" #{$1} {37}",
	" $ (#{numbers})日前からのファイル「(#{files})」の(#{change})履歴を(#{display}) {37}",
	" % git log --since \"#{$1} days ago\" #{$2} {37}",
	" $ ファイル「(#{files})」の(#{numbers})日前からの(#{change})を(#{display}) {37}",
	" % git diff HEAD \"@{#{$2} days ago}\" #{$1} {37}",
	" $ (#{numbers})日前からのファイル「(#{files})」の(#{change})を(#{display}) {37}",
	" % git diff HEAD \"@{#{$1} days ago}\" #{$2} {37}",
	"$ 現在の状況を(#{display}) {38}",
	"% git status {38}",
	"$ 「(#{files})」というファイルを「(#{params})」という名前に(変更|移動|改名|リネーム)する {39}",
	"% git mv #{$1} #{$2} {39}",
	"$ ファイル「(#{files})」を(#{del}) {40}",
	"% git rm #{$1} {40}",
	"$ ブランチを(表示|リスト)する {41}",
	"% git branch {41}",
	"$ 「(#{params})」というブランチを作成する {41}",
	"% git branch #{$1} {41}",
	"$ 「(#{params})」というブランチを(#{del}) {41}",
	"% git branch -d #{$1} {41}",
	" $ (仕事|変更)を一時的に退避 {43}",
	" % git stash save {43}",
	" $ ファイル「(#{files})」の編集履歴を完全に(#{del})がワーキングツリーは残す {44}",
	" % git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch #{$1}' HEAD {44}",
	" $ ファイル「(#{files})」の編集履歴を完全に(#{del}) {44}",
	" % git filter-branch -f --index-filter 'git rm --ignore-unmatch #{$1}' HEAD {44}",
	"$ 編集履歴をGitHubに反映させる {44}",
	"% git push origin --force --all {44}",
	"$ 直前のコミットのコメントを修正する {45}",
	"% git commit --amend {45}",
	"$ ファイルを新しい順に(リスト|表示)する {46}",
	"% git ls-files | xargs ls -1 -t {46}",
	"$ (#{files})に(#{params})という名前が(出現した|書かれた)のはいつ？ {47}",
	"% git blame #{$1} | grep #{$2} {47}",
	"$ (#{params})という名前が(#{files})に(出現した|書かれた)のはいつ？ {47}",
	"% git blame #{$2} | grep #{$1} {47}",
	"$ これまで追加/削除された行数を表示する {48}",
	"% git log --numstat --pretty=\"%H\" | awk 'NF==3 {plus+=$1; minus+=$2} END {printf(\"+%d, -%d\\\\n\", plus, minus)}' {48}",
	"$ (#{files})に(#{params})という名前が(出現した|書かれた)のはいつ？ {50}",
	"% git blame #{$1} | grep #{$2} {50}",
	"$ ツリー状にログを表示する {51}",
	"% git log --graph --all --format=\"%x09%an%x09%h %d %s\" {51}",
	"$ 最初に「(#{params})」という文字列を含むコミットをした時から現在までに追加されたファイルはどれとどれ？ {52}",
	"% git log --oneline --date=iso-strict --format='%cd %s' | grep #{$1} | tail -1 | awk '{print $1}' | xargs githelp-changed {52}"
    ],
    "pages": [
	"このサイトについて",
	"やりたいことの例",
	"Git情報源",
	"意義",
	"関連文献",
	"使い方",
	"疑問",
	"ファイルリスト",
	"古いファイルとの比較",
	"ファイルを大きい順に表示",
	"Reset関連",
	"操作履歴",
	"branches",
	"タグ",
	"ブランチの表示",
	"アイデア",
	"GitHelp論文構成案",
	"Gitのマニュアルページ",
	"編集中のファイル",
	"レポジトリ",
	"コミットID",
	"コミット",
	"コミットをまとめる",
	"バージョン指定",
	"古いファイル表示",
	"Glossary",
	"最近編集したファイルのリストを表示する",
	"編集中のファイルをリストする",
	"文字列がはじめて出現したバージョンを捜す",
	"古いバージョンに一時的に戻す",
	"変数や単語が出現しているファイルを捜す",
	"ブランチ名",
	"ユーザ情報",
	"引数パラメタ",
	"ファイルの編集回数のランキング",
	"リモートブランチを消す",
	"ファイル復元",
	"最近の変更を知る",
	"現在の状況",
	"ファイル名変更",
	"ファイル削除",
	"ブランチ",
	"テンプレート",
	"一時的に仕事を退避",
	"特定のファイルの履歴を消す",
	"コメント修正",
	"新しい順にファイルを表示",
	"文字列の出現を調べる",
	"追加/削除された行数",
	"数字パラメタ",
	"文字列の出現判定",
	"ツリー状にログを表示する",
	"ファイル追加",
	"args",
	"増井俊之"
    ]
};

module.exports = data;
