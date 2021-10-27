# Titus - supplemental notes for titus-backend-typescript
## Overview
Titus backend (Typescript) is a starter [fastify] server with [node-postgres] and [Auth0] plugins using Typescript.

**NB: These are supplemental notes for the Typescript backend, and should be read in conjunction with [titus-backend]**

### Organisation
Titus backend (Typescript) differs from the standard backend, in that it has `src` and `dist` folders for source code and transpiled code accordingly. It is structured as follows:

* `src/` - contains the server sources.
* `src/config` - server configuration: reads environment variable values, with default values from the`.env` file.
* `src/plugins` - fastify plugins for cross-cutting features. Contains a pg instrumenter and Auth0 + [jwt] strategy.
* `src/routes` - fastify plugins to declare HTTP routes. The health check route is also here.

* `dist/` - mirrors the `src` structure above, but contains the transpiled build.

## Build the Application

To build the application, use the following command within the titus-backend-typescript directory:
```
npm run build
```
This command produces a new bundle in `dist/` folder.

You can also run the following command in the root directory of the project:
```
npm run build:all
```

[titus-backend]: ../titus-backend/