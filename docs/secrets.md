---
id: secrets
title: Secrets
---

Secrets are special variables that are protected. Their values are
never revealed in Kraken UI. They ar defined in projects. They can be
added, modified and deleted on project web page, under `Secrets` tab.

New secret can be added by clicking `New Secret` button. The form in
the center of the web page allows for providing secret details: a name
of secret, a type and values. There are two types of secrets:

- `Simple` secret - there is available just one simple secret value,
  it can be e.g. an access token
- `SSH Username and Key` secret - there are two values: username and a
  protected key

When the secret is defined then it can be used in stage
definition. They can placed in workflow schema using variable
interpolation.

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

More about secret variables in
[Schema Variables chapter, in Secret Variables section](schema-vars#secret-variables).
