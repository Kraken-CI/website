---
id: tools
title: Tools
---

There are several ways a tool can get in interaction with Kraken server via Kraken agent. Tools can:

- do nothing, just do its job and that's it
- return list of all available test cases (eg. `pytest` tool); this
  allows pre-storing all test case results as `not run` initially and
  also splitting execution of test cases to several jobs
- report continuously test results (eg. `pytest` tool)
- report continuously issues (eg. `pylint` tool)
- report stored artifacts (eg. `artifacts` tool)

## Custom Tools

TODO
