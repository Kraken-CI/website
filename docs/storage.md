---
id: storage
title: Global Storage
---

Global storage is used to store:

- artifacts that are created during job execution (used by [`artifacts` tool](schema#artifacts))
- Git repository bundles to speed up cloning repositories (used by [`git` tool](schema#git))
- caches of files e.g. npm node_modules to speed up their retrieval (used by [`cache` tool](schema#cache))

Storage is backed by [Minio](https://min.io), an AWS S3 compatible object storage.
