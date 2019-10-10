# Titus Frontend Kit
## Overview
Titus frontend is a [React] application with routing and minimalist login components. This section describes Titus frontend and how to install, configure, run, test and build your frontend application. 

What you implement with Titus frontend is your choice, we provide you with an unopinionated working shell.
We provide what is common in our projects.

There is scope for you to add, customise or even replace features.

### Organisation
Titus frontend is structured as follows:

* `build/` - your bundled application for production use
* `public/` - static assets, including: index.html, icons and images
* `src/index.js` - main entry points and loads your React application and service worker
* `src/app.js` - your application, load styles and routes (powered by [react-router])
* `src/serviceWorker.js` - service worker (from [CRA]) that turns your application into a Progressive Web Application
* `src/components/` - a set of components to implement a login form, an authentication context and various authentication providers
* `src/page/` - a set of page components asynchronously loaded when declaring routes
* `lighthouse/` - runs Google's [Lighthouse] to evaluate your application performance and accessibility

## Configure Authentication
### In-memory Authentication Provider

By default, titus-frontend does not use a real authentication provider.
`src/components/auth-provider/in-memory/` allows almost any combination of username and password, and there's no server roundtrip.

Once logged in, a token is stored in the local storage, and it grants access to the protected dashboard.

### Titus-backend Provider

If you have an Auth0 application configured, you can use the titus-backend login endpoint to authenticate users.
In this case, authentication is performed as follows:
- provide your valid Auth0 credentials
- the credentials are passed to titus-backend
- titus-backend validates them against Auth0
- when successful, titus-backend returns authentication data to the provider
- provider stores the details in local storage, and grants access to dashboard

To enable it, do the following:
1. Provide Auth0 details in the **titus-backend** `.env` file (`AUTH0_*` variables)
1. Update the provider variable used in the file `src/app.js`, as follows:
   ```js
   // import Authentication, { Login } from './components/auth-providers/in-memory'
   import Authentication, { Login } from './components/auth-providers/titus-backend'
   ```

### Auth0 Provider

If you have an Auth0 application configured, you can use [Auth0 Universal Login][auth0-login].
In this situation:
- click on the **Login Through Auth0** button
- you are redirected to Auth0 login page
- provide your credentials
- you are redirected Titus login page, with authentication data in the URL
- the provider stores the details in local storage and grants access to dashboard

To enable it, do the following:
1. Provide Auth0 details in the **titus-frontend** `.env` file (`REACT_APP_AUTH0_*` variables)
1. In Auth0 configuration, make sure the `/login` route is allowed in both _Allowed Callback URLs_ and _Allowed Logout URLs_ lists.
1. Change the provider variable in the file `src/app.js`, as follows:
   ```js
   // import Authentication, { Login } from './components/auth-providers/in-memory'
   import Authentication, { Login } from './components/auth-providers/auth0'
   ```
   
### AWS Amplify Provider

If you have a user and identity pools configured in AWS Cognito, you can use [AWS Amplify Authentication][aws-amplify-authentication].
In this case, the entered username and password is validated against the specified user pool.

To enable it, do the following:
1. Provide AWS details in the **titus-frontend** `.env` file (`REACT_APP_AWS_*` variables)
1. Change the provider variable in the file `src/app.js`, as follows:
  ```js
  // import Authentication, { Login } from './components/auth-providers/in-memory'
  import Authentication, { Login } from './components/auth-providers/aws-amplify'
  ```

## Install the Frontend
To install Titus frontend, run the following command:

```
npm install
```

**Note:** The Titus frontend is automatically installed if you previously ran `npm install` at root level.

## Run the Frontend Locally
To run your application locally, perform the following steps:

1. Edit your configuration as follows:
  ```
  npm run create:env
  ```

  This creates a `.env` file inside the root directory, based on the `.env.sample` file.
  These are your configuration values.

1. Start the dev server
  ```
  npm start
  ```

  Start your application with [Webpack DevServer][webpack-dev-server] (this provides hot reloading on code changes).

  Open a browser and navigate to `localhost:3000`.


## Test and Lint the Frontend
The following commands can be used to test and lint your application:

* `npm test` - run all the tests with code coverage (it's the command CI is using).
* `npm run test:watch` - start Jest in watch mode: run tests against the modified files (since last commit), and automatically runs them again if you change the code.
* `npm run lint` - apply ESLint / Prettier on sources
* `npm run lint:fix` - use ESLint / Prettier (with autofix flag)
* `npm run lighthouse` - run [Lighthouse] locally with local Chrome and produce a report: `lighthouse-report.html`
* `npm run storybook` - start [Storybook] locally so you can try out your components: browse http://localhost:9009
* `npm run storybook:build` - make a static version of all your stories in the `storybook-static/` folder


## Build the Application

The application runs locally with transpilation and hot reloading.
But in production, your application is bundled and optimised, so you can host it as static files.

To package the application, use the following command:
```
npm run build
```
This command produces a new bundle in `build/` folder.


## Add Material UI

Google provides a Material React package, so you can easily import their UI elements as components and use them to build up the front-end interface:
```
npm install @material-ui/core --save
```
For example:
```
import Button from '@material-ui/core/Button'

const MyComponent = ({ handleClick }) => (
  <Button variant='contained' onClick={handleClick}>
    Hello World
  </Button>
)
```
For more information, please [read the Material UI documentation](material-ui).


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
[aws-amplify-authentication]: https://aws-amplify.github.io/docs/js/authentication
[material-ui]: https://material-ui.com/getting-started/installation/
