# Titus Starter Docs

A documentation starter kit that is easy to use and run.

## Features

* Easy to use markdown documentation
* Nice easy to read and use theme included
* No build required, just serve the folder
* Ready to add content, just copy and rename!
* Supports svg images for nice diagramming.

## Installation
For a given repo or location, copy the titus-starter-package and rename it docs; move this folder to where you want your documentation to live.

The documentation pulls in its dependencies via the browser when it runs, this means it will require internet connection to run. This can be avoided by copying the linked dependencies in `index.html` locally and linking to the local versions. Note, this means you will also need to deploy these dependencies for documentation to work in a hosted environment.

## Running Locally
Documentation can be ran by serving the docs folder at a given port. For ease of use you can use the `docsfiy-cli` which is a CLI tool made by the [docsify][] team:

```sh
npm install  -g docsify-cli
```

Next in the root folder run the docsify cli:

```sh
docsify serve docs
```

Which will produce:

```sh
Serving /path/to/your/repo/titus-noise/docs now.
Listening at http://localhost:3000
```

The documentation will be served on `localhost:3000`.

#### Serving in other ways
Our documentation builds on the fly. This means all you need to do is serve the docs folder. Any program or cli tool used for serving a folder will work; __as long as it can handle hash routing__.

Another popular module for serving files is `serve` on npm. This can be installed via:

```sh
npm install  -g docsify-cli
```

and ran, with hash router support like so:

```sh
serve -s -l 4000 docs
```

Which will produce:

```sh 
Serving!

Local:  http://localhost:4000
- On Your Network:  http://192.168.1.60:4000

Copied local address to clipboard!
```

The documentation will be served on `localhost:4000` in this case.

## Running online
Docs can be deployed to any host that supports hash routing. This includes Github Pages, Serve, and Commons Host. For ease of use, the docs for Titus themselves are deployed to Github Pages.


[docsify]: /

<!-- Images -->
[hapi]: https://hapijs.com/api/18.1.0
[pgsql]: https://www.postgresql.org/docs/
[pino]: https://github.com/pinojs/pino
[jest]: https://jestjs.io/
