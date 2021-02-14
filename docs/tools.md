---
id: tools
title: Tools
---

## Tools Overview

Tools are used to execute steps in a job. Each step indicates what
tools should be used to its execution. It can be a `shell` to execute
commands, other programs, or a `git` tool for cloning Git
repository. A step can have several fields with values defined that
are required by a tool or are optional.

A tool communicates with Kraken agent using specific protocol. Thanks
to this it is possible to write your own custom tools.

There are several ways a tool can get in interaction with Kraken
server via Kraken agent. Tools can be:

- do nothing, just do its job and that's it
- return list of all available test cases (eg. `pytest` tool); this
  allows pre-storing all test case results as `not run` initially and
  also splitting execution of test cases to several jobs
- report continuously test results (eg. `pytest` tool)
- report continuously issues (eg. `pylint` tool)
- report stored artifacts (eg. `artifacts` tool)

More about particular tools can be found
in [Workflow Schema chapter, in Tools section](schema#built-in-step-tools).

## Custom Tools

Tools can be written in Python. It is possible to write them in other
languages but for Python there is already a framework that makes some
actions easier.

### Protocol Overview

There is defined a protocol between Kraken agent and a tool. It works
differently depending on the direction. Generally an agent invokes one
of predefined commands of a tool and then a tool responds to the agent
via an HTTP connection using JSON as a response format.

The commands expected by Kraken agent:

- `get_commands` - it should return list of commands exposed by a tool;
  this command must be provided by every tool
- `collect_tests` - it returns list of available tests according to
  specification provided by step definition; optional
- `run` - it should just execute a step; optional
- `run_tests` - it executes tests according to specification provided
  by step definition and report results live, progresively, one by one
  if possible; optional
- `run_analysis` - it should perform an analysis and report issues
  live, progresively, one by one if possible

One of `run*` commands must be provided by a tool.

### Tool Framework

Handling of commands and sending reponses are quite automated by a
Python tool framework. The framework required defining one of `run*`
functions and `collect_tests` function if wanted.

### Example of Simple Tool

```python
import os
from . import utils

def run(step, **kwargs):
    cmd = step['cmd']
    cwd = step.get('cwd', None)
    timeout = int(step.get('timeout', 60))
    ret = utils.execute(cmd, cwd=cwd, timeout=timeout)
    if ret != 0:
        return ret, 'cmd exited with non-zero retcode: %s' % ret
    return 0, ''
```

This is a simplified implementation of `shell` tool. It just executes
a `cmd` command provided in a step. It uses also optional `cwd` and
`timeout` parameters provided in a step.

Tool framework provides several helper modules. One of them is `utils`
that offers an `execute` function. To use it impot the module:

```python
from . import utils
```

A `run` functions must return an exit code (0 means all is ok) and a
message that in case of an error describes the error (otherwise it
returns '' empty string).

### Example of Testing Tool

```python
import random

def collect_tests(step):
    # return list of available tests
    tests = ['test.aaa', 'test.bbb', 'test.ccc']
    return tests

def run_tests(step, report_result=None):
    # Now the step contains list of tests reported
    # by collect_tests function. If there is no collect_tests
    # function then the run_tests function should determine
    # on its own scope of tests based of step definition.
    tests = step['tests']

    for test in tests:
        cmd = 'command to execute a test'
        # status should indicate test result: 0 - not run, 1 - passed, 2 - failed,
        # 3 - error, 4 - disabled/skip, 5 - unsupported
        result = dict(cmd=cmd, test=test, status=random.choice([0, 1, 2, 3, 4, 5]))
        # report_result is a callback provided by Kraken tool framework that sends back
        # the test result to the server
        report_result(result)

    return 0, ''
```

The tool has hardcoded list of tests to execute regardless of step
definition. Generally `collect_tests` function should return list of
tests based of step definition. Then the `run_tests` function receives
list of tests in step definition and then it "executes" them one by
one, and then reports them using `report_result` callback from Kraken
tool framework.
