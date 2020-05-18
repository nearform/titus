# DevOps

## Overview
Deployment for Titus is a fully featured, modern, production grade experience. There are a number of ways to look at Titus' deployment tooling. The pipeline can be broken into two types of deployment:
* Infrastructure - handled by [Terraform]
* Services - handled by [GitHub Actions]

## Deploy Titus
You can deploy Titus to [GCP], [AWS] and [Azure] cloud providers. For simplicity, we use a CD pipeline workflow which follows master branch changes and does an automatic deployment. There are working examples of CD pipelines for all three cloud providers in the `.github/workflows` folder.

**Note:** CD workflow pipelines are expected to be adjusted or completely changed to fulfill project needs.

### GCP
Refer to [Deploy Titus on GCP](devops/gcp/) for more details.

### AWS
TBD

### Azure
TBD

## Lint, Test and Build
Titus includes a fully featured, production-ready CI pipeline. Titus uses GitHub Actions as for continuous integration. The Titus CI pipeline includes all of the steps needed to lint, test and build assets.

[Terraform]: https://www.terraform.io
[Azure]: https://azure.microsoft.com
[AWS]: https://aws.amazon.com
[GCP]: https://console.cloud.google.com
[GitHub Actions]: https://github.com/features/actions