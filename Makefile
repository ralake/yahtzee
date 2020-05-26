BIN = ./node_modules/.bin

.PHONY: bootstrap build build-server dev-build start deploy logs

bootstrap:
	npm install

build-client:
	npm run build-client

dev-build-client: clean-reason build-reason
	NODE_ENV=production $(BIN)/webpack -p --progress --colors --watch

start:
	npm start

dev:
	${BIN}/concurrently "make dev-build-client" "make start"

deploy: clean-reason build-reason build-client
	gcloud app deploy

clean-reason:
	${BIN}/bsb -clean-world

build-reason:
	${BIN}/bsb -make-world

logs:
	gcloud app logs tail -s default
