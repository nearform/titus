# DevOps

## Overview
Deployment for Titus is a fully featured, modern, production grade experience handled by [GitHub Actions] by default.

## Deploy Titus
### Deploy Titus on GCP
An example deployment of Titus to [GCP] is provided. For simplicity, we use a CD pipeline workflow which follows master branch changes and does an automatic deployment. There is a working examples of a CD pipeline in the `.github/workflows` folder.

### Deploy Titus on AWS with Terraform
An example deployment of Titus to [AWS] is provided. The deployment is done using Terraform. A full description of the deployment process can be find in the [infra/aws] folder.

### Deploy Titus on AWS with Mira
An example deployment of Titus to [AWS] is provided. The deployment is done using [Mira] and [Cdk]. A full description of the deployment process can be find in the [titus-infra-aws-mira] package.

**Note:** CD workflow pipelines are expected to be adjusted or completely changed to fulfill project needs.


[GCP]: https://console.cloud.google.com
[AWS]: https://aws.amazon.com/
[Mira]: https://nf-mira.netlify.app
[Cdk]: https://aws.amazon.com/cdk/
[titus-infra-aws-mira]: https://github.com/nearform/titus/tree/master/packages/titus-infra-aws-mira
[infra/aws]: https://github.com/nearform/titus/tree/aws_update/docs/devops/aws/terraform
[GitHub Actions]: https://github.com/features/actions
