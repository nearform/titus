# DevOps

## Overview
Deployment for Titus is a fully featured, modern, production grade experience handled by [GitHub Actions]

## Deploy Titus
An example deployment of Titus to [GCP] is provided. For simplicity, we use a CD pipeline workflow which follows master branch changes and does an automatic deployment. There is a working examples of a CD pipeline in the `.github/workflows` folder.

**Note:** CD workflow pipelines are expected to be adjusted or completely changed to fulfill project needs.

## Lint, Test and Build
Titus includes a fully featured, production-ready CI pipeline. Titus uses GitHub Actions as for continuous integration. The Titus CI pipeline includes all of the steps needed to lint, test and build assets.

[GCP]: https://console.cloud.google.com
[GitHub Actions]: https://github.com/features/actions