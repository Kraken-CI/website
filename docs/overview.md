---
id: overview
slug: /
title: Overview
---

Kraken CI is a continuous integration and testing system.

Kraken CI takes as input build scripts and different kinds of testing and validations tools
and outputs build artifacts, test results, found regression and fixes, and other issues.

![Kraken Diagram](/img/kraken-diagram.png)

The whole work needs to be defined in workflow schema in Kraken CI that is arranged in stages and jobs.
Then Kraken CI is executing it for production branches (like main branch or release branches)
or for developer branches to validate the changes before merging them.

## Features

- jobs can report or return 3 kinds of entities:
  - build artifacts - any files like packages, tarballs, RPMs, generated HTML reports
  - test results - they have several states (`not-run`, `passed`, `failed`, `error`, `disabled`, `unsupported`)
    and key-value pairs that storing e.g. performance results (e.g. FPS or MPS)
  - issues - returned by static analyzers, linters, etc
- test results and issues are monitored over time, compared to previous ones and then `regressions` and `fixes` are reported
  as well as `stability` of test cases
- charts with test case history so it can be observed how given test case behaved in the past
- support for performance tests so multiple iterations of the same tests are comprehended
  and statistical values are estimated like average, median, standard deviation, covariance and more
- performance results are tracked over time and regressions are detected and reported
- builds and tests execution is dynamically distributed to multiple machines
- stores build artifacts internally
- supports massive testing: hunderds tousands of unit tests
- executors:
  - direct
  - Docker
  - LXD
- and much more
