---
id: schema
title: Workflow Schema
---

A branch contains one or several stages. Stages can be independent and
run in parallel or chained and together can for a tree or a set of
trees (forest). Stage have a schema that defines what should be
done. Schema generally defines jobs for execution, execution
environment, triggers that start the execution of whole schema,
optional parameters and execution configuration.

Full schema syntax is defined in [schema reference](schema-ref).

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
                "system": "centos-7",
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
parameters defined in all stages in given branch. This allows
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
        ...
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

## Configs

Not implemented yet.

## Flow Label

This field allows setting a custom label format for flows. It is
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

This field allows setting a custom label format for runs. It is
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

## Step in Job

Common step fields:

- `tool`
- `cwd`
- `timeout`
- `attempts`
- `sleep_time_after_attempt`

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

Fields:

- `cmd`
- `timeout`
- `user` - by default kraken `user` is used, this field allows for changing user e.g. to `root`

Example:

```python
   "steps": [{
       "tool": "shell",
       "cmd": "echo 'Hello World'"
   }]
```

### Git

Fields:

- `checkout`
- `destination`
- `ssh-key`
- `access-token`

Example:

```python
   "steps": [{
       "tool": "git",
       "checkout": "https://github.com/Kraken-CI/kraken.git",
       "branch": "master"
   }]
```

### Artifacts

Fields:

- `action`
- `public`
- `source`
- `destination`

### PyLint

Fields:

- `rcfile`
- `modules_or_packages`

### PyTest

Fields:

- `params`


### NgLint

No specific fields.

### Cloc

Fields:

- `not-match-f`
- `exclude-dir`

### RndTest

Fields:

- `count`

## Environment in Job

TODO

## Notification

TODO

## Timeout

TODO
