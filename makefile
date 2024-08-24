PORT?=9000

.DEFAULT_GOAL := all


build:
	docker build -t zapping-app .

run:
	docker run -p $(PORT):3000 zapping-app

all: build run
