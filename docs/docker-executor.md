---
id: docker-executor
title: Docker Executor
---

Beside using bare metal machine in Kraken CI jobs, it is possible to
select a Docker executor.  This can be made in the following way:

```python
def stage(ctx):
    return {
        "parent": "root",
        "triggers": {
            "parent": True
        },
        "parameters": [],
        "configs": [],
        "jobs": [{
            "name": "Docker job",
            "steps": [{
                "tool": "shell",
                "cmd": "echo 'Hello World'"
            }],
            "environments": [{
                "executor": "docker",
                "system": "krakenci/ubuntu:20.04",
                "agents_group": "any",
                "config": "default"
            }]
        }]
    }
```
In the `jobs` list, in the `environments` section there are present:

- `"executor": "docker",` - this indicates that instead of bare metal
  machine a Docker container should be used to execute a job
- `"system": "krakenci/ubuntu:20.04",` - this indicated that
  particular Docker image should be used, in this case this is
  `Ubuntu:20.04` from `krakenci` user on Docker Hub.

## Images

There are many images prepared for Kraken CI Docker executor. They
are available on [Docker Hub](https://hub.docker.com/r/krakenci/):

### Language Images

There are many images prepared for various programming languages.

Their usage, based on `Hello World` examples, can be seen on Demo Lab
of Kraken CI: https://lab.kraken.ci/branches/33/ci

| Language              | Docker Hub | Dockerfile | Image      |
|-----------------------|------------|------------|------------|
| **Clojure**           | [krakenci/clojure](https://hub.docker.com/r/krakenci/clojure) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-clojure.txt) | clojure:1.11 |
| **Crystal**           | [krakenci/crystal](https://hub.docker.com/r/krakenci/crystal) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-crystal.txt) | crystal:1.4 |
| **Dart**              | [krakenci/dart](https://hub.docker.com/r/krakenci/dart) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-dart.txt) | dart:2.16 |
| **Elixir**            | [krakenci/elixir](https://hub.docker.com/r/krakenci/elixir) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-elixir.txt) | elixir:1.13 |
| **Erlang**            | [krakenci/erlang](https://hub.docker.com/r/krakenci/erlang) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-erlang.txt) | erlang:23.3 |
| **GNU C/C++**         | [krakenci/gcc](https://hub.docker.com/r/krakenci/gcc) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-gcc.txt) | gcc:11.3 |
| **Go**                | [krakenci/golang](https://hub.docker.com/r/krakenci/golang) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-go.txt) | golang:1.18 |
| **Groovy**            | [krakenci/groovy](https://hub.docker.com/r/krakenci/groovy) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-groovy.txt) | groovy:3.0 |
| **Haskell**           | [krakenci/haskell](https://hub.docker.com/r/krakenci/haskell) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-haskell.txt) | haskell:9.2 |
| **Haxe**              | [krakenci/haxe](https://hub.docker.com/r/krakenci/haxe) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-haxe.txt) | haxe:4.2 |
| **Julia**             | [krakenci/julia](https://hub.docker.com/r/krakenci/julia) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-julia.txt) | julia:1.7 |
| **C# / Mono**         | [krakenci/mono](https://hub.docker.com/r/krakenci/mono) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-mono.txt) | mono:6.12 |
| **Javascript / Node** | [krakenci/node](https://hub.docker.com/r/krakenci/node) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-node.txt) | node:18.0 |
| **Java / OpenJDK**    | [krakenci/openjdk](https://hub.docker.com/r/krakenci/openjdk) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-openjdk.txt) | openjdk:11.0 |
| **Perl**    | [krakenci/perl](https://hub.docker.com/r/krakenci/perl) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-perl) | perl:5.34 |
| **Perl 6 / Rakudo**    | [krakenci/rakudo](https://hub.docker.com/r/krakenci/rakudo) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-rakudo) | rakudo:2021.04 |
| **PHP**    | [krakenci/php](https://hub.docker.com/r/krakenci/php) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-php) | php:8.0 |
| **Python** | [krakenci/python](https://hub.docker.com/r/krakenci/python) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-python.txt) | python:3.8 |
| **Ruby**    | [krakenci/ruby](https://hub.docker.com/r/krakenci/ruby) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-ruby) | ruby:3.1 |
| **Rust**    | [krakenci/rust](https://hub.docker.com/r/krakenci/rust) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-rust) | rust:1.60 |
| **Swift**    | [krakenci/swift](https://hub.docker.com/r/krakenci/swift) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-swift) | swift:5.6 |


### System Images

| System           | Tags / Versions     | Dockerfile | Base Image |
|------------------|---------------------|------------|------------|
| **Ubuntu 20.04** | [krakenci/ubuntu:20.04](https://hub.docker.com/r/krakenci/ubuntu) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-ubuntu.txt) | ubuntu:20.04 |
| **CentOS 8**     | [krakenci/centos:8](https://hub.docker.com/r/krakenci/centos) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-centos.txt) | centos:8 |
| **Fedora 33**    | [krakenci/fedora:33](https://hub.docker.com/r/krakenci/fedora) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-fedora.txt) | fedora:32 |


### Tested Vanilla Images

- fedora:32
- fedora:33
- fedora:34
- fedora:35
- fedora:36
- fedora:37
- rockylinux:8
- rockylinux:9
- almalinux:8
- almalinux:9
- debian:buster
- debian:bullseye
- debian:bookworm
- ubuntu:18.04
- ubuntu:20.04
- ubuntu:22.04

For details, please, check a testing workflow results:
https://lab.kraken.ci/branches/12/ci
