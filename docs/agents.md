---
id: agents
title: Agents
---

Agent is a part of Kraken system. The place of agents in Kraken is
visualized in [Architecture chapter](architecture.md).

Agent is a piece of software that is installed on separate system.
It connects to Kraken server, gets jobs to execution and executes
them. A job can be executed in several ways. It depends on selected
executor indicated in job definition. A job may be executed:

- locally on current host system,
- inside Docker container,
- inside LXD container.

## Browsing Agents

In the top bar of UI, on right side, there is an `Agents` menu.
It can be used to find and manage agents.

The first position, `Agents` allows for browsing active agents that can
execute jobs. The table of agents shows their address, current system
where they are running, if they are running on bare-metal host or in
Docker container, what capabilities host system has, currently running
job, etc.

Clicking the agent address leads to agent page which shows Agent
details. Here, it is also possible to assign an agent to `Agents
Groups`. These groups are used in job definitions in workflow schema
to indicate from which group an agent should be selected to execute
indicated job.

## Agents Groups

The next menu position, `Groups`, allows for gathering agents
into groups. Grouping can be arbitrary and manually managed by
administrator. It can be by hardware features, host system
capabilities, etc.

## Discovered Agents

The last menu position, `Discovered`, shows list of agents that tried
to connect to the Kraken server but are not authorized to do so. Here
we can find newly setup agent and athorize it. From that moment it can
execute jobs but first it is good to assign this new agent to proper
groups.

## Setting up a New Agent

Make sure that on Kraken -> Settings page there is  URL to Kraken
Server set (copy and paste URL from web browser to this field).

So now a new Agent can be installed. It involves downloading an agent
installerr and running it. That's all.

Agent Install steps:

1. Download Kraken agent installer:

```console
$ wget http://<kraken-server-address>/install/kraken-agent-install.sh
```

2. Execute installer:

```console
$ chmod a+x kraken-agent-install.sh
$ ./kraken-agent-install.sh
```

This will download the latest agent from Kraken server and install it
as a SystemD service on the host. Agent's files are installed into
/opt/kraken directory.

Now the new agent can be authorized in Kraken server. On Discovered
agents page there should be visible an IP address of the host with the
new agent. Select checkbox and click `Authorize` button. And then add
the agent to proper agent's group. Now the new agent will be getting
jobs for execution.
