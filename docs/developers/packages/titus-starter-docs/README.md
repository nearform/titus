# Titus Documentation Starter Kit

This document describes how to install and run the documentation that is included in Titus. The documentation can be run locally or online. 

## Features

* Easy to use Markdown documentation
* Includes a user-friendly theme
* Serve the folder - no build required
* Ready to add content, just copy and rename!
* Supports SVG images


## Installation
For a given repo or location, copy the titus-starter-package and rename it `docs`. 
You can move the renamed folder to where you want your documentation to be within the repo.

The documentation pulls in its dependencies via the browser when it runs. Therefore, it requires an internet connection to run. Alternatively, you can copy the dependencies listed in the file `index.html` locally and link to the local versions. **Note**, this means you also need to deploy these dependencies for the documentation to work in a hosted environment.

## Running Locally
Documentation is ran by serving the docs folder at a given port. 

```sh
> titus@x.y.z doc:serve /path/to/your/repo/titus
> docsify serve -p 4000 docs
```

This displays the following, which shows the documentation is served on `localhost:4000`.:

```sh
Serving /path/to/your/repo/titus/docs now.
Listening at http://localhost:4000
```

Alternatively, you can use the `docsfiy-cli` which is a CLI tool made by the [docsify] team.
From the `packages/titus-starter-docs` folder, enter the following:
```sh
npx docsify init .
npx docsify serve . -p 4000
```

This displays the following:

```sh
Serving /path/to/your/repo/titus/packages/titus-starter-docs now.
Listening at http://localhost:4000

```

The documentation is served on `localhost:4000`.

If you moved `packages/titus-start-docs` to the root folder and renamed it `docs`, you could also use: 
```sh
npm run doc:serve
```

#### Serving in Other Ways
Our documentation builds on the fly. This means all you need to do is serve the docs folder. Any program or CLI tool used for serving a folder will work; __as long as it can handle hash routing__.

Another popular module for serving files is using `serve` on npm. This can be done, with hash router support, as follows:

```sh
npx serve -s -l 4000 .
```

This displays the following:

```sh 
Serving!

Local:  http://localhost:4000
- On Your Network:  http://192.168.1.60:4000

Copied local address to clipboard!
```

The documentation is served on `localhost:4000` in this case.

## Running Documents Online
Documents can be deployed to any host that supports hash routing. This includes GitHub Pages, Serve and Commons Host. For ease of use, the Titus documents are deployed to GitHub Pages.


[docsify]: https://docsify.js.org
