# Titus

Titus is an end-to-end JavaScript stack created for modern web application development.

This repository is a [monorepo](https://lernajs.io/) containing distinct parts of the Titus stack. Packages include:

- [titus-starter](https://github.com/nearform/titus/tree/master/packages/titus-starter) - A client-side starter shell based off of [create-react-app](https://github.com/facebook/create-react-app) with the addition of [Storybook](https://storybook.js.org/), [Material-UI](https://material-ui.com/), [Reach Router](https://reach.tech/router), [Redux](https://redux.js.org/) and more.
- [titus-starter-backend](https://github.com/nearform/titus/tree/master/packages/titus-starter-backend) - A server-side starter shell complete with [Hapi](https://hapijs.com/), [PostgreSQL](https://www.postgresql.org/), [Docker](https://www.docker.com/), [GraphQL](https://graphql.org/) and more.
- [titus-components](https://github.com/nearform/titus/tree/master/packages/titus-components) - A collection of React components ready to drop in to your application.
- [titus-kitchen-sink](https://github.com/nearform/titus/tree/master/packages/titus-kitchen-sink) - An implementation of the starter shell with detailed examples and documentation.
- [titus-kitchen-sink-backend](https://github.com/nearform/titus/tree/master/packages/titus-kitchen-sink-backend) - An implementation of the back-end starter shell.
- [titus-cli](https://github.com/nearform/titus/tree/master/packages/titus-cli) - A command line interface (CLI) to perform common tasks such as installing the starter shells.



## Ethos & Goals

The aim of Titus is to give projects a faster 'time to first feature' by providing a core set of technologies, frameworks and techniques which aid in modern web application development.

## Getting Started

The quickest way to get started with Titus is to use the CLI to create a starter frontend and backend application.

You can do this by running:

```
npx @nearform/titus-cli starter <project-name>
```

This command will generate frontend and backend starter applications.

For further information on the Titus CLI either run `npx @nearform/titus-cli --help` or take a look at the [titus-cli readme](https://github.com/nearform/titus/blob/master/packages/titus-cli/README.md).

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

### Convenience Scripts

Some commands have been added to the root package for convenience.

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| postinstall        | runs 'lerna bootstrap' post install |
| build:component    | build the components project        |
| start:kitchen-sink | starts the kitchen sink app         |

### Infrastructure documentation

Info about how the Titus demo app (kitchen-sink) is deployed can be found here: https://github.com/nearform/titus/blob/master/kubernetes/README.md
