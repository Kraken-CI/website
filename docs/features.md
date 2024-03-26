---
id: features
title: Features
---

The main differentiators of Kraken CI are:

- massive testing support: hunderds thousands of tests per build
- focus on hardware testing were hardware is not stable and requires monitoring, rebooting, etc.

The other features can be grouped in 4 areas: [planning](#planning), [execution](#execution),
[reporting](#reporting) and [administration](#administration).

## Planning

- [workflow schema](schema) defines scope of jobs and tests with assigned configuration and
  environments
- [workflow schema](schema) is using
  [Python](https://www.python.org/)/[Starlark](https://github.com/bazelbuild/starlark) language
- [workflow schema](schema) can be defined directly in Kraken Web UI or
  fetched from project's or from another Git repository
- configurations allow for running the same set of tests but with different parameters
- environments indicate execution agent groups and operating systems that should be used for jobs
- groups are defined by assigning execution agents to them
- jobs can be triggered by:
   - external triggers via [webhooks](/docs/guide-webhooks) (e.g.: from GitHub, GitLab, Gitea or Radicle)
   - by a commit to a repository
   - on time interval
   - on CRON rule
   - on given time in a day
- scope of jobs can be dynamically adjusted based on various criteria using Python/Starlark
- Flows and Runs can have custom labels
- [Job designer](/blog/job-designer-and-more-0-962) that makes preparing workflow schema much easier

## Execution

- jobs are assigned to Kraken Agents for execution by a scheduler using FIFO rule
- Agents are running on machines, they can be set up on:
  - bare metal machines
  - virtual machines
  - [Docker](https://www.docker.com/) environment
    like:
    [Compose](https://docs.docker.com/compose/),
    [Swarm](https://docs.docker.com/engine/swarm/)
    or [Kubernetes](https://kubernetes.io/)
  - [LXD](https://linuxcontainers.org/lxd/introduction/) environment
- Agents may run on several operating systems:
  - Linux
  - Windows
- Agents use executors to execute; there are executors that can run jobs:
  - locally on current host
  - in Docker container
  - in LXD container
- builds and tests execution is dynamically distributed to multiple
  machines with Kraken Agents according to indicated environments
- autoscaling in the cloud - Kraken server connected to [AWS EC2 or ECS,
  Azure VM](/blog/autoscaling-with-azure-and-aws-ecs) or [Kubernetes](/blog/autoscaling-with-kubernetes) environments can spawn new machines with Kraken Agents
  when there is not enough agents for jobs
- jobs can return 3 kinds of entities:
  - build artifacts - any files like packages, tarballs, RPMs,
    generated HTML reports
  - test results - they have several states (`not-run`, `passed`,
    `failed`, `error`, `disabled`, `unsupported`) and key-value pairs
    that storing e.g. performance results (e.g. FPS or MPS)
  - issues - returned by static analyzers, linters, etc
- tests results and issues are streamed in realtime to Kraken Server
  so if execution crashes the results are preserved
- monitoring of machines and agents: if they do not report alive for
  several minutes then they are disconnected from pool of available
  machines
- termination on timeout of stages, jobs and particular commands -
  this way execution farm is behaving predictably and is not e.g.:
  blocked by some broken build that hangs machine or by an infinite
  loop in tests
- automatically estimated timeouts for jobs based on passed execution
  so there is no never ending jobs occupying resources
- [custom tools](/docs/tools#custom-tools) that can be developed and hosted externally

## Reporting

- test results and issues in CI are monitored over time; this allows for:
  - comparing to previous results and then reporting `regressions` and
    `fixes`
  - presenting `stability` of test cases so it is easy to spot what
    test should be improved or removed from testing scope
  - presenting charts of test case history so it can be observed how
    given test case behaved in the past
  - aging ie. showing how long given result didn't change (or the time
    of the last change of result of given test case)
  - adding sticky comments to failing results
- test results and issues in DEV flows are compared to latest CI
  results so fixes and regressions in changes on a given developer
  branch are spotted before a merge to the production branch
- support for performance tests:
  - on test case can report multiple iterations with a list values
  - estimation of statistical values are like average, median,
    standard deviation, covariance and more
  - presenting on a chart changes of values of given test case over
    time with indicating median or average
- performance results are tracked over time and regressions are
  detected and reported
- [commenting](/docs/test-results-basics#comments) test results
- notifications using:
  - [Email](/docs/schema#email)
  - [Slack](/docs/schema#slack)
  - [Discord](/docs/schema#discord)
  - [GitHub](/docs/schema#github)

## Administration

- installing:
  - using [Docker Compose](/docs/install-docker-compose)
  - to [Kubernetes](/docs/install-helm)
- [users management](/docs/users) with global and per-project [roles](/docs/users#user-roles)
- authentication with:
  - [LDAP](/docs/users#ldap)
  - [OpenID Connect and OAuth](/docs/users#openid-connect-and-oauth)
- [dark mode](/blog/dark-mode-in-0-945)
