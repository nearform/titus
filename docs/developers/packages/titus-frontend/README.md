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
* `public/` - static assets, including index.html, icons and images.
* `src/index.js` - main entry points and loads your React application and service worker.
* `src/app.js` - your application root, load application wide providers here.
* `src/router.js` - application routing powered by [react-router].
* `src/serviceWorker.js` - service worker (from [CRA]) that turns your application into a Progressive Web Application.
* `src/components/` - a set of components to implement a login form, an authentication context and various authentication providers.
* `src/page/` - a set of page components asynchronously loaded when declaring routes.
* `lighthouse/` - runs Google's [Lighthouse] to evaluate your application performance and accessibility.

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
Titus uses a version of Storybook(5.2) that supports [CSF](https://storybook.js.org/docs/formats/component-story-format/). We recommend you write your stories this way.

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

### Visually Test Components
We use [`@storybook/addon-storyshots`](https://www.npmjs.com/package/@storybook/addon-storyshots) to visually test UI components. It is handled for you out of the box. StoryShots generates a screenshot for every component story. You don't need to write these tests. StoryShots works out what screenshots it needs.

If StoryShot finds visual differences above a defined threshold, the test fails. A local file shows the visual differences where potential regressions may have crept in.

You can create initial screenshots by running tests with the `update` flag using `npm run test -- -u`. **Note:** Be aware this makes all tests pass.

### Behavioural Test Components
We use [`@storybook/addon-storyshots-puppeteer`](https://www.npmjs.com/package/@storybook/addon-storyshots-puppeteer) to test component behaviour. For example, "If I click this, does this happen?". It is similar to how we visually test components, but with the addition of the Puppeteer API. This enables us to do things like, take a screenshot, click a button and take another screenshot. We are alerted of any visual differences where things might not have worked as expected.

Below is a test to check validation messages appear if logging in without credentials:
```
export const Default = () => <LoginForm />
Default.story = {
  parameters: {
    // Can attach these tests to all the stories
    // via the default export.
    async puppeteerTest(page) {
      // Default Login Form
      const image = await page.screenshot()
      expect(image).toMatchImageSnapshot()
      // Grab the submit button and hit it
      const button = await page.$('[type="submit"]')
      button.click()
      // Snapshot that a required message should show
      const requiredFields = await page.screenshot()
      expect(requiredFields).toMatchImageSnapshot()
    }
  }
}
```

### Test Locally
The CI test procedure builds a static Storybook to run tests against. This dramatically slows your progress if you are working on frontend components. To mitigate this, you can run tests against the locally running Storybook as you develop. Use `npm run test:local`.

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
| `npm run lighthouse` | Run [Lighthouse] locally with local Chrome and produce a report: `lighthouse-report.html`.|
| `npm run storybook` | Start [Storybook] locally so you can try out your components: browse http://localhost:9009.|
| `npm run storybook:build` | Make a static version of all your stories in the `storybook-static/` folder.|


## Build the Application

The application runs locally with transpilation and hot reloading.
In production, your application is bundled and optimised, so you can host it as static files.

To package the application, use the following command:
```
npm run build
```
This command produces a new bundle in `build/` folder.


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
