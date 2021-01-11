# Titus Frontend Package

## Quick Start

The following commands are used to quick start the Titus frontend package:
```
cd packages/titus-frontend
npm install
npm run start || npm run storybook
```
## Overview
Titus frontend is a [React] application with routing and minimalist login components. This section describes Titus frontend and how to install, configure, run, test and build your frontend application.

What you implement with Titus frontend is your choice; we provide you with an unopinionated working shell.
We provide what is common in our projects.

There is scope for you to add, customise or even replace features.

### Organisation
Titus frontend is structured as follows:

* `build/` - your bundled application for production use.
* `src/index.js` - main entry points and loads your React application and service worker.
* `src/app.js` - your application root, load application wide providers here.
* `src/router.js` - application routing powered by [react-router].
* `src/serviceWorker.js` - service worker (from [CRA]) that turns your application into a Progressive Web Application.
* `src/components/` - a set of components to implement a login form, an authentication context and various authentication providers.
* `src/page/` - a set of page components asynchronously loaded when declaring routes.
* `public/` - static assets, including index.html, icons and images.

## Configure Authentication
Titus supports a variety of authentication providers. By default, it fallbacks to an 'in-memory' provider. This makes no server requests.

To define which authentication provider is active, set the `REACT_APP_AUTH_PROVIDER` variable in `.env`. The keys for each provider are listed below.

### In-memory Authentication Provider
#### `key: MEM`

By default, `titus-frontend` does not use a real authentication provider.
`src/components/auth-provider/in-memory/` allows almost any combination of username and password, and there's no server roundtrip.

Once logged in, a token is stored in the local storage and it grants access to the protected UI.

### Titus-backend Provider
#### `key: TITUS`
If you have an Auth0 application configured, you can use the `titus-backend` login endpoint to authenticate users.
In this case, authentication is performed as follows:
- Provide your valid Auth0 credentials. The credentials are passed to `titus-backend`.
- `titus-backend` validates them against Auth0 and returns authentication data to the provider.
- The provider stores the details in local storage and grants access to dashboard.

To enable it, do the following:
1. Provide Auth0 details in the **`titus-backend`** `.env` file (`AUTH0_*` variables).
1. Set `REACT_APP_AUTH_PROVIDER` to `TITUS` in the **`titus-frontend`** `.env` file.

### Auth0 Provider
#### `key: AUTH0`

If you have an Auth0 application configured, you can use [Auth0 Universal Login][auth0-login].
In this situation:
- Click on the **Login Through Auth0** button. You are redirected to Auth0 login page.
- Provide your credentials. You are redirected Titus login page, with authentication data in the URL.
- The provider stores the details in local storage and grants access to the dashboard.

To enable it, do the following:
1. Provide Auth0 details in the **`titus-frontend`** `.env` file (`REACT_APP_AUTH0_*` variables).
1. In Auth0 configuration, make sure the app login route (for example, `http://localhost:3000/login`) is allowed in both _Allowed Callback URLs_ and _Allowed Logout URLs_ lists.
1. Set `REACT_APP_AUTH_PROVIDER` to `AUTH0` in the **`titus-frontend`** `.env` file.

### AWS Amplify Provider
#### `key: AWS`
If you have a user and identity pools configured in AWS Cognito, you can use [AWS Amplify Authentication][aws-amplify-authentication].
In this case, the entered username and password are validated against the specified user pool.

To enable it, do the following:
1. Provide AWS details in the **`titus-frontend`** `.env` file (`REACT_APP_AWS_*` variables).
1. Set `REACT_APP_AUTH_PROVIDER` to `AWS` in the **`titus-frontend`** `.env` file.

### Azure Active Directory Provider
#### `key: AD`
This redirects the user to the specified Azure Active Directory tenant to login. It then redirects the user back to the React app which confirms authentication via the local storage values Azure stores in the web browser.

To enable it, do the following:
1. Provide Azure AD details in the **`titus-frontend`** `.env` file (`REACT_APP_AD_*` variables).
1. Set `REACT_APP_AUTH_PROVIDER` to `AD` in the **`titus-frontend`** `.env` file.
3. Change the `render` method in `src/index.js` to the commented out replacement that wraps it in `runWithAdal`.


