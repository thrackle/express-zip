build:
	@npm install

test:
	@mocha

publish: test
	npm publish

.PHONY: build test publish
