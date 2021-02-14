---
id: schema-vars
title: Schema Variables
---

There are built-in and user defined variables that can be used in
workflow schema definition. They can be access using string
interpolation, e.g.: `"flow_label": "build #{MY_VAR}"`. In this example
there is a `MY_VAR` variable. Interpolation inside a string is made
using `#{...}` operator (hash and curly brackets, similarly to Ruby
variables interpolation in strings).

User variables can be defined as parameters in stages
(see [Parameters section in Workflow Schema chapter](schema#parameters)).
Then they can be accessed using their name in uppercase.

## Built-in Variables

### Flow and Run Sequences

Flows and Runs has predefined sequences that are incremented with each
new flow or run. There are also variants specific to flow kinds (CI
and DEV).

| Sequence Name          | Description |
|------------------------|-------------|
| ``KK_FLOW_SEQ``        | A variable returning a sequence value for flows. The sequence is incremented with each flow regardles its type, ie. it is shared between flow types. |
| ``KK_CI_DEV_FLOW_SEQ`` | A variable returning a sequence value for flows. The sequence is incremented with each flow of given type (CI/DEV), ie. it is handled separately for each flow type. |
| ``KK_RUN_SEQ``         | A variable returning a sequence value for runs of given stage. The sequence is incremented with each run regardles of flow type, ie. it is shared between flow types. |
| ``KK_CI_DEV_RUN_SEQ``  | A variable returning a sequence value for runs of given stage. The sequence is incremented with each run of given flow type (CI/DEV), ie. it is handled separately for each flow type. |

Example:

```python
{
    ...
    "flow_label": "bld-#{KK_CI_DEV_FLOW_SEQ}",
    ...
}
```

### Secret Variables

Values of secrets defined in a project can be access using built-in
variables. They have name according to the following pattern:

| Secret&nbsp;Type | Name Pattern | Example |
|-------------|--------------|---------|
| Simple      | `KK_SECRET_SIMPLE_<secret name>` | `KK_SECRET_SIMPLE_access_token` |
| SSH&nbsp;Key     | `KK_SECRET_USER_<secret_name>` and `KK_SECRET_KEY_<secret_name>` | `KK_SECRET_USER_gitlab` and `KK_SECRET_KEY_gitlab` |

Example:

```python
{
    ...
    steps: [{
        "tool": "git",
        "access-token": "#{KK_SECRET_SIMPLE_gitlab_token}",
        ...
    }]
}
```

There is defined a secret named `gitlab_token` and here it is
referenced and passed to `access-token` field in `git` step.


More about secrets can be found in [Secrets chapter](secrets).
