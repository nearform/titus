# Titus

Welcome to project Titus, an advanced opinionated starter shell stack. This repo includes the following packages:

- titus-starter - The starter shell
- titus-components - A collection of pre-built components
- titus-kitchen-sink - An implementation of the starter shell with examples and documentation
- titus-cli - A command line interface to perform common tasks (eg cloning starter shell)

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

### TODO

- GraphQL
- Wizard
- Table (implementing Jimmy's work)
- nearform audit trail service
- nearform react table
- nearform comments service
- nearform authorization (udaru)
- CI

## Installation

### Lerna

The monorepo is setup using lerna, so you'll first need to install it as a global dependency

```
npm install --global lerna
or
yarn global add lerna
```

### Bootstrap

To install dependencies for all packages, and link any cross-dependencies, we need to bootstrap them.

```
lerna bootstrap
```
