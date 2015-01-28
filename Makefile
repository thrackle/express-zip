build:
	@npm install

test:
	npm test

publish:
	npm test && npm publish

.PHONY: build test publish
