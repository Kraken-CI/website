---
id: tools
title: Tools
---

import Screen from "./common.jsx"


## Overview

Tools are used for executing steps in a job. Each step indicates what
tool should be used for its execution. It can be e.g. a `shell` tool
to execute commands, other programs or a `git` tool for cloning Git
repository. A step can have several input fields with values that are
used by a tool.

There are several built-in tools. It is also possible to create
your own custom tool.

Built-in tools:

- git
- shell
- artifacts
- cache
- pytest
- pylint
- gotest
- junit_collect
- values_collect
- cloc
- nglint
- rndtest
- local_tool

These tools are described in detail in [Workflow Schema chapter, Built-in Step Tools section](schema#built-in-step-tools).


## Custom Tools

Tools can be written in Python. It is possible to write them in other
languages, but for Python there is already a framework that makes some
actions easier.


## Architecture

The picture below shows the architecture around Kraken tools.

<img src='/img/tool-arch.png' style={{ margin: '0 20% 15px 20%' }}/>

Kraken Agent asks Kraken Server for a job using REST API. In the
received job, there are defined multiple steps. For each step, a tool
is indicated for its execution. Kraken Agent takes the tool and spawns
it in a separate process. In arguments passed to the tool, the agent
gives a special command and a path to a JSON file with step
details. The tool, during its execution, sends the progress of
execution using TCP and JSON messages. These messages may contain
chunks of executed tests with their results or chunks of discovered
issues. In the end, the tool returns the exit code. If it is non-zero,
then this means that some error occurred.

## Interaction Between a Tool and Kraken Agent

A tool communicates with Kraken Agent using a specific protocol using
JSON messages. Thanks to this it is possible to write your own custom
tools.

There are several ways a tool can get in interaction with Kraken
Server via Kraken Agent. Tools can:

- do nothing, just do its job and that's it
- return list of all available test cases (eg. `pytest` tool); this
  allows pre-storing all test case results as `not run` initially and
  also splitting execution of test cases to several jobs
- report continuously test results (eg. `pytest` tool)
- report continuously issues (eg. `pylint` tool)
- report stored artifacts (eg. `artifacts` tool)


### Protocol Overview

There is a defined protocol between Kraken Agent and a tool. It works
differently depending on the direction. Generally, an agent invokes one
of predefined commands of a tool and then a tool responds to the agent
via an HTTP connection using JSON as a response format, and at the end
the tool exits with an exit code.

The commands expected by Kraken Agent:

- `get_commands` - it should return a list of commands exposed by a tool;
  this command must be provided by every tool
- `collect_tests` - it returns a list of available tests according to
  the specification provided by the step definition; optional
- `run` - it should just execute a step; optional
- `run_tests` - it executes tests according to specification provided
  by step definition and report results live, progressively, one by one
  if possible; optional
- `run_analysis` - it should perform an analysis and report issues
  live, progressively, one by one if possible

One of `run*` commands must be provided by a tool.

### Tool Framework

Handling of commands and sending responses are quite automated by a
Python tool framework. The framework requires defining one of `run*`
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
a `cmd` command provided in a step. It also uses optional `cwd` and
`timeout` parameters provided in a step.

The tool framework provides several helper modules. One of them is `utils`
that offers an `execute` function. To use it import the module:

```python
from . import utils
```

A `run` function must return an exit code (0 means all is ok) and a
message that, in case of an error, describes the error (otherwise it
returns '' empty string).

### Example of Testing Tool

```python
import random

def collect_tests(step):
    # return list of available tests
    tests = ['test.aaa', 'test.bbb', 'test.ccc']
    return tests

def run_tests(step, report_result=None):
    # Now, the step contains a list of tests reported
    # by collect_tests function. If there is no collect_tests
    # function then the run_tests function should determine
    # on its own scope of tests based of the step definition.
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

The tool has a hardcoded list of tests to execute regardless of the
step definition. Generally, `collect_tests` function should return a
list of tests based on the step definition. Then the `run_tests` function
receives a list of tests in step definition and then it "executes" them
one by one, and then reports them using `report_result` callback from
Kraken tool framework.


## Adding Custom Tool to Kraken Server

There are numerous ways to add a new tool to Kraken Server. After
adding a tool to Kraken Server, it can be used in user-defined
workflows with stages and jobs.

The ways for adding a tool to Kraken Server are as follows:

1. Adding a tool that is stored locally in a system
2. Uploading a tool to Kraken Server
3. Adding a tool from remote Git repository to Kraken Server

In all these scenarios, a helper Kraken client tool `kkci` is used.


### kkci - Kraken Client Tool

`kkci` provides multiple commands that help in various aspects related
to Kraken CI. One of key areas is support for the develepment and
management of custom tools for Kraken.

`kkci` installation instruction can be found
here: [kkci#installation](kkci#installation). The detailed list of
commands that help with custom tools are available
here: [kkci#tools-commands](kkci#tools-commands).

### Tool Meta File

Before adding a tool to Kraken Server, there needs to be prepared a
meta file for a tool. It defines the capabilities of a tool like:

- `name` - a name of a tool;
- `description` - a description of a tool, a few lines of text that
  tells what a tool can do;
- `location` - relative location, folder, of a tool main Python module
  looking from meta tool file, it will be used for invoking a tool,
  e.g. `.` or `src`;
- `entry` - a name of a tool main Python module, e.g. `main`; it is
  assumed that this module is stored in a file `entry` + `.py`
- `parameters` a definition in [JSON Schema](https://json-schema.org/)
  of input parameters that are expected in
  a [step definition](schema#steps-in-job) for this tool

The format of a tool meta file is JSON. Here is an example:

```json
{
    "name": "pkg_install",
    "description": "A tool that allows for installing packages using various providers.",
    "location": ".",
    "entry": "main",
    "parameters": {
        "additionalProperties": false,
        "required": ["pkgs"],
        "properties": {
            "pkgs": {
                "description": "A list of packages to install.",
                "type": "string"
            },
            "provider": {
                "description": "A provider to be used to do installation.",
                "enum": ["apt", "yum", "dnf", "apk"]
            }
        }
    }
}
```

More examples can be found in Kraken's tools repository:
https://github.com/Kraken-CI/kraken-tools.

### Local Tools

In the case of local tools, they are stored already in a system where
Kraken Agent is running (e.g. on baremetal system or inside Docker
image). So the only missing piece is informing Kraken Server about
this fact.

For that purpose, `kkci` is used and `tools register` command. It needs
a tool meta file that indicates the location of the tool on a local system.

The meta file `tool.json` example:

```json
{
    "name": "pkg_install",
    "description": "A tool that allows for installing packages using various providers.",
    "location": "/opt/kraken-tools/pkg_install",
    "entry": "main",
    "parameters": {
        "additionalProperties": false,
        "required": ["pkgs"],
        "properties": {
            "pkgs": {
                "description": "A list of packages to install.",
                "type": "string"
            },
            "provider": {
                "description": "A provider to be used to do installation.",
                "enum": ["apt", "yum", "dnf", "apk"]
            }
        }
    }
}
```

This file says that the tool is located in
`/opt/kraken-tools/pkg_install` directory, in `main.py` module.

The register command example:

```console
$ kkci -s http://admin:admin@localhost:8080 tools register tool.json
Stored tool pkg_install@dev5
```

Now the tool may be used in a step in a workflow schema:

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
        "tool": "pkg_install@dev5",
        "pkgs": "mc"
    }],
    "environments": [{
        "system": "any",
        "agents_group": "all",
        "config": "default"
    }]
}]
```

In this example, a tool version `dev5` is used directly. It could be
just:

```json
    "steps": [{
        "tool": "pkg_install",
        "pkgs": "mc"
    }],
```

that says that the latest version of `pkg_install` tool should be used.

### Tools Stored in Kraken Server

Another way to provide a tool in Kraken is to store it on Kraken
Server in Minio. For that purpose, another `kkci` command can be used:
`tools upload`.

The meta file `tool.json` example:

```json
{
    "name": "pkg_install",
    "description": "A tool that allows for installing packages using various providers.",
    "location": ".",
    "entry": "main",
    "parameters": {
        "additionalProperties": false,
        "required": ["pkgs"],
        "properties": {
            "pkgs": {
                "description": "A list of packages to install.",
                "type": "string"
            },
            "provider": {
                "description": "A provider to be used to do installation.",
                "enum": ["apt", "yum", "dnf", "apk"]
            }
        }
    }
}
```

In this case, the location parameter is not important as it is
overwritten by Kraken Server to a proper location to Minio, where the
tool will be stored. Still, it is important to indicate the main
module name and, in the example, it points to `main.py` again.

And now the upload command example:

```console
$ kkci -s http://admin:admin@localhost:8080 tools upload ./pkg-tool/tool.json
execute 'python3 -m pip install -r requirements.txt --target=./vendor' in '/home/godfryd/repos/kraken/pkg-tool'
Collecting pycvs
  Using cached pycvs-0.0.3-py3-none-any.whl (8.8 kB)
Collecting colorama
  Using cached colorama-0.4.5-py2.py3-none-any.whl (16 kB)
Collecting pexpect
  Using cached pexpect-4.8.0-py2.py3-none-any.whl (59 kB)
Collecting ptyprocess>=0.5
  Using cached ptyprocess-0.7.0-py2.py3-none-any.whl (13 kB)
Installing collected packages: ptyprocess, pexpect, colorama, pycvs
Successfully installed colorama-0.4.5 pexpect-4.8.0 ptyprocess-0.7.0 pycvs-0.0.3
WARNING: You are using pip version 22.0.4; however, version 22.1.2 is available.
You should consider upgrading via the '/home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python3 -m pip install --upgrade pip' command.
Uploaded tool pkg_install@dev6
```

Here `kkci` assumes that the tool source code is located in the same
folder as the meta file `tool.json` (it is called the tool
directory). So first, if in this folder there is `requirements.txt`
file then `kkci` install all dependencies to the temporary `vendor`
directory. Then `kkci` packs all files from the tool directory
together with the vendor directory into a zip package. In the end, the
package is uploaded to Kraken Server together with tool meta file
`tool.json`.

This way if there are any dependencies indicated in `requirements.txt`
file then they are stored together with a tool in Kraken Server and
are always the same during tool usage.

### Tools from Remote Git Repo

The last way for storing a custom tool is keeping it in Git
repository. `kkci` provides a command that allows registering
remotely stored custom tool.

The meta file `tool.json` example:

```json
{
    "name": "pkg_install",
    "description": "A tool that allows for installing packages using various providers.",
    "location": ".",
    "entry": "main",
    "parameters": {
        "additionalProperties": false,
        "required": ["pkgs"],
        "properties": {
            "pkgs": {
                "description": "A list of packages to install.",
                "type": "string"
            },
            "provider": {
                "description": "A provider to be used to do installation.",
                "enum": ["apt", "yum", "dnf", "apk"]
            }
        }
    }
}
```

The location field needs to be a relative path to a directory with an
entry source module.

The `tools register-remote` looks as follows:

```console
$ kkci -s http://admin:admin@localhost:8080 tools register-remote \
       -f pkg_install/tool.json https://github.com/Kraken-CI/kraken-tools
Stored tool pkg_install@48d4c5e
```

`-f` parameter indicates a path in the repo to the tool meta file.

### List Registered Tool

When a custom tool is registered in Kraken Server using one of the
above commands, it is possible to check if our tool is in the list of
all tools in Kraken Server. For that purpose, there is a `tools list`
command:

```console
$ kkci -s http://admin:admin@localhost:8080 tools list
  Id  Name            Location                 Entry    Last Version
----  --------------  -----------------------  -------  --------------
   5  artifacts                                         1
   9  cache                                             1
   7  cloc                                              1
   1  git                                               1
  10  gotest                                            1
  11  junit_collect                                     1
  16  local                                             1
  17  local_tool                                        1
   8  nglint                                            1
 133  pkg_install     minio:tool-133/tool.zip  main     dev6
   6  pylint                                            1
   3  pytest                                            1
   4  rndtest                                           1
   2  shell                                             1
  12  values_collect                                    1
```

Yes, on the list, there is our tool, `pkg_install`. The last version is `dev6`.

To list all versions of a given tool there is `tools list-versions` command:

```console
$ kkci -s http://admin:admin@localhost:8080 tools list-versions pkg_install
  Id  Name         Location                             Entry    Version
----  -----------  -----------------------------------  -------  ---------
 133  pkg_install  minio:tool-133/tool.zip              main     dev6
 132  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     dev5
 131  pkg_install  minio:tool-131/tool.zip              main     48d4c5e
 130  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     dev4
...
```

## Running a Tool Locally

Developing a new tool by uploading it after each code change would be tiresome.
It is quicker to run the tool locally and check if all works before uploading
the tool to Kraken Server.

A step file needs to be prepared to run the tool locally. This file
contains information on how the tool should be run i.e. it contains all
the arguments that the tool is expecting.

To make it easy, the step file can be generated semi-automatically based
on the meta tool file. This can be done in the following way using
`kkci`:

```console
$ kkci tools generate-step-file ./pkg-tool/tool.json
Please, enter values for pkg_install tool parameters
  pkgs (string): mc
  provider (string, one of ['apt', 'yum', 'dnf', 'apk']): apt
Step file stored to /home/godfryd/repos/kraken/pkg-tool/step.json
```

As can be seen in the log, `kkci` asks for values for the required
parameters. The meta tool file defines such parameters: `pkgs` and
`provider`. If the parameter type is too complex (e.g. a structure)
then it needs to be set manually in the generated step file. The last
line in the log indicates the location of the generated step file.

Having the step file, we can run our tool locally. Again using `kkci`
it can be made in the following way:

```console
$ kkci tools run ./pkg_tool/tool.json -f ./pkg_tool/step.json
execute 'python3 -m pip install -r requirements.txt --target=./vendor' in '/home/godfryd/repos/kraken/pkg-tool'
Collecting pycvs
  Using cached pycvs-0.0.3-py3-none-any.whl (8.8 kB)
Collecting colorama
  Using cached colorama-0.4.5-py2.py3-none-any.whl (16 kB)
Collecting pexpect
  Using cached pexpect-4.8.0-py2.py3-none-any.whl (59 kB)
Collecting ptyprocess>=0.5
  Using cached ptyprocess-0.7.0-py2.py3-none-any.whl (13 kB)
Installing collected packages: ptyprocess, pexpect, colorama, pycvs
Successfully installed colorama-0.4.5 pexpect-4.8.0 ptyprocess-0.7.0 pycvs-0.0.3
You should consider upgrading via the '/home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python3 -m pip install --upgrade pip' command.
execute 'PYTHONPATH=/home/godfryd/repos/kraken/pkg-tool:/home/godfryd/repos/kraken/pkg-tool/vendor /home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python -m kraken.agent.tool -m main -s ../pkg-tool/step.json check-integrity' in 'None'
execute 'PYTHONPATH=/home/godfryd/repos/kraken/pkg-tool:/home/godfryd/repos/kraken/pkg-tool/vendor /home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python -m kraken.agent.tool -m main -s ../pkg-tool/step.json get_commands' in 'None'
execute 'PYTHONPATH=/home/godfryd/repos/kraken/pkg-tool:/home/godfryd/repos/kraken/pkg-tool/vendor /home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python -m kraken.agent.tool -m main -s ../pkg-tool/step.json run' in 'None'

2022-08-11 08:07:41,871 run step tool pkg_install, cmd run
2022-08-11 08:07:41,992 exec: 'sudo apt install --no-install-recommends -y mc' in '/home/godfryd/repos/kraken/client'
2022-08-11 08:07:42,085 output:
Reading package lists...
2022-08-11 08:07:42,583 output: Building dependency tree...
Reading state information...
mc is already the newest version (3:4.8.27-1).
2022-08-11 08:07:42,675 output: 0 upgraded, 0 newly installed, 0 to remove and 16 not upgraded.
2022-08-11 08:07:42,757 step tool pkg_install, cmd run done with retcode 0 in 1secs
2022-08-11 08:07:42,757 tool response: {"status": "done"}
```

## Summary

This is all in terms of custom tool development. This section presented:

- what is the custom tool and how it interacts with Kraken Server
- `kkci` - CLI that provides useful operations around custom tools
- a meta tool file that describes a custom tool
- the three ways for storing custom tool for Kraken Server:
   - in a local system
   - in Kraken Server
   - in a Git repository
- listing stored tools in Kraken Server
- running the custom tool locally
