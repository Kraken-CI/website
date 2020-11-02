---
id: proj-branches
title: Projects and Branches
---

## Projects

The first thing that should be created is a project. It defines scope
of view.  All entities defined inside a project are not visible or
available in other projects.

To add new project click `New Project` button. Then you are asked for
a name of the new project. After adding new project on the main page a
tile for new project should appear. There is a `New Branch` button
that allows for creating a new branch for this project.

## Branches

Branch is the first entity inside a project. There can be many
branches in a project. Branch logically represents a branch in a
source code repository and all development activities involved with
it.

The first project that can be created is `main` or `master` branch.
To do that click `New Branch` button and enter its name.
Click on branch name to get to branch page. On this page it is possible
to define workflow schema for the branch and things.

In the scope of a branch there are defined two sets of "builds" or
`Flows` actually. These two sets of flows are called `CI Flows` and
`Dev Flows`. On branch page, after defining workflow schema, one can
trigger a `CI Flow` or `Dev Flow`. They are connected with 2 different
set of activities.  Logically, `CI Flows` are triggered by commits
pushed to master branch. So they are associated with traditional CI
activities, ie. post-commit verification of the changes. `Dev Flows`
are used to verify pre-commit changes, the ones that are located on
developer branches forked from master branch or the ones that are
comming from Pull Requests or Merge Requests. So after completing such
changes they are merged to master branch what triggeres a new `CI
Flow`.

The workflow schema defined in a branch is the same for both `CI
Flows` and `Dev Flows`. The schema may be differentiated by
introducing a condition on flow type.
