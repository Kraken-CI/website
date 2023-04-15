setup:
	yarnpkg install

start:
	yarnpkg start --no-open

deploy: schema server-api
	DEPLOYMENT_BRANCH=master USE_SSH=true GIT_USER=godfryd yarn deploy

prep-venv:
	python3 -m venv venv
	./venv/bin/pip install -U pip
	./venv/bin/pip install jsonschema click

schema:
	cd ../kraken/client && ../venv/bin/poetry run kkci -s http://admin:admin@localhost:8080 dump-workflow-schema ../../kraken-website/kraken.schema.json
	./venv/bin/python jsonschema2md.py kraken.schema.json docs/schema-ref-embed.md

server-api:
	./node_modules/.bin/widdershins  --language_tabs 'shell:Shell' -- ../kraken/server/kraken/server/swagger.yml | \
           tail -n +26 | \
           grep -v 'backwards compatibility' | \
           grep -v 'Base URLs' | \
           grep -v 'a href="/bk/api' \
           > docs/server-api.md
