---
id: dev-guide
title: Development Guide
---

## Development Depencies

### Ubuntu 20.04

- git
- rake
- python3-venv
- python3-pip
- openjdk-11-jre-headless or newer -- required for swagger-codegen
- docker.io
- docker-compose

```console
$ sudo apt update
$ sudo apt install git rake python3-venv python3-pip openjdk-11-jre-headless \
   docker.io docker-compose
```


## Download Sources

Sources are stored in Git repository on GitHub: https://github.com/Kraken-CI/kraken.
First start with forking the repository and then cloning your own copy of it.

To clone repository via HTTPS do:

```console
$ git clone https://github.com/<username>/kraken

```
or using SSH:

```console
$ git clone git@github.com:<username>/kraken.git
```

## Start in Docker Compose

```console
$ cd kraken
$ rake docker_up
```

This command is using docker-compose.yaml file from the repository.
This file defines all the services and how to build them.
So this command builds all services and then spins up their containers.

Now Kraken service is avaiable from [http://localhost:8080](http://localhost:8080).

All containers can be stopped by `Ctrl-C`. You may use this method for
development. Prepare changes, then `rake docker_up`, check changes
if all is ok and then stop all with `Ctrl-C`.

This method is not that convenient for quick development. Building
and starting all services from scratch takes several minutes.
There is a better method

## Start Services Individually

Each Kraken service can be run individually. There is a bunch of Rake
tasks for that:

- `rake serve_ui` - start Kraken Angular app
- `rake run_server` - start Kraken web server
- `rake run_scheduler` - start Kraken scheduler service
- `rake run_planner` - start Kraken planner service
- `rake run_watchdog` - start Kraken watchdog service
- `rake run_rq` - start RQ with Kraken background tasks
- `rake run_qneck` - start Queue Neck service for filtering background tasks
- `rake run_agent` - start Kraken Agent service localy
- `rake run_agent_in_docker` - start Kraken Agent service inside Docker container
- `rake run_agent_in_lxd` - start Kraken Agent service inside LXD container
- `rake run_ch` - start ClickHouse and ClickHouse-proxy services
- `rake run_minio` - run MinIO service
- `rake run_redis` - run Redis service
- `rake run_pgsql` - run PostgreSQL service

This way all needed services can be started and then developed and restarted individually.

To avoid running all of them manually, there is a script for `Tmux` terminal that
opens separate window for each service. So first start `tmux` and then
load Kraken script inside `tmux`:

1. run `tmux`
2. press `ctrl-b + :` -- to open tmux prompt
3. type `source-file kraken.tmux`

or directly in command line:

```console
$ tmux new-session \; source-file kraken.tmux`
```

or using a script in the repo:

```console
$ ./start-tmux.sh`
```

The effect should look as follows:

![Kraken in Tmux](/img/tmux.png)

Now we can connect directly to Kraken Angular application. It is available
on [http://localhost:4200](http://localhost:4200).
