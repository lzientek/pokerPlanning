
install:
	@echo "install npm packages"
	@npm install

copy-frontend-dependencies:
	@echo "copy dependencies"
	@mkdir -p ./bin/client/libs/core-js/client/
	@cp -R ./node_modules/core-js/client/ ./bin/client/libs/core-js/
	@mkdir -p ./bin/client/libs/zone.js/dist/
	@cp ./node_modules/zone.js/dist/zone.js ./bin/client/libs/zone.js/dist/zone.js
	@mkdir -p ./bin/client/libs/reflect-metadata/
	@cp ./node_modules/reflect-metadata/Reflect.js ./bin/client/libs/reflect-metadata/Reflect.js
	@cp ./node_modules/reflect-metadata/Reflect.js.map ./bin/client/libs/reflect-metadata/Reflect.js.map
	@mkdir -p ./bin/client/libs/systemjs/dist/
	@cp ./node_modules/systemjs/dist/system.src.js ./bin/client/libs/systemjs/dist/system.src.js
	@mkdir -p ./bin/client/libs/socket.io-client/
	@cp ./node_modules/socket.io-client/socket.io.js ./bin/client/libs/socket.io-client/socket.io.js

build:
	@rm -rf ./bin/* || true
	@echo "compile"
	@tsc -p .
	@echo "copy files"
	@cd ./src/client && find . -name '*.html' -exec cp --parents \{\} ../../bin/client \; && cd ../../
	@cd ./src/client && find . -name '*.css' -exec cp --parents \{\} ../../bin/client \; && cd ../../
	@$(MAKE) copy-frontend-dependencies
	@echo "finished"

run:
	@echo "running dev"
	@node ./bin/server/server.js
