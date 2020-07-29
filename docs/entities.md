---
id: entities
title: Entities & Terminology
---

### Project
`Project` separates things from other `projects`, it contains multiple `branches`.

### Branch
`Branch` can map to source code repository branch. In a `branch` there are defined `stages`.
Each `stage` has its own workflow schema. An execution of stages form a flow. `Branch` contains two kinds of `flows` lists:
- `CI flows` - they are triggered by e.g. commits to production source repository branch eg. to master
- `dev flows` - they are triggered by e.g. commits to developer branches

### Stage
`Stage` defines workflow schema for a `branch`. There can be several `stages` in a `branch`. `Stage`'s workflow schema defines set of `jobs`
that are executed in parallel. There can be defined many `jobs` in a `stage`. `Stage` can have `parameters` that are passed to `jobs`.
`Stage` can also have one or more `configurations`. Each `job` is executed in indicated one or more `environments`.
`Environment` is defined by `operating system`, `executors group` and `configuration`.

`Stage` is defined in Python-like syntax. Example `stage` workflow schema definition:

```python
def stage(ctx):
    return {
        "parent": "Unit Tests",
        "triggers": {
            "parent": True,
            "cron": "1 * * * *",
            "interval": "10m",
            "repository": True,
            "webhook": True
        },
        "parameters": [],
        "configs": [{
            "name": "c1",
            "p1": "1",
            "p2": "3"
        }, {
            "name": "c2",
            "n3": "33",
            "t2": "asdf"
        }],
        "jobs": [{
            "name": "make dist",
            "steps": [{
                "tool": "git",
                "checkout": "https://github.com/frankhjung/python-helloworld.git",
                "branch": "master"
            }, {
                "tool": "pytest",
                "params": "tests/testhelloworld.py",
                "cwd": "python-helloworld"
            }],
            "environments": [{
                "system": "ubuntu-18.04",
                "executor_group": "all",
                "config": "c1"
            }]
        }],
        "notification": {
            "changes": {
                "slack": {"channel": "kk-results"},
                "email": "godfryd@gmail.com"
            }
        }
    }
```

### Job in Stage
`Job` defines what should be done. There can be many jobs in one stage. They are run in indicated, one or more, environments.
One `job` have multiple `steps`.

### Step in Stage
`Step` defines an operation. It can be:
- execution of indicated shell command
- checking out sources from indicated repository
- running tests by indicated test tool
- running static checks by indicated linter
- and more


### Flow
`Flow` is an execution instance in a `branch`. It contains one or more `runs` of `stages` ie. execution instances of `stages`.

### Run
`Run` is an execution instance of given `stage` in a given `flow`. `Run` of first `stage` in a `branch`
is triggered with triggering its `flow`. The following `run` of subsequent `stage` in a `branch` are triggered
by a prior `run`. `Runs` can also be triggered manually ie. their start require manual confirmation.

### Job in Run
This is an execution instance of a `job` defined in workflow schema in a `stage`.
It has a execution statues. It can have multiple test results or issues.

### Step in Run
This is an execution instance of a `step` defined in workflow schema in a `stage`.

![Kraken Entities](https://i.imgur.com/QzUGsUu.png)
