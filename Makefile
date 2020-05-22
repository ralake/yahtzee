BIN = ./node_modules/.bin

.PHONY: bootstrap build dev-build start dev-start deploy

bootstrap:
	npm install

build: clean-reason build-reason
	NODE_ENV=production $(BIN)/webpack -p --progress --colors

dev-build: clean-reason build-reason
	NODE_ENV=production $(BIN)/webpack -p --progress --colors --watch

start:
	npm start

dev:
	${BIN}/concurrently "make dev-build" "make dev-start"

dev-start:
	npm start

deploy: build
	gcloud app deploy

clean-reason:
	${BIN}/bsb -clean-world

build-reason:
	${BIN}/bsb -make-world
