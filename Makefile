.PHONY: test
data:
	githelp -u

install:
	bundle install
	-mkdir ~/.config
	-mkdir ~/.config/peco
	cp .config/peco/config.json ~/.config/peco/config.json

release:
	rake release

test:
	rake test
