PORT?=9000
CONTAINER_NAME?=zapping-app
.DEFAULT_GOAL := all

stop: 
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

build:
	docker build -t zapping-app .

run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):3000 zapping-app 

all a: 
	-@$(MAKE) stop
	@$(MAKE) build
	@$(MAKE) run

