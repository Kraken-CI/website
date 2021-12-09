---
id: guide-intro
title: Introductory Guide
---

## Assumptions

We are using fresh Kraken installation using Docker Compose with built-in Agent running in Docker as well.
Installation instruction can be found in [Installation chapter](install-docker-compose.mdx).

## Project Preparation

1. Create a project

   name: `Demo`

2. Create a branch

   name: `master`

3. Create a stage

   name: `Stage 1`

## Stage Hello World

Edit schema:


```python
def stage(ctx):
    return {
        "parent": "root",
        "triggers": {
            "parent": True,
        },
        "parameters": [],
        "configs": [],
        "jobs": [{
            "name": "hello",
            "steps": [{
                "tool": "shell",
                "cmd": "echo 'hello world'"
            }],
            "environments": [{
                "system": "any",
                "agents_group": "all",
                "config": "default"
            }]
        }],
    }
```

Now run CI flow.

```console
* shell
exec: 'echo 'hello world'' in '/tmp/kk-jobs/jobs/570'
hello world
```

## Git Repo Checkout Step

Add step for checking out a Git repository

```python
   "steps": [{
       "tool": "git",
       "checkout": "https://github.com/Kraken-CI/sample-project-python.git"
   }, {
       "tool": "shell",
       "cmd": "ls -al"
   }],
```

Now run CI flow again. The output should look like:

```console
* git
exec: 'git clone https://github.com/Kraken-CI/sample-project-python.git ' in '/tmp/kk-jobs/jobs/571'
Cloning into 'sample-project-python'...
Step succeeded
* shell
exec: 'ls -al' in '/tmp/kk-jobs/jobs/571'
total 20
drwxrwxr-x  3 godfryd godfryd 4096 wrz  3 10:21 .
drwxrwxr-x 11 godfryd godfryd 4096 wrz  3 10:21 ..
drwxrwxr-x  7 godfryd godfryd 4096 wrz  3 10:21 sample-project-python
-rw-rw-r--  1 godfryd godfryd  267 wrz  3 10:21 step_0.json
-rw-rw-r--  1 godfryd godfryd  172 wrz  3 10:21 step_1.json
Step succeeded
```

## Run Tests Step

There are several built-in steps for running tests. In case of our Python sample project we will use `pytest` built-in step.

```python
   "steps": [{
       "tool": "git",
       "checkout": "https://github.com/Kraken-CI/sample-project-python.git"
   }, {
       "tool": "pytest",
       "cwd": "sample-project-python",
       "params": "-vv",
       "pythonpath": "src"
   }],
```

And the job output:

```console
* git
exec: 'git clone https://github.com/Kraken-CI/sample-project-python.git ' in '/tmp/kk-jobs/jobs/590'
Cloning into 'sample-project-python'...
Step succeeded
* pytest
exec: 'PYTHONPATH=`pwd`:src pytest-3 --collect-only -q   | head -n -2' in 'sample-project-python'
tests/test_simple.py::TestSimple::test_add_one
exec: 'PYTHONPATH=`pwd`:src pytest-3 -vv -r ap --junit-xml=result.xml -vv tests/test_simple.py::TestSimple::test_add_one' in 'sample-project-python'
============================= test session starts ==============================

platform linux -- Python 3.7.5, pytest-3.10.1, py-1.8.0, pluggy-0.12.0 -- /usr/bin/python3
cachedir: .pytest_cache
rootdir: /tmp/kk-jobs/jobs/590/sample-project-python, inifile:
collecting ...
collected 1 item
tests/test_simple.py::TestSimple::test_add_one
PASSED
                    [100%]
=========================== short test summary info ============================
PASSED tests/test_simple.py::TestSimple::test_add_one
=========================== 1 passed in 0.02 seconds ===========================

-- generated xml file: /tmp/kk-jobs/jobs/590/sample-project-python/result.xml --
Step succeeded
```

## Building Step

Add step for checking out a Git repository

```python
   "steps": [{
       "tool": "git",
       "checkout": "https://github.com/Kraken-CI/sample-project-python.git"
   }, {
       "tool": "pytest",
       "cwd": "sample-project-python",
       "params": "-vv",
       "pythonpath": "src"
   }, {
       "tool": "shell",
       "cwd": "sample-project-python",
       "cmd": "python3 setup.py sdist bdist_wheel"
   }],
```

Now run CI flow again. The output should look as follows:

```console
* git
exec: 'git clone https://github.com/Kraken-CI/sample-project-python.git ' in '/tmp/kk-jobs/jobs/572'
Cloning into 'sample-project-python'...
Step succeeded
* pytest
exec: 'PYTHONPATH=`pwd`:src pytest-3 --collect-only -q   | head -n -2' in 'sample-project-python'
...
Step succeeded
* shell
exec: 'python3 setup.py sdist bdist_wheel' in 'sample-project-python'
usage: setup.py [global_opts] cmd1 [cmd1_opts] [cmd2 [cmd2_opts] ...]
   or: setup.py --help [cmd1 cmd2 ...]
   or: setup.py --help-commands
   or: setup.py cmd --help

error: invalid command 'bdist_wheel'
Step error
```

