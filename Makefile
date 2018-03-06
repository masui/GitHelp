data:
	ruby getdata

install:
	bundle install
	-mkdir ~/.config
	-mkdir ~/.config/peco
	cp .config/peco/config.json ~/.config/peco/config.json
	-mkdir ~/bin
	cp bin/gh ~/bin/gh
