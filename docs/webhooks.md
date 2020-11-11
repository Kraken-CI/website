---
id: webhooks
title: Webhooks
---

Webhooks allows for integration between source code versioning system
and Kraken. This way a push to Git repository may trigger a CI or a
Dev flow. Currently the supported system is Github.

Webhooks configuration is located in a project web page, under `Web
Hooks` tab. There is a switch that enables or disables receiving
webhook requests from GitHub.

When GitHub webhook is enabled then there is provided a `URL` and a
`secret` that should be set in GitHub project settings page for
webhooks. This is `https://github.com/<user>/<project>/settings/hooks`.

On this page there are several fields that should be filled:

- `Payload URL` - set to URL from Kraken that was mentioned above,
- `Content Type` - set to `application/json`
- `Secret` - take from Kraken, it was mentioned above.

In section `Which events would you like to trigger this webhook?`
select `Let me select individual events.` and then check `Pull
requests` and `Pushes`.

Now webhook can be saved. You may try to trigger testing request.