It seems that there is missing package that provides wheel support for Python.
Let's install it.

```python
   "steps": [{
       "tool": "git",
       "checkout": "https://github.com/Kraken-CI/sample-project-python.git"
   }, {
       "tool": "pytest",
       "cwd": "sample-project-python",
       "params": "-vv",
       "pythonpath": "src"
   }, {
       "tool": "shell",
       "cmd": "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends python3-wheel python3-setuptools"
   }, {
       "tool": "shell",
       "cwd": "sample-project-python",
       "cmd": "python3 setup.py sdist bdist_wheel"
   }],
```

New output with building:

```console
* git
exec: 'git clone https://github.com/Kraken-CI/sample-project-python.git ' in '/tmp/kk-jobs/jobs/590'
Cloning into 'sample-project-python'...
Step succeeded
* pytest
exec: 'PYTHONPATH=`pwd`:src pytest-3 --collect-only -q   | head -n -2' in 'sample-project-python'
...
Step succeeded
* shell
exec: 'sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends python3-wheel python3-setuptools' in '/tmp/kk-jobs/jobs/590'
Czytanie list pakietów...
Budowanie drzewa zależności...
Odczyt informacji o stanie...
python3-setuptools is already the newest version (41.1.0-1).
python3-wheel is already the newest version (0.32.3-2).
Następujące pakiety zostały zainstalowane automatycznie i nie są już więcej wymagane:
  linu
x-headers-5.3.0-53 linux-headers-5.3.0-53-generic
  linux-image-5.3.0-53-generic linux-modules-5.3.0-53-generic
  linux-modules-extra-5.3.0-53-generic python-appindicator
Aby je usunąć należy użyć "sudo apt autoremove".
0 aktualizowanych, 0 nowo instalowanych, 0 usuwanych i 13 nieaktualizowanych.
Step succeeded
* shell
exec: 'python3 setup.py sdist bdist_wheel' in 'sample-project-python'
running sdist
running egg_info
creating src/sampleproject.egg-info
writing entry points to src/sampleproject.egg-info/entry_points.txt
writing src/sampleproject.egg-info/PKG-INFO
writing dependency_links to src/sampleproject.egg-info/dependency_links.txt
writing requirements to src/sampleproject.egg-info/requires.txt
writing top-level names to src/sampleproject.egg-info/top_level.txt
writing manifest file 'src/sampleproject.egg-info/SOURCES.txt'
reading manifest file 'src/sampleproject.egg-info/SOURCES.txt'
reading manifest template 'MANIFEST.in'
running check
writing manifest file 'src/sampleproject.egg-info/SOURCES.txt'
creating sampleproject-2.0.0/src/sample
creating sampleproject-2.0.0/src/sampleproject.egg-info
copying files to sampleproject-2.0.0...
copying LICENSE.txt -> sampleproject-2.0.0
creating sampleproject-2.0.0
creating sampleproject-2.0.0/data
creating sampleproject-2.0.0/src
copying MANIFEST.in -> sampleproject-2.0.0
copying setup.cfg -> sampleproject-2.0.0
copying setup.py -> sampleproject-2.0.0
copying README.md -> sampleproject-2.0.0
copying pyproject.toml -> sampleproject-2.0.0
copying data/data_file -> sampleproject-2.0.0/data
copying src/sample/__init__.py -> sampleproject-2.0.0/src/sample
copying src/sample/package_data.dat -> sampleproject-2.0.0/src/sample
copying src/sampleproject.egg-info/dependency_links.txt -> sampleproject-2.0.0/src/sampleproject.egg-info
copying src/sampleproject.egg-info/entry_points.txt -> sampleproject-2.0.0/src/sampleproject.egg-info
copying src/sampleproject.egg-info/SOURCES.txt -> sampleproject-2.0.0/src/sampleproject.egg-info
copying src/sample/simple.py -> sampleproject-2.0.0/src/sample
copying src/sampleproject.egg-info/PKG-INFO -> sampleproject-2.0.0/src/sampleproject.egg-info
copying src/sampleproject.egg-info/requires.txt -> sampleproject-2.0.0/src/sampleproject.egg-info
copying src/sampleproject.egg-info/top_level.txt -> sampleproject-2.0.0/src/sampleproject.egg-info
Writing sampleproject-2.0.0/setup.cfg
creating dist
Creating tar archive
removing 'sampleproject-2.0.0' (and everything under it)
running bdist_wheel
running build_py
creating build
running build
copying src/sample/__init__.py -> build/lib/sample
creating build/lib
creating build/lib/sample
copying src/sample/simple.py -> build/lib/sample
copying src/sample/package_data.dat -> build/lib/sample
installing to build/bdist.linux-x86_64/wheel
running install_lib
running install
creating build/bdist.linux-x86_64/wheel
creating build/bdist.linux-x86_64/wheel/sample
creating build/bdist.linux-x86_64
copying build/lib/sample/package_data.dat -> build/bdist.linux-x86_64/wheel/sample
copying build/lib/sample/simple.py -> build/bdist.linux-x86_64/wheel/sample
copying build/lib/sample/__init__.py -> build/bdist.linux-x86_64/wheel/sample
running install_data
creating build/bdist.linux-x86_64/wheel/sampleproject-2.0.0.data/data
creating build/bdist.linux-x86_64/wheel/sampleproject-2.0.0.data/data/my_data
copying data/data_file -> build/bdist.linux-x86_64/wheel/sampleproject-2.0.0.data/data/my_data
creating build/bdist.linux-x86_64/wheel/sampleproject-2.0.0.data
running install_egg_info
Copying src/sampleproject.egg-info to build/bdist.linux-x86_64/wheel/sampleproject-2.0.0.egg-info
running install_scripts
adding license file "LICENSE.txt" (matched pattern "LICENSE.txt")
creating 'dist/sampleproject-2.0.0-py3-none-any.whl' and adding 'build/bdist.linux-x86_64/wheel' to it
creating build/bdist.linux-x86_64/wheel/sampleproject-2.0.0.dist-info/WHEEL
adding 'sample/package_data.dat'
adding 'sample/__init__.py'
adding 'sample/simple.py'
adding 'sampleproject-2.0.0.data/data/my_data/data_file'
adding 'sampleproject-2.0.0.dist-info/LICENSE.txt'
adding 'sampleproject-2.0.0.dist-info/METADATA'
adding 'sampleproject-2.0.0.dist-info/entry_points.txt'
adding 'sampleproject-2.0.0.dist-info/WHEEL'
removing build/bdist.linux-x86_64/wheel
adding 'sampleproject-2.0.0.dist-info/RECORD'
adding 'sampleproject-2.0.0.dist-info/top_level.txt'
Step succeeded
```

