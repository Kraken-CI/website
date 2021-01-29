deploy: schema
	USE_SSH=true GIT_USER=godfryd yarn deploy

start:
	yarnpkg start --no-open

schema:
	./venv/bin/python ../kraken/server/kraken/server/schemaval.py json
	./venv/bin/python ../jsonschema2md/jsonschema2md.py kraken.schema.json docs/schema-ref-embed.md
