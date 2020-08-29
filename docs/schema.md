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
                "executor_group": "all",
                "config": "default"
            }]
        }]
```
