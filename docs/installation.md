---
id: installation
title: Installation
sidebar_label: Installation
---

The easiest method for installing Kraken is based on [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

## Pre-requisites

There are several things that are required to run Kraken. In short:

- Linux-based operating system
- Docker Engine and Docker Compose

The operating system must be **Linux based**. Kraken was tested on **Ubuntu 20.04**
but other distributions should be ok.

The next thing is Docker. **Docker Compose** is used to spawn all the Kraken services.
These services are described in [Architecture chapter](architecture.md).

## Kraken Download

Kraken installation artifacts can be downloaded from [Kraken GitHub releases page](https://github.com/Kraken-CI/kraken/releases).
There are:

- **kraken-docker-compose-X.Y.yaml** - a services configuration file for Docker Compose
- **kraken-X.Y.env** - an example configuration for Kraken services that is used by Docker Compose file

Docker Compose file is using pre-built Kraken container images. On first run, it will download and install Kraken image and all required dependencies.

Download these 2 files to your local machine that will host Kraken services. Put them in the same folder.

## Kraken Configuration

**kraken-X.Y.env** file contains Kraken basic configuration that is required to start Kraken services.
Default content of this file looks as follows:

![File](https://raw.githubusercontent.com/Kraken-CI/kraken/master/dot.env)

```
POSTGRES_USER=kraken
POSTGRES_PASSWORD=kk123
POSTGRES_DB=kraken

MINIO_ACCESS_KEY=UFSEHRCFU4ACUEWHCHWU
MINIO_SECRET_KEY=HICSHuhIIUhiuhMIUHIUhGFfUHugy6fGJuyyfiGY

KRAKEN_REDIS_ADDR=redis
KRAKEN_DB_URL=postgresql://kraken:kk123@postgres:5432/kraken
KRAKEN_CLICKHOUSE_PORT=9001
KRAKEN_CLICKHOUSE_ADDR=clickhouse-proxy:9001
KRAKEN_CLICKHOUSE_URL=http://clickhouse:8123/
KRAKEN_SERVER_PORT=6000
KRAKEN_SERVER_ADDR=server:6000
KRAKEN_PLANNER_URL=http://controller:7997/
KRAKEN_UI_PUBLIC_PORT=8080
KRAKEN_MINIO_PORT=9999
KRAKEN_MINIO_ADDR=minio:9999
```

### Configuration of ClickHouse

[ClickHouse](https://clickhouse.tech/) is used to store logs from all
Kraken services and from jobs execution.

These parameters are used when [ClickHouse](https://clickhouse.tech/)
is run internally in Docker together with Kraken services from the
same Docker Compose file. It is possible to set up ClickHouse
externally to Kraken services on another machine.

No specific configuration.

### Configuration of Minio

[MinIO](https://min.io/) is object storage database with API
compatible with AWS S3.  It is used in Kraken to store build
artifacts, cache files and Git repositories bundles.

These parameters are used when [MinIO](https://min.io/) is run
internally in Docker together with Kraken services from the same
Docker Compose file. It is possible to set up MinIO externally to
Kraken services on another machine.

| Parameter                   | Description / Default value                                                                            |
|-----------------------------|--------------------------------------------------------------------------------------------------------|
| `MINIO_ACCESS_KEY`          | Access key to MinIO<br/>Default: `UFSEHRCFU4ACUEWHCHWU`                                                |
| `MINIO_SECRET_KEY`          | Secret key to MinIO<br/>Default: `HICSHuhIIUhiuhMIUHIUhGFfUHugy6fGJuyyfiGY`                            |

### Configuration of PostgreSQL database

[PostgreSQL](https://www.postgresql.org/) is used to store all
relational data of Kraken, mainly related to jobs planning, execution
and reporting.

These parameters are used
when [PostgreSQL](https://www.postgresql.org/) is run internally in
Docker together with Kraken services from the same Docker Compose
file. It is possible to set up PostgreSQL externally to Kraken
services on another machine.

| Parameter                   | Description / Default value                                                                            |
|-----------------------------|--------------------------------------------------------------------------------------------------------|
| `POSTGRES_USER`             | User name used to access PostgreSQL database<br/>Default: `kraken`                                     |
| `POSTGRES_PASSWORD`         | Password used to access PostgreSQL database<br/>Default: `kk123`                                       |
| `POSTGRES_DB`               | Name of the Kraken's PostgreSQL database<br/>Default: `kraken`                                         |

### Configuration of Kraken services

| Parameter                   | Description / Default value                                                                            |
|-----------------------------|--------------------------------------------------------------------------------------------------------|
| `KRAKEN_REDIS_ADDR`         | Location of Redis in _address:port_ form<br/>Default: `redis`                                          |
| `KRAKEN_DB_URL`             | URL of the Kraken's PostgreSQL database<br/>Default: `postgresql://kraken:kk123@postgres:5432/kraken`  |
| `KRAKEN_CLICKHOUSE_PORT`    | Port of ClickHouse Proxy for collection logs, should be the same as in `KRAKEN_CLICKHOUSE_ADDR` <br/>Default: `9001`     |
| `KRAKEN_CLICKHOUSE_ADDR`    | Location of ClickHouse Proxy <br/>Default: `clickhouse-proxy:9001`                                     |
| `KRAKEN_CLICKHOUSE_URL`     | URL to ClickHouse, it is used to query ClickHouse database <br/>Default: `http://clickhouse:8123/`     |
| `KRAKEN_SERVER_PORT`        | Port of Kraken API Server, should be the same as in `KRAKEN_SERVER_ADDR`<br/>Default: `6000`           |
| `KRAKEN_SERVER_ADDR`        | Location of Kraken API server in _address:port_ form<br/>Default: `server:6000`                        |
| `KRAKEN_PLANNER_URL`        | URL of Kraken Planner<br/>Default: `http://controller:7997/`                                           |
| `KRAKEN_UI_PUBLIC_PORT`     | Public port of Kraken's web UI that is exposed to users. <br/>Default: `8080`                          |
| `KRAKEN_MINIO_PORT `        | Port of MinIO, should be the same as in `KRAKEN_MINIO_ADDR`. <br/>Default: `9999`                      |
| `KRAKEN_MINIO_ADDR`         | Location of MinIO in _address:port_ form<br/>Default: `minio:9999`                                     |

Most of these variables do not have to be altered. By default all
services are defined in one Docker Compose file and they communicate
with each other internally. Still, it is possible to divide these
services into a few groups and host them on separate machines. This
allows for handling bigger load by Kraken. The most common approach
for dividing services is putting PostgreSQL database, ClickHouse
database and MinIO on separate machines. Going further it is possible
to setup Kraken API Server on a separate machine and even put several
instances of them to handle and load-balance huge load of API
requests.

## Kraken Start

After downloading Docker Compose and .env files and tweaking them if needed,
Kraken services can be started by:

```console
docker-compose --env-file kraken-X.Y.env -f kraken-docker-compose-X.Y.yaml up -d
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

There are two built-in users: `demo`/`demo` and `admin`/`admin`.

## Kraken Stop

Kraken services can be stopped with a command:

```console
docker-compose -f kraken-docker-compose-X.Y.yaml down
```

In case the services can't be gracefully stopped or need to be shut down immediately,
they can be killed with a command:

```console
docker-compose -f kraken-docker-compose-X.Y.yaml kill
```
## Next Steps

Now there are s everal steps that can be done:

- learn more about Kraken concepts: read [Entities & Terminology](entities) and [Architecture](architecture) chapters
- start using Kraken by creating new project, branches, etc: see [Usage chapters](proj-branches)
- install new agents: visit [Agents](agents) chapter in Administraction category
