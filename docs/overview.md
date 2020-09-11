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
