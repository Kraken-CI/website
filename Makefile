deploy:
	USE_SSH=true GIT_USER=godfryd yarn deploy

start:
	yarnpkg start --no-open
