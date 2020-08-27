---
id: architecture
title: Architecture
---


![Kraken Architecture](https://i.imgur.com/S11Lyfj.png)

## Server
`Server` exposes Kraken ReST API

## UI
`UI` is an Angular application that can be served by NGINX. Unicorn can be used to maintain `Server` instances.

## Controller
`Controller` is made of 4 services:

- `Planner` - it triggers new flows based on indicated rule in given project's branch
- `Scheduler` - it assigns jobs to executors
- `Watchdog` - it checks runs and their jobs if they are in their time limits, it also monitors executors health
- `Storage` - it stores and serves artifacts which can be uploaded or downloaded by agents

## Celery
`Celery` executes background tasks like processing results reported by an agent. Any service in `Controller`
or `Celery` tasks can enqueue new `Celery` tasks. Current tasks:

- analyze_results_history
- notify_about_completed_run
- trigger_stages
- job_completed
- trigger_run
- trigger_flow

## ELK
This is `ELK` stack ie. `Elasticsearch`, `Logstash` and `Kibana`. `Logstash` is used for collecting logs from all agents,
`Elasticsearch` is used for storing these logs and exposing them to the `Server` for example for presentin in `UI`.
`Kibana` is an internal dashboard to `Elasticsearch`.

## Agent
Agent is a service that is run on a machine that is expected to execute jobs. Agent can execute jobs directly on the system,
or it can encapulate them in e.g. container. Currently there are executors for:

- direct/bare
- Docker
- LXD


[Presentation about Kraken Architecture](/arch-ppt/index.html)
