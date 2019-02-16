# Contributing

## Code
To follow...

## Documentation
We welcome documentation contributions. Our documentation can be viewed live at [nearform.github.io/titus-noise][docs]

### Running Documentation locally
Our documentation can be ran by serving the docs folder at a given port. For ease of use you can use the `docsfiy-cli` should you have node installed.

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

The documentation will be served on `localhost:4000` in this case.

[docs]:https://nearform.github.io/titus-noise
