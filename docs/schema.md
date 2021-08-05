---
id: schema
title: Workflow Schema
---

This chapter presents syntax of workflow schema defined in stages of a
branch.

Full schema syntax referenced is available in [schema reference](schema-ref).

## Schema Elements

There are defined several things in the schema:

- `parent` stage
- `triggers`
- `parameters`
- `configs`
- `jobs`
- `notification`
- `timeout`

Example:

```json
"parent": "root",
"triggers": {
    "parent": True
},
"parameters": [],
"configs": [],
"jobs": [{
    "name": "hello",
    "steps": [{
        "tool": "shell",
        "cmd": "echo 'Hello World'"
    }],
    "environments": [{
        "system": "any",
        "agents_group": "all",
        "config": "default"
    }]
}]
```

## Parent

Parent allows for defining a chain of dependencies between subsequent
stages. Current stage will be started only when parent stage has been
finished.  The value of `parent` field is a name of a stage. If it is
set to special value `root` than it means that the stage does not
depend on anything and can be started as the first stage or one of the
first stages, just after triggering a new flow in a branch.

## Triggers

Triggers indicate what events may start a stage and create its new
run.  There are several events: `parent`, `interval`, `date`, `cron`,
`repo` and `manual`.

Whole flow and its root stages can be also triggered manually in web UI or by a
webhook. More about that in [Webhooks chapter](webhooks).

### parent

A stage is triggered by completion of a parent stage. It is defined as `"parent": True`.

Example:

```json
"triggers": {
   "parent": True
}
```

### interval

Given stage is triggered specified amount of time after competion of
previous run of this stage.  The duration can be specified in a human
readable way e.g. `1d` what means one day or `3h 30m` what means 3
hours and 30 minutes.

Example, start a new stage run every 10 minutes:

```json
"triggers": {
   "interval": "10m"
}
```

### date

Given stage is triggered once, on specified date. The date can be
provided in human readable way, e.g.: `2012-01-19 17:21:00` or `Sat
Sep 17 23:26:08 CEST 2016`.

Example, start a new stage run once on indicate date:

```json
"triggers": {
   "date": "2012-01-19 17:21:00"
}
```

### cron

