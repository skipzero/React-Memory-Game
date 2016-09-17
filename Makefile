.PHONEY: all run build js

all: build

clean:
	-rm -rf ./node_modules ./dist

lint: node_modules/
	./node_modules/.bin/jshint src/js

run: build
	./node_modules/.bin/http-server

build: node_modules/
	mkdir -p dist/js && babel src/js/main.js -o dist/js/main.js -sw &

node_modules/: package.json
	npm install
