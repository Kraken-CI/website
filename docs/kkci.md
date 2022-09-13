---
id: kkci
title: Kraken Client Tool
---

import Screen from "./common.jsx"


## Overview

`kkci` is a tool that interacts with Kraken Server. It provides:

- [custom tools](tools) commands like list tools, register new tool or upload a tool code
- auxiliary commands - like get kkci or server versions

## Installation

`kkci` is hosted on https://pypi.org and can be installed by [pip tool](https://pip.pypa.io/).

The command for `kkci` installation looks as follows:

```console
$ pip install krakenci-client==0.980
Collecting krakenci-client==0.980
  Using cached krakenci-client-0.980.tar.gz (4.6 kB)
  Installing build dependencies ... done
  Getting requirements to build wheel ... done
  Preparing metadata (pyproject.toml) ... done
Collecting requests<3.0.0,>=2.26.0
  Using cached requests-2.28.1-py3-none-any.whl (62 kB)
Collecting click<8.0.0,>=7.1.2
  Using cached click-7.1.2-py2.py3-none-any.whl (82 kB)
Collecting tabulate<0.9.0,>=0.8.9
  Downloading tabulate-0.8.10-py3-none-any.whl (29 kB)
Collecting urllib3<1.27,>=1.21.1
  Using cached urllib3-1.26.10-py2.py3-none-any.whl (139 kB)
Collecting certifi>=2017.4.17
  Using cached certifi-2022.6.15-py3-none-any.whl (160 kB)
Collecting idna<4,>=2.5
  Using cached idna-3.3-py3-none-any.whl (61 kB)
Collecting charset-normalizer<3,>=2
  Using cached charset_normalizer-2.1.0-py3-none-any.whl (39 kB)
Building wheels for collected packages: krakenci-client
  Building wheel for krakenci-client (pyproject.toml) ... done
  Created wheel for krakenci-client: filename=krakenci_client-0.980-py3-none-any.whl size=4776 sha256=14c3ffa7b3676949839ddde24b82c6ffaa464dd55d17b69bbb55dffd48976162
  Stored in directory: /home/godfryd/.cache/pip/wheels/78/10/bb/e935de7562c5b54ca6248247129a728662cab84f0a91ee6192
Successfully built krakenci-client
Installing collected packages: urllib3, tabulate, idna, click, charset-normalizer, certifi, requests, krakenci-client
Successfully installed certifi-2022.6.15 charset-normalizer-2.1.0 click-7.1.2 idna-3.3 krakenci-client-0.980 requests-2.28.1 tabulate-0.8.10 urllib3-1.26.10
```

It is good to always indicate what `kkci` version should be installed.
In the example above, there is `0.980` version installed. The `kkci`
version needs to match the version of Kraken Server otherwise it
will not work.

The list of `kkci` versions can be checked on PyPI profile page:
https://pypi.org/project/krakenci-client/#history. The version of
Kraken Server is presented on its web pages in the top left corner.

## Tools Commands

### tools list

List Kraken Tools the last versions.

```console
$ kkci -s http://admin:admin@localhost:8080 tools list
  Id  Name            Location                 Entry    Last Version
----  --------------  -----------------------  -------  ------------
   5  artifacts                                         1
   9  cache                                             1
   7  cloc                                              1
   1  git                                               1
  10  gotest                                            1
  11  junit_collect                                     1
  16  local                                             1
  17  local_tool                                        1
   8  nglint                                            1
 131  pkg_install     minio:tool-131/tool.zip  main     48d4c5e
   6  pylint                                            1
   3  pytest                                            1
   4  rndtest                                           1
   2  shell                                             1
  12  values_collect                                    1
```

### tools list-versions

List all versions of the given Kraken Tool.

```console
$ kkci -s http://admin:admin@localhost:8080 tools list-versions pkg_install
  Id  Name         Location                             Entry    Version
----  -----------  -----------------------------------  -------  ---------
 131  pkg_install  minio:tool-131/tool.zip              main     48d4c5e
 130  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     dev4
  98  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     dev3
  97  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     dev2
  96  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     dev1
  95  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     14119
  94  pkg_install  /home/godfryd/repos/kraken/pkg-tool  main     dev
```

