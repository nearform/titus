# Titus

Welcome to project Titus, an advanced opinionated starter shell stack. This repo includes the following packages:

- titus-starter - The starter shell
- titus-components - A collection of pre-built components
- titus-kitchen-sink - An implementation of the starter shell with examples and documentation

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

Install dependencies for all packages using

```
npm install
```

This will install root package dependencies, including lerna, which will then install all sub package dependencies and link cross-dependencies.

React sub-packages automatically run their respective build step as part of this process.

## Convenience Scripts

Some commands have been added to the root package for convenience

| Command            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| build:all          | rebuilds all sub-packages                                      |
| clean              | cleans all sub-package dependencies                            |
| clean:all          | cleans all root & sub-package dependencies                     |
| commit-check       | performs pre-commit checks for contributors                    |
| lint               | performs lint check across sub-packages                        |
| lint:fix           | fixes lint issues across sub-packages                          |
| reinstall          | cleans all root & sub-package dependencies and reinstalls them |
| start:kitchen-sink | starts the kitchen sink app on http://localhost:3000/          |