A stage is triggered on specified CRON rule e.g. `* * 10 * *`. There
are always 5 items. Each item is separated by space. The items meaning
are as follows: minutes, hours, days, months, dow (day of week).  The
possible values for each item can be found on
[Advanced Python Scheduler web page](https://apscheduler.readthedocs.io/en/stable/modules/triggers/cron.html?highlight=cron#introduction)

Example, start a new stage run always half past nine AM:

```json
"triggers": {
   "cron": "30 9 * * *"
}
```

### repo

Example, start a new stage run when there are new commits in master
branch of Kraken's repository; check for new commits every 60 minutes.

```json
"triggers": {
    "repo": {
        "url": "https://github.com/Kraken-CI/kraken/",
        "branch": "master",
        "interval": "60m"
    }
}
```

There is another way of trigger a run based on changes to a repository.
Check [webhooks](webhooks) chapter for details.


### manual

Stage may be configured in a way that it is not automatically started,
even if its parent has completed. This can be achieved by `manual`
trigger. When it is set to `True` then in a web UI its run is shown in
blue and awaits user confirmation to start.

Example:

```json
"triggers": {
    "manual": True
}
```


## Parameters

When a flow is started manually it is possible to provide values for
parameters defined in all stages in given branch. This allows for
customizing behaviour of a stage and its jobs.

There can be defined multiple parameters in one stage. Each parameters
has the following fields:

- `name` - a string that identifies a parameter
- `type` - a type of parameter, for now it can be only `string`
- `default` - a default value for a parameter, it is required
- `description` - a description of a parameter, it used when a
  parameter is presented in web UI

Default value for a parameter is required. It is used when a flow is
started automatically. In that situation it is not possible to provide
values for the parameters manually.

Example:

```json
"parameters": [{
    "name": "COUNT",
    "type": "string",
    "default": "10",
    "description": "Number of tests to generate"
}]
```

Then, in a job definition a parameter can be used by enclosing its
name in `#{...}`, e.g.: `#{COUNT}`.

Using parameter `COUNT` example:

```json
"jobs": [{
    "name": "random tests",
    "steps": [{
        "tool": "rndtest",
        "count": "#{COUNT}"
    }],
}]
```

or

```json
"jobs": [{
    "name": "random tests",
    "steps": [{
        "tool": "shell",
        "cmd": "echo 'the count is #{COUNT}'"
    }],
    ...
}]
```

More about interpolating variables in string can be found
in [Schema Variables chapter](schema-vars).

## Configs

Not implemented yet.

## Flow Label

This field allows for setting a custom label format for flows. It is
displayed instead of flow database ID which is displayed by default.

Example 1:

```python
"flow_label": "demo-#{KK_FLOW_SEQ}",
```

Here a value of ``KK_FLOW_SEQ`` sequence is used. It mean that each
new flow will get its incremented numer, e.g. ``demo-2``. This
sequence is shared between CI and DEV flows so the label is uniqe for
both types of flows.

Example 2:

```python
"flow_label": "bld-#{KK_CI_DEV_FLOW_SEQ}",
```

In this case a ``KK_CI_DEV_FLOW_SEQ`` sequence is used. It means that
the sequence is incremented separately for CI and for DEV flows.

More about sequences in [Schema Variables](schema-vars).

## Run Label

This field allows for setting a custom label format for runs. It is
displayed instead of run database ID which is displayed by default.

Example 1:

```python
"run_label": "run.#{KK_CI_DEV_RUN_SEQ}",
```

In this case a ``KK_CI_DEV_RUN_SEQ`` sequence is used. It means that
the sequence is incremented separately for CI and for DEV flows for
that run, e.g.: ``run.42``.

More about sequences in [Schema Variables](schema-vars).

## Jobs

`Jobs` describe what should be done in a `stage`. A `stage` can define
multiple `jobs` and they all are run in parallel.

There are several setting fields in the job:

### Name

A name of the job.

Example:

```python
"jobs": [{
    "name": "build",
    ...
}]
```

### Timeout

An initial timeout of the job. It is expressed in seconds.

If there are more than 10 historical succeded jobs then timeout is
estimated automatically.

Example:

```python
"jobs": [{
    "timeout": 1200,
    ...
}]
```

Timeout is set to 1200 seconds, i.e. 20 minutes.

## Steps in Job

The steps' job field defines what an agent should executed. Each step has indicated tool that is directly executing it. Steps are executed in the same order as they are defined.

Common step fields:

- `tool` - a tool name that is executing the step; this is required
- `cwd` - a current working directory where the step is executed; default is `'.'`
- `timeout` - a timeout in seconds that limits time of step execution; it is guareded by an agent; if it is exceeded then the step is arbitrarly terminated; it is optional - default value is 60 seconds
- `attempts` - a number of times the step is retried if if it returns error; default is 1
- `sleep_time_after_attempt` - a sleep time between subsequent execution attempts; default is 0

Example:

```python
"jobs": [{
    "steps": [{
        "tool": "shell",
        ...
    }]
}]
```


## Built-in Step Tools

### Shell

`shell` is a tool that executes provided command in a shell.

Fields:

- `cmd` - a command to execute
- `user` - this field allows for changing user e.g. to `root`; by default kraken `user` is used
- `env` - a dictionary with environment variables and their values
- `background` - if set to True then a step is run in background; the
  background process will be terminated at the end of whole job;
  default value is False

Examples:

#### Shell: Hello World

```python
"steps": [{
    "tool": "shell",
    "cmd": "echo 'Hello World'"
}]
```

Just say 'Hello World'.

```python
"steps": [{
    "tool": "shell",
    "cmd": "./run-build.sh",
    "cwd": "/build",
    "user": "root",
    "env": {
        "ARCH": "arm64"
        "JOBS": "8"
    },
    "timeout": 1200,
    "attempts": 3,
    "sleep_time_after_attempt": 10
}]
```

Run a build script in `/build` folder as `root` user. Pass two
environment variables: `ARCH` and `JOBS`. The step should fit in 1200
seconds ie. 20 minutes. If the commands returns non zero exit code
then it is repeated up to 3 times. There is a 10 seconds sleep time
period between attempts.

```python
"steps": [{
    "tool": "shell",
    "cmd": "./run-service.sh",
    "background": True
}, {
    "tool": "shell",
    "cmd": "ps ax"
}]
```

`run-service.sh` script is run in background and then the next step is
executed. It should show a list of all processes - `./run-service.sh`
should be on the list.

More examples can be found at https://github.com/Kraken-CI/workflow-examples/tree/main/shell.

### Git

`git` is a tool that allows for checking out a Git repository. It clones a
repository indicated by an URK in `checkout` field and puts it in
`destination` folder. It also stores Git repository bundle in Kraken
global storage for quiecker subsequent retrieval. If URL is using SSH
protocol and `ssh-key` field is set then it is used by ssh-agent for
passing a key during Git cloning. If `access-token` is provided than
it is embedded to URL in git clone instruction (see
[GitLab use case](https://docs.gitlab.com/ee/user/project/deploy_tokens/#git-clone-a-repository)).

Fields:

- `checkout` - an URL to the repository
- `branch` - a branch to checkout, `master` is default
- `destination` - a destination folder for the repository; it is optional
- `ssh-key` - a name of a secret that holds SSH username and key for ssh-agent
- `access-token` - an access token for GitLab use case

Example:

```python
"steps": [{
    "tool": "git",
    "checkout": "https://github.com/Kraken-CI/kraken.git",
    "branch": "master"
}]
```

More examples can be found at TODO.

### Artifacts

`artifacts` is a tool that allows for storing and retrieving artifacts in Kraken
global [storage](storage). They can be non public so they are only
available internally in Kraken to other stages but only in the same
flow. If they are public then they are also presented in web UI and
can be downloaded by users.

Fields:

- `action` - an action that artifacts tool should execute: either
  `download` or `upload`. `upload` is default action
- `public` - determines if artifacts should be public and available to
  users in web UI (`True`) or if they should be only accessible
  internally to other stages but only in the same flow (`False`);
  default value is `False`
- `source` - a path or list of paths that should be archived or
  retreived. A path can indicate a folder or a file; a path, in case
  of upload action, can contain globbing signs `*` or `**`; a path can
  be relative or absolute
- `destination` - a path were the artifact(s) should be stored; in
  case of download action, if the destination folder does not exist
  then it is created; by default it is `'.'`
- `report_entry` - a destination path of one of uploaded HTML files
  that will be used as a report entry in Kraken Web UI, on a flow
  page and a run page

Example:

```python
"steps": [{
    "tool": "artifacts",
    "source": "a.txt"
}]
```

Default action is upload so here an `a.txt` file will be stored in
global storage in root folder which is default.

```python
"steps": [{
    "tool": "artifacts",
    "action": "download",
    "source": "a.txt",
    "destination": 'a/b/c"
}]
```

Here an `a.txt` file is downloaded from global storage. It is saved to
`a/b/c` folder. If it does not exist then it is created first.

```python
"steps": [{
    "tool": "artifacts",
    "source": ["index.html", "log.html"],
    "report_entry": "index.html"
}]
```

In this example a generated report is uploaded to Kraken's
storage. The report consists of two files: index.html and log.html.
`report_entry` fields indicates which files should be used as a report
entry. The report is available on a flow page and on a run page under
`Reports` tab.

More examples can be found at https://github.com/Kraken-CI/workflow-examples/tree/main/artifacts
and https://github.com/Kraken-CI/workflow-examples/tree/main/reports.

### Cache

`cache` is a tool that allows for caching files. It quite often
happens that during a build there are some dependencies that are
downloaded from an external source over a network. Sometime there is
lots of content to download or the network link is quite slow so in
effect downloading this content may take significant amount of time.
To speed this process it is possible to cache these files after
downloading them. In the following build these files are first
retrieved from cache and then they are updated only if needed.

So cache tool exposes two actions: `save` and `restore`. Cached files
are stored under indicted key in Kraken global storage. This key can
be statically set so the content is always the same. The key can be
also set dynamically based on some variables e.g. repository branch or
CI/DEV flow kind.

Fields:

- `action` - an action that the tool should perform; it should be either `store` or `restore`
- `key` - a key under which files are stored in or restored from cache
- `keys` - a list of key under which files are restored from cache
- `paths` - source paths used in `store` action
- `expiry` - not implemented yet

Example:

```python
"steps": [{
    "tool": "cache",
    "action": "save",
    "key": "one-key",
    "paths": [
         "abc"
    ]
}]
```

Store all files from `abc` folder in cache under `one-key` key.

```python
"steps": [{
    "tool": "cache",
    "action": "restore",
    "keys": ["one-key"]
}]
```

Restore all files under `one-key` key in cache to `abc` folder (the
destination folder was remembered during `store` action).


More examples can be found at https://github.com/Kraken-CI/workflow-examples/tree/main/cache.

### Pylint

`pylint` is a tool that allows for static analysis of Python source
code. It wraps around [Pylint](https://www.pylint.org/).

Fields:

- `pylint_exe` - an alternative path or command to pylint, by default this is `pylint`
- `rcfile` - a path to pylint rcfile
- `modules_or_packages` - a path or paths to Python modules or packages that should be checked

Example:

```python
"steps": [{
    "tool": "pylint",
    "rcfile": "pylint.rc",
    "modules_or_packages": "agent/kraken/agent"
}]
```

Run `pylint` on a package located in `agent/kraken/agent` folder using
rcfile `pylint.rc` from current working directory.

```python
"steps": [{
    "tool": "pylint",
    "pylint_exe": "poetry run pylint",
    "rcfile": "../pylint.rc",
    "modules_or_packages": "kraken/server",
    "cwd": "kraken/server"
}]
```

Run `pylint` but using specific command ie. `poetry run pylint` on a
package located in `kraken/server` folder using rcfile from
`../pylint.rc` from indicated working directory `kraken/server`.

### Pytest

`pytest` is a tool that allows for running Python tests. It wraps
around [pytest](https://pytest.org/). It first collects list of all
available test cases based on passed parameters, then executes them
one by one, reporting results after each test case.

Fields:

- `pytest_exe` -an alternative path or command to pytest, by default this is `pytest-3`
- `params` - parameters passed directly to pytest executable
- `pythonpath` - extra paths that are used by Python to look for modules/packages that it wants to load

Example:

```python
"steps": [{
    "tool": "pytest",
    "cwd": "kraken/agent"
}]
```

Run pytest in `kraken/agent` folder.

```python
"steps": [{
    "tool": "pytest",
    "pytest_exe": "poetry run pytest",
    "params": "-vv -m 'not db'",
    "cwd": "kraken/server"
}]
```

Run pytest in `kraken/agent` folder, using specific command `poetry
run pytest` and passing to it `-vv -m 'not db'` parameters.

### Junit Collect

`junit_collect` is a tool that allows for collecting test results
stored in indicated files in the XML [JUnit](https://junit.org/)
format.

Fields:

- `file_glob` - a glob pattern for searching test result files

Example:

```python
"steps": [{
    "tool": "junit_collect",
    "file_glob": "**/test-results/test/*.xml"
}]
```

More examples can be found at https://github.com/Kraken-CI/workflow-examples/tree/main/real-projects/lucene-solr.

### Go Test

`gotest` is a tool that allows for
running [Go language](https://golang.org/) tests.

Fields:

- `go_exe` - an alternative path or command to `go`
- `params` - parameters passed directly to `go test`

Example:

```python
"steps": [{
    "tool": "gotest",
    "cwd": "hugo",
    "params": "-p 1 ./..."
}]
```

Run Go tests in `hugo` folder with special parameters `-p 1 ./...`.

More examples can be found at https://github.com/Kraken-CI/workflow-examples/tree/main/real-projects/hugo.

### NgLint

`nglint` is a tool that allows for
running [Angular](https://angular.io/) `ng lint`, that is performing
static analysis of TypeScript in Angular projects.

It does not have specific fields.

Example:

```python
"steps": [{
    "tool": "nglint",
    "cwd": "kraken/ui"
}]
```

Run `ng lint` in `kraken/ui` where is Angular project located.

### Cloc

`cloc` is a tool that allows for running counting lines of code. It
wraps around [cloc](http://github.com/AlDanial/cloc) that can analyse
source code in multiple programming languages.

Fields:

- `not-match-f` - the value is passed to `--not-match-f=<regex>` that
  allows for filtering out indicated files
- `exclude-dir` - the value is passed to `--exclude-dir=<D1>[,D2,]` that
  allows for excluding indicated list of directories

Example:

```python
"steps": [{
    "tool": "cloc",
    "not-match-f": "(package-lock.json|pylint.rc)",
    "exclude-dir": "docker-elk",
    "cwd": "kraken"
}]
```

Run `cloc` in `kraken` folder. Exclude `docker-elk` folder and filter
out indicated two files.

### RndTest

`rndtest` is a tool that allows for generating random test case
results. It is used in Kraken to test its testing and reporting
capabilities.

Fields:

- `count` - a number of expected test cases

### Custom Tools

Beside Kraken built-in tools, it is possible to use external, your
own, custom tools. They need to be written as python library with
specific metadata and they need to fulfil expected protocol of
execution.

More about custom tools in [Tools](tools#custom-tools) chapter.

## Environment in Job

`environment` define the surroundings of a `job` execution. Each `job`
has one or more `environment`s defined.

Environment has the following fields:

- `agents_group`
- `executor`
- `system`
- `config` - not implemented yet

There can be many job instances. For each environment and for each
system in environment there is an instance of the job.

### Agents Groups

This is a name of agents group that should be used by scheduler for
agent selection.  Selected agent from this group will be assigned to
given job and will be used to execute the job. There is a special
built-in group,`'all'`, that gathers all agents.

### Executors

This is an executor type that agent will use to execute a job. It
can be one of:

- `'local'` - an egent is executing a job directly on current host
  system where agent is also running
- `'docker'` - an agent is executing a job inside of dedicated, just
  spawned Docker container; after the execution the container is
  killed and removed
- `'lxd'` - an agent is executing a job inside of dedicated, just
  spawned LXD container; after the execution the container is
  stopped and removed

Default is `'local'`.

### Systems

This field can hold an operating system name or list of such names
that are used for job execution. If this is a list then the number of
job instances is multiplied by numer of systems - each instance has
its system.

There is a special system name, `'any'`, that in case of `'local'`
executor ignores system selection by jobs scheduler. In other executor
types `'any'` has no special meaning.

The system name has different meaning depending on executor type.

In case of `'local'` executor the system name must match with the system
reported by agent wher it is running.

In case of `'docker'` executor the system name is a name of Docker
image from [Docker Hub](https://hub.docker.com/) or other Docker
registry. Example name: `'ubuntu:20.04'`. There are also Docker images
specially crafted for Kraken. The are hosted on Docker Hub:
https://hub.docker.com/u/krakenci. Example: `'krakenci/ubuntu:20.04'`.
More about Docker executor in [Docker Executor chapter](docker-executor).

In case of `'lxd'` executor the system name is a name of LXD image
from https://images.linuxcontainers.org/. Example name:
`'ubuntu/focal/amd64'`. To get list of all available LXD container
names run `lxc image list images:` command. More about LXD executor
in [LXD Executor chapter](lxd-executor).

Examples:

```python
"environments": [{
    "agents_group": "all",
    "system": "any",
    "config": "default"
}]
```

Pick any agent and use its local host system for job execution.

```python
"environments": [{
    "agents_group": "fast",
    "system": "ubuntu-18.04",
    "config": "default"
}]
```

Pick an agent from `'fast'` group that runs on `'ubuntu-18.04'`
operating system.


```python
"environments": [{
    "agents_group": "all",
    "executor": "docker",
    "system": ["maven:3.6.3-jdk-11",
               "fedora:32",
               "centos:8",
               "debian:buster",
               "debian:bullseye",
               "ubuntu:18.04",
               "ubuntu:20.04",
               "krakenci/bld-kraken",
               "krakenci/ubuntu:20.04",
               "krakenci/python:3.8",
               "krakenci/maven:3.6.3-jdk-11"],
    "config": "default"
}]
```

Create multiple jobs for each indicated system. For each job pick an
agent from `'all'` group and execute the job in spawned Docker
container with indicated system image.

```python
"environments": [{
    "agents_group": "lxd",
    "executor": "lxd",
    "system": "centos/8/amd64",
    "config": "default"
}]
```

Pick an agent form `'lxd'` group and execute the job in spawned LXD
container with `'centos/8/amd64'` system image.

More examples can be found at:
- https://github.com/Kraken-CI/workflow-examples/tree/main/systems-many-docker
- https://github.com/Kraken-CI/workflow-examples/tree/main/systems-many-lxd
- https://github.com/Kraken-CI/workflow-examples/tree/main/systems-mixed

More about agents, agent's groups and agent's management can be found in [Agents chapter](agents).

## Notification

`notification` allows for configuring a notification means that are
used to pass an information about stage's run result. There are
several communication methods supported:

- `email`
- `slack`
- `github`

### Email

It sends notifications to indicated email address. This requires
setting global configuration of SMTP server. This can be found in
`Settings` menu at the top, in `Notifications` tab.

Example:

```python
"notification": {
    "email": "godfryd@gmail.com"
}
```

### Slack

It sends notifications to indicated channel on Slack. This requires
setting global configuration of an access token to Slack service. This
can be found in `Settings` menu at the top, in `Notifications` tab.

Example:

```python
"notification": {
    "slack": {"channel": "kk-results"}
}
```

### GitHub

It sends notifications of stages that were triggered by a GitHub pull
request. It sets results status on PR page on GitHub. This requires
setting a configuration on a project page in `Web Hooks` tab. There
should be enabled GitHub section and then copied the values or URL and
secret and pasted on GitHub project page, in Settings tab, Webhooks
subtab.

GitHub notification section requires setting one field, `credentials`.
The credentials are in form `<user>:<password>` e.g.: `john:1q2w3e4r`.
To make it safe credentials should be stored and taken from project's
secrets. More about secrets in [Secrets chapter](secrets). GitHub
credentials can be prepared on your account developer settings page in
GitHub (https://github.com/settings/tokens), in Personal access token
subtab.

More about GitHub integration can be found in [Webhooks chapter](webhooks).

Example:

```python
"notification": {
    "github": {"credentials": "#{KK_SECRET_SIMPLE_gh_status_creds}"}
}
```

It is also possible to enable all notification means together:

```python
"notification": {
    "slack": {"channel": "kk-results"},
    "email": "godfryd@gmail.com",
    "github": {"credentials": "#{KK_SECRET_SIMPLE_gh_status_creds}"}
}
```
