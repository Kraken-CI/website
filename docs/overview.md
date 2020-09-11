---
id: overview
slug: /
title: Overview
---

Kraken CI is a continuous integration and testing system.

Kraken CI takes as input build scripts and different kinds of testing and validations tools
and outputs build artifacts, test results, found regression and fixes, and other issues.

![Kraken Diagram](/img/kraken-diagram.png)

The whole work needs to be defined in workflow schema in Kraken CI that is arranged in stages and jobs.
Then Kraken CI is executing it for production branches (like main branch or release branches)
or for developer branches to validate the changes before merging them.

## Features

The main differentiators of Kraken CI are:

- massive testing support: hunderds thousands of tests per build
- focus on hardware testing were hardware is not stable and requires monitoring, rebooting, etc.

The other features can be grouped in 3 areas: planning, execution and reporting.

### Planning

- [workflow schema](schema) defines scope of jobs and tests with assigned configuration and
  environments
- [workflow schema](schema) is using
  [Python](https://www.python.org/)/[Starlark](https://github.com/bazelbuild/starlark) language
- [workflow schema](schema) can be defined directly in Kraken Web UI or
  fetched from project's repositor or from another repository
- configurations allow running the same set of tests but with different parameters
- environments indicate execution machines groups and operating systems that should be used for jobs
- groups can be defined:
   - statically by manual assignment
   - dynamically based on machine capabilities and classification expression defined in dynamic group
- jobs can be triggered by:
   - external triggers via webhooks (e.g.: from GitHub or GitLab)
   - on time interval
   - on given time in a day
   - on CRON rule

### Execution

- jobs are assigned to Kraken Agents for execution
- Agents are running on machines, they can be set up on:
  - bare metal machines
  - virtual machines
  - [Docker](https://www.docker.com/) environment
    like:
    [Compose](https://docs.docker.com/compose/),
    [Swarm](https://docs.docker.com/engine/swarm/)
    or [Kubernetes](https://kubernetes.io/)
  - [LXD](https://linuxcontainers.org/lxd/introduction/) environment
- Agents use executors to execute; there are executors that can run jobs:
  - locally on current host
  - in Docker container
  - in LXD container
- builds and tests execution is dynamically distributed to multiple machines with Kraken Agents according to indicated environments
- jobs can return 3 kinds of entities:
  - build artifacts - any files like packages, tarballs, RPMs, generated HTML reports
  - test results - they have several states (`not-run`, `passed`, `failed`, `error`, `disabled`, `unsupported`)
    and key-value pairs that storing e.g. performance results (e.g. FPS or MPS)
  - issues - returned by static analyzers, linters, etc
- tests results and issues are streamed in realtime to Kraken Server so if execution crashes the results are preserved

### Reporting

- test results and issues are monitored over time; this allows:
  - comparing to previous results and then reporting `regressions` and `fixes`
  - presenting `stability` of test cases so it is easy to spot what test should be improved or removed from testing scope
  - presenting charts of test case history so it can be observed how given test case behaved in the past
  - aging ie. showing how long given result didn't change (or the time of the last change of result of given test case)
- support for performance tests:
  - on test case can report multiple iterations with a list values
  - estimation of statistical values are like average, median, standard deviation, covariance and more
  - presenting on a chart changes of values of given test case over time with indicating median or average
- performance results are tracked over time and regressions are detected and reported