## Storing Artifacts Step

The results of building the sample projects are two packages:

- `dist/sampleproject-2.0.0-py3-none-any.whl`
- `dist/sampleproject-2.0.0.tar.gz`

For that purpose there is another built-in step: `artifacts`.

```python
   "steps": [{
       "tool": "git",
       "checkout": "https://github.com/Kraken-CI/sample-project-python.git"
   }, {
       "tool": "pytest",
       "cwd": "sample-project-python",
       "params": "-vv",
       "pythonpath": "src"
   }, {
       "tool": "shell",
       "cmd": "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends python3-wheel python3-setuptools"
   }, {
       "tool": "shell",
       "cwd": "sample-project-python",
       "cmd": "python3 setup.py sdist bdist_wheel"
   }, {
       "tool": "artifacts",
       "action": "upload",
       "cwd": "sample-project-python/dist",
       "source": [
           "sampleproject-2.0.0-py3-none-any.whl",
           "sampleproject-2.0.0.tar.gz"
       ],
       "public": True
   }],
```

And the job output:

```console
* git
exec: 'git clone https://github.com/Kraken-CI/sample-project-python.git ' in '/tmp/kk-jobs/jobs/590'
Cloning into 'sample-project-python'...
Step succeeded
* pytest
exec: 'PYTHONPATH=`pwd`:src pytest-3 --collect-only -q   | head -n -2' in 'sample-project-python'
tests/test_simple.py::TestSimple::test_add_one
exec: 'PYTHONPATH=`pwd`:src pytest-3 -vv -r ap --junit-xml=result.xml -vv tests/test_simple.py::TestSimple::test_add_one' in 'sample-project-python'
...
Step succeeded
* shell
exec: 'sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends python3-wheel python3-setuptools' in '/tmp/kk-jobs/jobs/590'
...
Step succeeded
* shell
exec: 'python3 setup.py sdist bdist_wheel' in 'sample-project-python'
...
Step succeeded
* artifacts
upload: source: ['sampleproject-2.0.0-py3-none-any.whl', 'sampleproject-2.0.0.tar.gz'], dest: /
store /tmp/kk-jobs/jobs/590/sample-project-python/dist/sampleproject-2.0.0-py3-none-any.whl -> /sampleproject-2.0.0-py3-none-any.whl
store /tmp/kk-jobs/jobs/590/sample-project-python/dist/sampleproject-2.0.0.tar.gz -> /sampleproject-2.0.0.tar.gz
```
