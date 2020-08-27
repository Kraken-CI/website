# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

### Installation

[Docusaurus web page](https://v2.docusaurus.io/docs/installation) advices to install and use `yarn`. There is a defect that on some installations `yarn` may hang during package resolve or fetch. Therefore it is recommended to not install `yarn` and use only `npm`. All commands below use `npm` instead of `yarn`. However, if you have succesfully installed `yarn`, you can use it instead of `npm` with the same command syntax.


#### Step 1: Install npm

Follow your operating system's method to install `npm`, for example for *Ubuntu*:

```
$ sudo apt install npm
``` 

#### Step 2: Install Docusaurus dependencies

Go to `kraken.ci` website repository and execute `npm install` command, for example:

```
$ cd website
$ npm install
```

It has been observed that `npm` may have problems with installing dependencies on *Ubuntu 18.04* - upgrading to *Ubuntu 20.04* resolves this issue.  


### Local Development

```
$ npm start
```

This command starts a local development server and open up a browser window. Most changes to the website are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory. This directory can be served using any static contents hosting service.
