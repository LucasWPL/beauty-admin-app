up:
	docker compose up -d
	make bash
down:
	docker compose down
restart:
	make down
	make up
bash:
	docker exec -it beauty-admin-app-node bash

# gambiarra, fazer por ci dps
build:
	npm run build
	cp .htaccess dist/.htaccess
	cp .env.production dist/.env
	apt update
	apt install zip
	zip -r build.zip dist/