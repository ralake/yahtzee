BIN = ./node_modules/.bin

.PHONY: bootstrap dev deploy clean-reason build-reason

bootstrap:
	npm install

build-watch: clean-reason build-reason
	NODE_ENV=production $(BIN)/webpack -p --progress --colors --watch

dev:
	${BIN}/concurrently "make build-watch" "make start"

clean-reason:
	${BIN}/bsb -clean-world

build-reason:
	${BIN}/bsb -make-world

deploy: clean-reason docker-build docker-push
	kubectl set image deployment yahtzee-web yahtzee-app=gcr.io/yahtzee-277312/yahtzee-app:v1

docker-build:
	docker build -t gcr.io/yahtzee-277312/yahtzee-app:v1 .

docker-push:
	docker push gcr.io/yahtzee-277312/yahtzee-app:v1

docker-run-local:
	docker run --rm -p 2001:2001 gcr.io/yahtzee-277312/yahtzee-app:v1

# https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app
