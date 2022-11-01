up:
	docker compose up -d
down:
	docker compose down
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