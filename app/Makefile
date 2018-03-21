install: npm browserify cursorpos electron

npm:
	npm install

browserify:
	browserify githelp.js -o githelp_browser.js

electron:
	npm install electron

cursorpos: cursorpos.c
	cc cursorpos.c -o cursorpos

mac:
	electron-packager . githelp --overwrite --platform=darwin --arch=x64 --electronVersion=0.36.1


