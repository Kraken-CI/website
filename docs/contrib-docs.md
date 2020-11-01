---
id: contrib-docs
title: Contributing to Documentation
---

Kraken website and documentation are kept in separate repository:
https://github.com/Kraken-CI/website.

## Reporting Problems and Enhancements Proposals

If you find any problem in the website or in the documentation, or
there is missing anything then please go to
[issue tracker on GitHub](https://github.com/Kraken-CI/website/issues)
and look around if the problem is already reported and if no then
create a new issue (problem or an improvement request).

## Preparing Website and Docs Changes

Kraken website and documentation are built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

### Setting up Environment

[Docusaurus web page](https://v2.docusaurus.io/docs/installation)
advices to install and use `yarn`. There is a defect that on some
installations `yarn` may hang during package resolve or
fetch. Therefore it is recommended to not install `yarn` and use only
`npm`. All commands below use `npm` instead of `yarn`. However, if you
have succesfully installed `yarn`, you can use it instead of `npm`
with the same command syntax.

#### Step 1: Install npm

Follow your operating system's method to install `npm`, for example for *Ubuntu*:

```console
$ sudo apt install npm
```

#### Step 2: Clone reposirory

Fork repository and clony your own copy::

```console
$ git clone git@github.com:<username>/website.git
```
#### Step 3: Install Docusaurus dependencies

Go to `kraken.ci` website repository and execute `npm install` command, for example:

```console
$ cd website
$ npm install
```

It has been observed that `npm` may have problems with installing dependencies on *Ubuntu 18.04* - upgrading to *Ubuntu 20.04* resolves this issue.


### Local Development

```console
$ npm start
```

This command starts a local development server and open up a browser window. Most changes to the website are reflected live without having to restart the server.

### Build

```console
$ npm run build
```

This command generates static content into the `build` directory. This directory can be served using any static contents hosting service.

## Submitting Changes

When you have your changes ready then follow these steps.

1. Push your changes to your repository.
1. Submit a pull request, referencing any issues it addresses.

We will review your pull request as soon as possible. Thank you for contributing!
