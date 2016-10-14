
build:
	@echo "compile"
	@tsc -p .
	@echo "copy files"
	@cd ./src/client && find . -name '*.html' -exec cp --parents \{\} ../../bin/client \; && cd ../../
	@cd ./src/client && find . -name '*.css' -exec cp --parents \{\} ../../bin/client \; && cd ../../
	@echo "finished"

run:
	@echo "running dev"
	@node ./bin/server/server.js
