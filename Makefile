build:
	@npm install
#	@cd test/express-factory/2; npm install --loglevel error
	@cd test/express-factory/3; npm install --loglevel error
	@cd test/express-factory/4; npm install --loglevel error

test:
	@mocha

publish: test
	npm publish

.PHONY: build test publish
