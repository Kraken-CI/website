---
id: docker-executor
title: Docker Executor
---

## Images

All images for Kraken CI Docker executor are available on [Docker Hub](https://hub.docker.com/r/krakenci/):

### Language Images

| Language   | Docker Hub | Dockerfile | Base Image |
|------------|------------|------------|------------|
| **Python** | [krakenci/python](https://hub.docker.com/r/krakenci/python) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-python.txt) | python:3.8.5 |
| **Go**     | [krakenci/golang](https://hub.docker.com/r/krakenci/golang) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-go.txt) | golang:1.15.7-buster |
| **Java**   | [krakenci/openjdk](https://hub.docker.com/r/krakenci/openjdk) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-openjdk.txt) | openjdk:11.0-jdk-buster |

### System Images

| System           | Tags / Versions     | Dockerfile | Base Image |
|------------------|---------------------|------------|------------|
| **Ubuntu 20.04** | [krakenci/ubuntu:20.04](https://hub.docker.com/r/krakenci/ubuntu) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-ubuntu.txt) | ubuntu:20.04 |
| **CentOS 8**     | [krakenci/centos:8](https://hub.docker.com/r/krakenci/centos) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-centos.txt) | centos:8 |
| **Fedora 33**    | [krakenci/fedora:33](https://hub.docker.com/r/krakenci/fedora) | [Dockerfile](https://github.com/Kraken-CI/kraken/blob/master/base-images/docker-fedora.txt) | fedora:32 |
