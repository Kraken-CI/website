---
id: schema
title: Schema
---

## Overview

Stage have a schema that defines what should be done. Schema generally defines jobs for execution,
execution environment, triggers that start the execution of whole schema, optional parameters
and execution configuration.

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

### Step

Common step fields:

- `tool`
- `cwd`
- `timeout`
- `attempts`
- `sleep_time_after_attempt`


### Built-in Step Tools

#### Shell

Fields:

- `cmd`
- `timeout`
- `user` - by default kraken `user` is used, this field allows changing user e.g. to `root`

Example:

```python
   "steps": [{
       "tool": "shell",
       "cmd": "echo 'Hello World'"
   }]
```

#### Git

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

#### Artifacts

Fields:

- `action`
- `public`
- `source`
- `destination`

#### PyLint

Fields:

- `rcfile`
- `modules_or_packages`

#### PyTest

Fields:

- `params`


#### NgLint

No specific fields.

#### Cloc

Fields:

- `not-match-f`
- `exclude-dir`

#### RndTest

Fields:

- `count`
