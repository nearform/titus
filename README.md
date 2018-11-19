# Titus

[![CircleCI](https://circleci.com/gh/nearform/titus.svg?style=svg&circle-token=ffb218c0396d2d09567299ee18ad345ef414e7d3)](https://circleci.com/gh/nearform/titus)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


Titus is an end-to-end JavaScript stack created for modern web application development.

This repository is a [monorepo](https://lernajs.io/) containing distinct parts of the Titus stack. Packages include:

- [titus-components](https://github.com/nearform/titus/tree/master/packages/titus-components) - A collection of React components ready to drop in to your application.
- [titus-kitchen-sink](https://github.com/nearform/titus/tree/master/packages/titus-kitchen-sink) - An sample client-side application based off of [create-react-app](https://github.com/facebook/create-react-app) with the addition of [Storybook](https://storybook.js.org/), [Material-UI](https://material-ui.com/), [Reach Router](https://reach.tech/router), [Apollo](https://www.apollographql.com/) and more.
- [titus-kitchen-sink-backend](https://github.com/nearform/titus/tree/master/packages/titus-kitchen-sink-backend) - A sample server-side application complete with [Hapi](https://hapijs.com/), [PostgreSQL](https://www.postgresql.org/), [Docker](https://www.docker.com/), [GraphQL](https://graphql.org/) and more.

## Ethos & Goals

The aim of Titus is to give projects a faster 'time to first feature' by providing a core set of technologies, frameworks and techniques which aid in modern web application development.

## Development

Want to contribute to Titus? Before submitting a pull request it's worth [creating an issue](https://github.com/nearform/titus/issues) to discuss what you'd like to add or amend. This will help make sure you're not spending time and energy proposing a feature which doesn't align with the goals of the project.

### Installation

Install dependencies for all packages using:

```
npm install
```

This will install root package dependencies, including Lerna, which will then install all sub package dependencies and link cross-dependencies.

Alternatively, if you have Lerna installed globally, run:

```
lerna bootstrap
```

Individual sub-packages are built during the bootstrap process.

### kitchen-sink sample application

This repository includes a sample application showcasing the features availabe in Titus and third party libraries. The running application can be found [here](https://nearform.github.io/titus).

### Auth configuration

In order to connect with Auth0 or any other OIDC provider few environment variables need to be defined.

Titus Kitchen Sink is also able to use the standard OIDC to connect to Auth0 or other OIDC compliant providers. Use the following variables instead of the above mentioned:
- REACT_APP_OIDC_AUTHORITY
- REACT_APP_OIDC_CLIENT_ID

For the frontend Auth0 configuration:
- REACT_APP_AUTH0_DOMAIN
- REACT_APP_AUTH0_CLIENT_ID
- REACT_APP_AUTH0_AUDIENCE

For the backend Auth0 configuration:
- AUTH0_DOMAIN
- AUTH0_CLIENT_ID
- AUTH0_CLIENT_SECRET
- AUTH0_AUDIENCE

Bear in mind that AUTH0_AUDIENCE is optional.

### Convenience Scripts

Some commands have been added to the root package for convenience.

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| postinstall        | runs 'lerna bootstrap' post install |
| start:kitchen-sink | starts the kitchen sink app         |
| stop:kitchen-sink  | stops the kitchen sink app          |

### Documentation

Documentation for the contents of the repository can be found [here](https://nearform.github.io/titus).

### Infrastructure documentation

Info about how the Titus demo app (kitchen-sink) is deployed can be found [here](https://github.com/nearform/titus/blob/master/kubernetes/README.md).
