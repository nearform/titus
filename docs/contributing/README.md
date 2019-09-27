# Contribute to Titus

# Code
To follow...

# Documentation
We welcome documentation contributions. Our documentation can be viewed live at [nearform.github.io/titus][docs]

## Run the Documentation Locally
Our documentation is run by serving the docs folder at a given port.
If you have node installed, you can use `docsfiy-cli`.

From the root folder on a command console, enter the command:
```sh
npm run doc:serve
```

This displays the following:

```sh
> titus@x.y.z doc:serve /path/to/your/repo/titus
> docsify serve -p 4000 docs

Serving /path/to/your/repo/titus/docs now.
Listening at http://localhost:4000
```

The documentation is served on `localhost:4000`.

### Serve in Other Ways
Our documentation builds on the fly. All you need to do is serve the docs folder. Any program or cli tool used for serving a folder works - __as long as it can handle hash routing__.

Another popular module to serve files is `serve` on npm. To run, with hash router support, enter the command:

```sh
npx serve -s -l 4000 docs
```

This displays the following:

```sh
┌──────────────────────────────────────────────────┐
│                                                  │
│   Serving!                                       │
│                                                  │
│   - Local:            http://localhost:4000      │
│   - On Your Network:  http://192.168.1.60:4000   │
│                                                  │
│   Copied local address to clipboard!             │
│                                                  │
└──────────────────────────────────────────────────┘
```

The documentation is served on `localhost:4000` in this case.

[docs]:https://nearform.github.io/titus