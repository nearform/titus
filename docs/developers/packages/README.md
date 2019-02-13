# Packages
Titus includes a number of applications and services out of the box,

![foo](../img/diagram-a.svg)

## Applications
Titus comes with two shell applications to get you started.

### titus-frontend
The frontend, [titus-frontend](), is built on [create-react-app](), with the addition of [Storybook](), [Material UI](), [Reach Router]() and more. It includes demos of open source client libraries we use, NearForm's own open source projects and design system. It also shows how to use the React components contained in the [titus-components]() package.

- [More information](packages/titus-frontend/READEME.md)

### titus-backend
The [backend](/kitchen-sink-backend) is built on [Hapi](), [PostgreSQL](), and [Docker](). It also includes demos of open source backend libraries and NearForm's open source packages.

- [More information](titus-backend)

## Infrastructure
To discuss later.

### PostgreSql
To discuss later.

#### Migration support in titus-backend
To discuss later.

## Deployment
To discuss later.

### Noise
To discuss later.

### titus-noise
To discuss later.

## Documentation
Documentation for projects and modules or tools produced for the project is of vital importance to ensure the long term knowledge sharing. With this in mind, Titus itself is heavily documented in the `docs/` folder in the root of the repository. We have also included a docs template package in `packages/` to make documentation for any part of the project a breeze.

### titus-starter-docs
Titus includes a start kit for documentation that is ready to run. The documentation is Github Pages and CDN friendly and can be hosted in folder of a given repo without the need to include dependencies solely to support documentation.

- [More information](starter-docs)
