deploy: schema server-api
	USE_SSH=true GIT_USER=godfryd yarn deploy

start:
	yarnpkg start --no-open

prep-venv:
	python3 -m venv venv
	./venv/bin/pip install -U pip
	./venv/bin/pip install jsonschema click

schema:
	./venv/bin/python ../kraken/server/kraken/server/schemaval.py json
	./venv/bin/python jsonschema2md.py kraken.schema.json docs/schema-ref-embed.md

server-api:
	./node_modules/.bin/widdershins  --language_tabs 'shell:Shell' -- ../kraken/server/kraken/server/swagger.yml | \
           tail -n +26 | \
           grep -v 'backwards compatibility' | \
           grep -v 'Base URLs' | \
           grep -v 'a href="/api' \
           > docs/server-api.md
