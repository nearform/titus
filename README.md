# Titus

Welcome to project Titus, an advanced opinionated starter shell stack. This repo includes the following packages:

- titus-starter - The clientside starter shell
- titus-components - A collection of pre-built components
- titus-kitchen-sink - An implementation of the starter shell with examples and documentation
- titus-cli - A command line interface to perform common tasks (eg cloning starter shell)
- titus-backend - The serverside starter shell

## Framework

The project is very much a work in progress. Below is a list of what is included and what is on the roadmap.

The project currently includes:

- [Material-UI](https://material-ui.com/)
- [Reach Router](https://reach.tech/router)
- [Storybook](https://storybook.js.org/)
- [Redux](https://redux.js.org/)
  - [Redux Thunk](https://github.com/reduxjs/redux-thunk)
  - [Reselect](https://github.com/reduxjs/reselect)
- [Victory](https://formidable.com/open-source/victory/docs/)
- [CircleCI](https://circleci.com/)
- [@nearform/react-table](https://github.com/nearform/react-table)

### TODO

- GraphQL
- nearform audit trail service
- nearform comments service
- nearform authorization (udaru)


## Installation

Install dependencies for all packages using

```
npm install
```

This will install root package dependencies, including lerna, which will then install all sub package dependencies and link cross-dependencies.

Alternatively, if you have lerna installed globally, run

```
lerna bootstrap
```

Individual sub-packages are built during the bootstrap process

## Convenience Scripts

Some commands have been added to the root package for convenience.

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| postinstall        | runs 'lerna bootstrap' post install |
| build:component    | build the components project        |
| start:kitchen-sink | starts the kitchen sink app         |
