---
id: architecture
title: Architecture
---

![Kraken Architecture](/arch-ppt/arch-overview.svg)

## Server
`Server` exposes Kraken ReST API

## UI
`UI` is an Angular application that can be served by NGINX. Unicorn can be used to maintain `Server` instances.

## Controller
`Controller` is made of 4 services:

- `Planner` - it triggers new flows based on indicated rule in given project's branch
- `Scheduler` - it assigns jobs to agents
- `Watchdog` - it checks runs and their jobs if they are in their time limits, it also monitors agents and their machines health

## Celery
`Celery` executes background tasks like processing results reported by
an agent. Any service in `Controller` or `Celery` tasks can enqueue
new `Celery` tasks. Current tasks:

- analyze_results_history
- notify_about_completed_run
- trigger_stages
- job_completed
- trigger_run
- trigger_flow

## ClickHouse & its Proxy
`ClickHouse` is a database that is used for storing logs from all
Kraken services and from all agents, `ClickHouse Proxy` is used to
collect logs, aggregate them and send in batches to `ClickHouse`
database.

## MinIO
`MinIO` is an object storage database. It is used in Kraken to store
artifact that are created during jobs execution, to store cache files
and to store Git repository bundles.

## Agent
Agent is a service that is run on a machine that is expected to
execute jobs. Agent can execute jobs directly on the system (locally),
or it can encapulate them in e.g. container. Currently there are
executors for:

- local
- Docker
- LXD


[Presentation about Kraken Architecture](pathname:///arch-ppt/index.html)
