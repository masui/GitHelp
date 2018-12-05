#
# https://stackoverflow.com/questions/16361093/querying-cursor-position-with-ansi-escape-codes
#

system "stty -echo cbreak"

print "\x1b[6n" # ターミナルのカーソル位置を得るエスケープシーケンス

x = ""
while true
  c = STDIN.getc
  x += c
  break if c == 'R'
end

system "stty echo -cbreak"

x =~ /(\d+);(\d+)/

File.open("/tmp/cursorpos","w"){ |f|
  f.puts "#{$1} #{$2}"
}




