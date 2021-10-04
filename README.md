&nbsp;

[![Logo][logo-img]][docs]

&nbsp;

<h2 align="center"> 🚀 A rocket powered jet pack super charged starter kit. 🛠️</h2>
<p align="center"><em>From 0 to react front-end, fastify-backend, authentication, with tests, and cloud-ready in about an hour.</em></p>

---

&nbsp;

[![Lerna][lerna-badge]][lerna-link]

| Workflow Name     | Badge                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| Frontend CI       | [![frontend-ci][frontend-ci-badge]][frontend-ci]                        |
| Frontend Deploy   | [![deploy-frontend][deploy-frontend-badge]][deploy-frontend-link]       |
| Backend Deploy    | [![deploy-backend][deploy-backend-badge]][deploy-backend-link]          |
| DB Manager Deploy | [![deploy-db-manager][deploy-db-manager-badge]][deploy-db-manager-link] |
| Storybook Deploy  | [![deploy-storybook][deploy-storybook-badge]][deploy-storybook-link]    |

Titus is a production grade, end-to-end stack for modern web application development. It includes DevOps and authentication preconfigured. Titus is a reusable set of packages that deploys your application with minimum effort.

- To get the full picture, view our **[Documentation][docs]**

[lerna-link]: https://lernajs.io/
[lerna-badge]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[frontend-ci]: https://github.com/nearform/titus/actions?query=workflow%3A%22Frontend+CI%22
[frontend-ci-badge]: https://github.com/nearform/titus/workflows/Frontend%20CI/badge.svg
[deploy-frontend-link]: https://github.com/nearform/titus/actions?query=workflow%3A%22Deploy+titus-frontend+to+GCP%22
[deploy-frontend-badge]: https://github.com/nearform/titus/workflows/Deploy%20titus-frontend%20to%20GCP/badge.svg
[deploy-backend-link]: https://github.com/nearform/titus/actions?query=workflow%3A%22Deploy+titus-backend+to+GCP%22
[deploy-backend-badge]: https://github.com/nearform/titus/workflows/Deploy%20titus-backend%20to%20GCP/badge.svg
[deploy-db-manager-link]: https://github.com/nearform/titus/actions?query=workflow%3A%22Deploy+titus-db-manager+to+GCP%22
[deploy-db-manager-badge]: https://github.com/nearform/titus/workflows/Deploy%20titus-db-manager%20to%20GCP/badge.svg
[deploy-storybook-link]: https://github.com/nearform/titus/actions?query=workflow%3A%22Deploy+storybook+to+GCP%22
[deploy-storybook-badge]: https://github.com/nearform/titus/workflows/Deploy%20storybook%20to%20GCP/badge.svg
[logo-img]: docs/img/Accel_Logo_Titus.svg
[docs]: https://nf-titus.netlify.com/#/

## Before you start

before you start using, you should decide whether to use typescript or plain javascript on the backend and remove the other package. Without this lerna commands might fail-for example running `start:all` will fail because you will have two processes listening on the same port.