## Authorization example
_Authentication_ (above) allows your app to verify the identity of your users, while _Authorization_ allows you to manage which resources in your app a user can access.  **`titus-frontend`** provides a an example authz request in `src/components/authz-check` that requests a privileged resource from the backend. 

Refer to **`titus-backend`** [Configure Authorization] where policies specific to your application. 

## Install the Frontend
To install Titus frontend, run the following command:

```
npm install
```

**Note:** The Titus frontend is automatically installed if you previously ran `npm install` at root level.

## Developer Workflow
Unless you are integrating with an API, you _should_ be able to develop the frontend in isolation.
This decouples the frontend from the backend.

- Develop visual components for the application "Storybook-first".
- This promotes a better structure for testing the UI in isolation.
- For integration, create page container components that handle passing logic to visuals.

## Development with Storybook
To develop the UI, run Storybook as follows:
```
npm run storybook
```

### Component Story Format(CSF)
Titus uses a version of Storybook(5.3) that supports [CSF](https://storybook.js.org/docs/formats/component-story-format/). We recommend you write your stories this way.

### Component Docs
Titus uses [`@storybook/addon-docs`](https://www.npmjs.com/package/@storybook/addon-docs) for MDX-powered documentation. This embeds documentation with stories. However, to keep DRY, we write stories in JavaScript and then reference them within an MDX documentation file.

Consider the example below, where `loading.story.js` contains the following:
```
import docs from './loading.mdx'
export default {
  title: 'Loader',
  decorators: [story => <Layout>{story()}</Layout>],
  parameters: {
    docs: {
      page: docs
    }
  }
}
export const Default = () => <Loader/>
```

And our documents look like this:

```
## Loader

Loader component for project.

<Preview>
  <Story id='loader--default'/>
</Preview>
```
The `Preview` and `Story` components are provided by the addon. We pass the `id` of the story to the `Story` component to show it. This makes visual regression testing easy. Alternatively, we could import the component and put that within a story too. 

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

| Command | Description |
| ---- | -------|
| `npm test` | Run all the tests with code coverage (it's the command CI is using).|
|`npm run test:watch` | Start Jest in watch mode: run tests against the modified files (since last commit), and automatically runs them again if you change the code.|
| `npm run lint` | Apply ESLint / Prettier on sources.|
| `npm run lint:fix` | Use ESLint / Prettier (with autofix flag).|
| `npm run storybook` | Start [Storybook] locally so you can try out your components: browse http://localhost:9009.|
| `npm run storybook:build` | Make a static version of all your stories in the `storybook-static/` folder.|

### Unit testing

We use Jest for unit testing. These use the `packages/titus-frontend/src/setupTests.js` for setup. Some examples can be found in `packages/titus-frontend/src/components/auth-providers` 

### Integration testing

We using React Testing Library to test for integration testing. These use the `packages/titus-frontend/src/test-utils.js` for setup and to provide helpers for i18n, auth and routing.

## Build the Application

The application runs locally with transpilation and hot reloading.
In production, your application is bundled and optimised, so you can host it as static files.

To package the application, use the following command:
```
npm run build
```
This command produces a new bundle in `build/` folder.



<!-- Internal Links -->
[Configure Authorization]: developers/packages/titus-backend/?id=configure-authorization


[auth0-login]: https://auth0.com/docs/universal-login
[Auth0]: https://auth0.com
[aws-amplify-authentication]: https://aws-amplify.github.io/docs/js/authentication
[CRA]: https://facebook.github.io/create-react-app
[Enzyme]: https://airbnb.io/enzyme
[ESLint]: https://eslint.org
[Jest]: https://jestjs.io
[Lighthouse]: https://developers.google.com/web/tools/lighthouse
[material-ui]: https://material-ui.com/getting-started/installation/
[Prettier]: https://prettier.io
[react-router]: https://reacttraining.com/react-router/web
[React]: https://reactjs.org
[Standard]: https://standardjs.com/
[Storybook]: https://storybook.js.org
[yup]: https://github.com/jquense/yup#readme