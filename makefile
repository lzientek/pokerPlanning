
install:
	@echo "install npm packages"
	@npm install
	@typings install

copy-frontend-dependencies:
	@echo "copy dependencies"
	@gulp copyclient

build:
	@rm -rf ./bin/* || true
	@echo "compile"
	@tsc -p .
	@$(MAKE) copy-frontend-dependencies
	@echo "finished"

run:
	@echo "running dev"
	@node ./bin/server/server.js
