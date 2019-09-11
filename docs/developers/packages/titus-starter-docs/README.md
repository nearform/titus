# Titus Starter Docs

A documentation starter kit that is easy to use and run.

# Features

* Easy to use markdown documentation
* Nice easy to read and use theme included
* No build required, just serve the folder
* Ready to add content, just copy and rename!
* Supports svg images for nice diagramming

# Installation
For a given repo or location, copy the titus-starter-package and rename it `docs`; move this folder to where you want your documentation to live.

The documentation pulls in its dependencies via the browser when it runs, this means it will require internet connection to run. This can be avoided by copying the linked dependencies in `index.html` locally and linking to the local versions. Note, this means you will also need to deploy these dependencies for documentation to work in a hosted environment.

# Running Locally
Documentation can be ran by serving the docs folder at a given port.

Which will produce:

```sh
> titus@x.y.z doc:serve /path/to/your/repo/titus
> docsify serve -p 4000 docs

Serving /path/to/your/repo/titus/docs now.
Listening at http://localhost:4000
```

For ease of use you can use the `docsfiy-cli` which is a CLI tool made by the [docsify] team:

From the `packages/titus-starter-docs` folder:
```sh
npx docsify init .
npx docsify serve . -p 4000
```

Which will produce:

```sh
Serving /path/to/your/repo/titus/packages/titus-starter-docs now.
Listening at http://localhost:4000

```

The documentation will be served on `localhost:4000`.

Assuming you moved `packages/titus-start-docs` to root folder and renamed it `docs`, you could also use:
```sh
npm run doc:serve
```

### Serving in other ways
Our documentation builds on the fly. This means all you need to do is serve the docs folder. Any program or cli tool used for serving a folder will work; __as long as it can handle hash routing__.

Another popular module for serving files is `serve` on npm. This can be ran, with hash router support like so:

```sh
npx serve -s -l 4000 .
```

Which will produce:

```sh
Serving!

Local:  http://localhost:4000
- On Your Network:  http://192.168.1.60:4000

Copied local address to clipboard!
```

The documentation will be served on `localhost:4000` in this case.

# Running online
Docs can be deployed to any host that supports hash routing. This includes Github Pages, Serve, and Commons Host. For ease of use, the docs for Titus themselves are deployed to Github Pages.


[docsify]: https://docsify.js.org
