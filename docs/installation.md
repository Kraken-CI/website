---
id: installation
title: Installation
sidebar_label: Installation
---

The easiest method for installing Kraken is based on Docker and Docker Compose.

## Pre-requisites

There are several things that are required to run Kraken. In short:

- Linux-based operating system
- Docker Engine and Docker Compose

The operating system must be **Linux based**. Kraken was tested on **Ubuntu 20.04**
but other distributions should be ok.

The next thing is Docker. **Docker Compose** is used to spawn all the Kraken services.
They are described in [Architecture chapter](architecture.md).

## Kraken Download

Kraken installation artifacts can be downloaded from [Kraken GitHub releases page](https://github.com/Kraken-CI/kraken/releases).
There are:

- **kraken-docker-compose-X.Y.yaml** - a services configuration file for Docker Compose
- **dot-X.Y.env** - an example configuration for Kraken services that is used by Docker Compose file

Docker Compose file is using pre-built Kraken container images.

Download these 2 files to your local machine that will host Kraken services. Put them in the same folder.
Rename `dot-X.Y.env` to `.env` - this is the only way to make it visible to `docker-compose`.

## Kraken Configuration

**.env** file contains Kraken basic configuration that is required to start Kraken services.
Default content of this file looks as follows:

```
ELASTIC_PASSWORD=changeme

POSTGRES_USER=kraken
POSTGRES_PASSWORD=kk123
POSTGRES_DB=kraken

KRAKEN_REDIS_ADDR=redis
KRAKEN_DB_URL=postgresql://kraken:kk123@postgres:5432/kraken
KRAKEN_LOGSTASH_PORT=5959
KRAKEN_LOGSTASH_ADDR=logstash:5959
KRAKEN_ELASTICSEARCH_PORT=9200
KRAKEN_ELASTICSEARCH_URL=http://elastic:changeme@elasticsearch:9200
KRAKEN_SERVER_PORT=6000
KRAKEN_SERVER_ADDR=server:6000
KRAKEN_PLANNER_URL=http://controller:7997/
KRAKEN_STORAGE_ADDR=controller:2121
KRAKEN_STORAGE_DIR=/var/kraken_storage
KRAKEN_UI_PUBLIC_PORT=8080
```

### Configuration for ELK stack

This is used when [ELK stack](https://www.elastic.co/) is run
internally in Docker together with Kraken services from the same Docker
Compose file. It is possible to set up ELK externally to Kraken
services on another machine.

- ELASTIC_PASSWORD - defines a password that is used to access ELK stack

### Configuration for PostgreSQL database

This is used when PostgreSQL is run internally in Docker together with
Kraken services from the same Docker Compose file. It is possible to
set up ELK externally to Kraken services on another machine.

- POSTGRES_USER - defines a user that is used to access PostgreSQL database
- POSTGRES_PASSWORD - defines a user that is used to access PostgreSQL database
- POSTGRES_DB - defines a user that is used to access PostgreSQL database

### Configuration for Kraken services

- KRAKEN\_REDIS\_ADDR - location of Redis in _address:port_ form
- KRAKEN\_DB\_URL - location of PostgreSQL database in URL form ie. `postgresql://<user>:<password>@<address>:<port>/<db-name>` e.g.: `postgresql://kraken:kk123@postgres:5432/kraken`
- KRAKEN\_LOGSTASH\_ADDR - location of ELK Logstash in _address:port_ form
- KRAKEN\_LOGSTASH\_PORT - port to ELK Logstash, should be the same as in `KRAKEN_LOGSTASH_ADDR`
- KRAKEN\_ELASTICSEARCH\_URL - location of ELK Elasticsearch in URL form, e.g.: `http://elastic:changeme@elasticsearch:9200`
- KRAKEN\_ELASTICSEARCH\_PORT - port to ELK Elasticsearch, should be the same as in `KRAKEN_ELASTICSEARCH_URL`
- KRAKEN\_SERVER\_ADDR - location of Kraken API server in _address:port_ form, it is used by other Kraken services
- KRAKEN\_SERVER\_PORT - port to Kraken API Server, should be the same as in `KRAKEN_SERVER_ADDR`
- KRAKEN\_PLANNER\_URL - location of Kraken Planner in URL form, it is used by other Kraken services, e.g.: `http://controller:7997/`
- KRAKEN\_STORAGE\_ADDR - location of Kraken Storage in _address:port_ form, e.g. `controller:2121`
- KRAKEN\_STORAGE\_DIR - location of directory for storing artifacts, used by Kraken Storage, e.g.: `/var/kraken_storage`

Most of these variables do not have to be altered. By default all
services are defined in one Docker Compose file and they communicate
with each other internally. Still, it is possible to divide these
services into a few groups and host them on separate machines. This
allows handling bigger load by Kraken. The most common approach for
dividing services is putting on separate machine PostgreSQL database
and ELK stack. Going further it is possible to setup Kraken API Server
on separate machine and even put several instances of them to handle
and load balance huge load of API requests.

## Kraken Start

So after downloading Docker Compose file and .env file, and doing some tweaks in these file if needed,
one can start Kraken services:

```console
$ docker-compose -f kraken-docker-compose-X.Y.yaml up -d
```

where:

- **-f** indicates Docker Compose file
- **up** spins up all Kraken services
- **-d** runs Docker Compose in detached mode i.e. in background

Check if all started correctly:

```console
docker-compose -f kraken-docker-compose-X.Y.yaml ps
```

If all is ok then now it is possible to check Kraken web page: [http://localhost:8080](http://localhost:8080)