### tools register

Register a new or overwrite the existing tool described in indicated TOOL_FILE.

```console
$ kkci -s http://admin:admin@localhost:8080 tools register tool.json
Stored tool pkg_install@dev5
```

### tools register-remote

Register a tool located in a remote repository indicated by URL.

```console
$ kkci -s http://admin:admin@localhost:8080 tools register-remote \
       -f pkg_install/tool.json https://github.com/Kraken-CI/kraken-tools
Stored tool pkg_install@48d4c5e
```

### tools generate-step-file

Generate a step file for a tool by indicating its TOOL-FILE. This step
file will allow running the tool on a local machine.

```console
$ kkci tools generate-step-file tool.json
Please, enter values for pkg_install tool parameters
  pkgs (string): asd
  provider (string, one of ['apt', 'yum', 'dnf', 'apk']): apt
  aaa (integer): 1
git_cfg parameter is complex one, enter its value manually in the step file
  background (boolean, default False):
source parameter is complex one, enter its value manually in the step file
keys parameter is complex one, enter its value manually in the step file
Step file stored to step.json
```

### tools run

Run a tool on a local machine by indicating its TOOL-FILE with step file provide with -f option.

```console
$ kkci tools run tool.json -f step.json
execute 'python3 -m pip install -r requirements.txt --target=./vendor' in '/home/godfryd/repos/kraken-tools/pkg_install'
Collecting distro
  Using cached distro-1.7.0-py3-none-any.whl (20 kB)
Installing collected packages: distro
Successfully installed distro-1.7.0
WARNING: You are using pip version 22.0.4; however, version 22.1.2 is available.
You should consider upgrading via the '/home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python3 -m pip install --upgrade pip' command.
execute 'PYTHONPATH=/home/godfryd/repos/kraken-tools/pkg_install:/home/godfryd/repos/kraken-tools/pkg_install/vendor /home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python -m kraken.agent.tool -m main -s /home/godfryd/repos/kraken-tools/pkg_install/step.json check-integrity' in 'None'
execute 'PYTHONPATH=/home/godfryd/repos/kraken-tools/pkg_install:/home/godfryd/repos/kraken-tools/pkg_install/vendor /home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python -m kraken.agent.tool -m main -s /home/godfryd/repos/kraken-tools/pkg_install/step.json get_commands' in 'None'
execute 'PYTHONPATH=/home/godfryd/repos/kraken-tools/pkg_install:/home/godfryd/repos/kraken-tools/pkg_install/vendor /home/godfryd/.cache/pypoetry/virtualenvs/krakenci-client-gzjv3aIZ-py3.10/bin/python -m kraken.agent.tool -m main -s /home/godfryd/repos/kraken-tools/pkg_install/step.json run' in 'None'
2022-07-07 06:35:32,144 run step tool pkg_install, cmd run
2022-07-07 06:35:32,272 exec: 'sudo dnf -y install mc' in '/home/godfryd/repos/kraken/client'
2022-07-07 06:35:32,304 output: sudo: dnf: command not found
2022-07-07 06:35:32,304 step tool pkg_install, cmd run done with retcode 1 in 0secs
2022-07-07 06:35:32,305 tool response: {"status": "error", "reason": "retcode", "retcode": 1, "msg": "cmd exited with non-zero retcode: 1"}
```

### tools upload

Upload tool's code from DIRECTORY to Kraken Server.

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


## Auxiliary Commands

### version

Print a version of kkci.

```console
$ kkci version
0.1
```

### server-version

Print a version of Kraken Server indicated in `-s` option.

```console
$ kkci -s http://admin:admin@localhost:8080 server-version
0.1
```

### dump-workflow-schema

Dump workflow schema in JSON format from indicated Kraken Server in
`-s` option to indicated file.

```console
$ kkci -s http://admin:admin@localhost:8080 dump-workflow-schema schema.json
```
