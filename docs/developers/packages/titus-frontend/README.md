# Titus Frontend

A [React] application with routing and minimalist login components.

# Features

* React application with [Create React App][CRA]
* Route managment with [react-router]
* Login component (with optional Auth0 support)
* Tested with [Jest] and [Enzyme]
* Code linter is [ESLint]
* Code formatted is [Prettier] with [Standard] preset


# Introduction

Titus-frontend is lightweight on purpose.

What you'll implement with it is your own business, and we're providing you an unopiniated, working shell.
We only provide what we think is common in our projects.

There's room for you to add, customize or even replace parts and bits.

## Organization

* `build/` - your bundled application for production usage
* `public/` - static assets: index.html, icons, images
* `src/index.js` - main entry points, loads your React application and service worker
* `src/app.js` - your application, loads styles and routes (powered by [react-router])
* `src/serviceWorker.js` - service worker (from [CRA]), turn your application to a Progressive Web Application
* `src/components/` - a set of components to implement a login form, an authentication context and various authentication providers
* `src/page/` - a set of page components asynchronously loaded when declaring routes
* `lighthouse/` - runs Google's [Lighthouse] to evaluate your application performance and accessibility

## In-memory Authentication Provider

By default titus-frontend does not use a "real" authentication provider.
`src/components/auth-provider/in-memory/` allows almost any combination of username/password, and there's no server roundtrip.

Once logged in a token is stored in local storage, and it grants access to the protected dashboard.

## Titus-backend Provider

If you have an Auth0 application configured, you can use titus backend login endpoint to authenticate users.
In this situation:
- users provides valid Auth0 credentials
- they are send to titus-backend
- titus-backend validate them against Auth0
- when successfull, titus-backent return authentication data to th provider
- the provider get the details, store them in local storage, and grant access to dashboard

To enabled it, you'll have to:
1. provide Auth0 details in **titus-backend**'s `.env` file (`AUTH0_*` variables)
1. change the provider used in `src/app.js`:
   ```js
   // import Authentication, { Login } from './components/auth-providers/in-memory'
   import Authentication, { Login } from './components/auth-providers/titus-backend'
   ```

## Auth0 Provider

If you have an Auth0 application configured, you can use [Auth0 Universal Login][auth0-login].
In this situation:
- users click on titus "Login Through Auth0" button
- they are redirected to Auth0 login page
- they provide their credentials
- they are redirected titus login page, with authentication data in the url
- the provider get the details, store them in local storage, and grant access to dashboard

To enabled it, you'll have to:
1. provide Auth0 details in **titus-frontend**'s `.env` file (`REACT_APP_AUTH0_*` variables)
1. in Auth0 configuration, make sure the `/login` route is allowed in both _Allowed Callback URLs_ and _Allowed Logout URLs_ lists.
1. change the provider used in `src/app.js`:
   ```js
   // import Authentication, { Login } from './components/auth-providers/in-memory'
   import Authentication, { Login } from './components/auth-providers/auth0'
   ```

# Installation

```
npm install
```

But it was covered when you ran `npm install` at root level ;)


# Running locally

1. Edit your configuration:
  ```
  npm run create:env
  ```

  This will create a `.env` file inside the root directory, from the `.env.sample` file.
  These are your configuration values.

1. Start the dev server
  ```
  npm start
  ```

  Starts your application with [Webpack DevServer][webpack-dev-server] (provides hot-reloading on code changes).

  Open a browser and then navigate to `localhost:3000`


# Testing and Linting

* `npm test` - run all the tests with code coverage (it's the command CI is using).
* `npm run test:watch` - starts Jest in watch mode: it'll run tests against the modified files (since last commit), and will automatically run them again on code change.
* `npm run lint` - apply ESLint / Prettier on sources
* `npm run lint:fix` - uses ESLint / Prettier (with autofix flag)
* `npm run lighthouse` - runs [Lighthouse] locally with local Chrome and produces a report: `lighthouse-report.html`
* `npm run lighthouse` - runs [Lighthouse] locally with local Chrome and produces a report: `lighthouse-report.html`
* `npm run storybook` - starts [Storybook] locally so you try out your components: browse to http://localhost:9009
* `npm run storybook:build` - make a static version of all your stories in `storybook-static/` folder


# Build for production

The application runs locally with on-the-fly transpilation and hot reloading.
But in production, your application will be bundled and optimized, so you could host it as static files.

To package the application, use:
```
npm run build
```
which will produce a new bundle in `build/` folder.



[React]: https://reactjs.org
[CRA]: https://facebook.github.io/create-react-app
[react-router]: https://reacttraining.com/react-router/web
[yup]: https://github.com/jquense/yup#readme
[Jest]: https://jestjs.io
[Enzyme]: https://airbnb.io/enzyme
[ESLint]: https://eslint.org
[Prettier]: https://prettier.io
[Standard]: https://standardjs.com/
[Auth0]: https://auth0.com
[Lighthouse]: https://developers.google.com/web/tools/lighthouse
[Storybook]: https://storybook.js.org
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server
[auth0-login]: https://auth0.com/docs/universal-login