# Titus Kitchen Sink

A reference Titus application providing a variety of examples.

## Installation

```
npm install
```

## Running Locally

```
npm start
```

Open a browser and then navigate to `localhost:3000`

## Storybook

```
npm run storybook
```

Open a browser and then navigate to `localhost:9009`

## Using the backend graphql api

To make the `API CRUD Example` work, it's calling the backend api, you need to spin up the backend environment

```
cd ../titus-backend && npm run docker:dev:start
```
