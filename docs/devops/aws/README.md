# AWS Provider

To setup the titus deployment on an [AWS] environment making use of [CircleCI] there is several steps to run through and consider.

The current CircleCI config is setup to have the team work on branches that gets commited to a master and at a code freeze
the team would release tag the current master that also would be running in the dev environment.

And that would trigger a propagation of the dev image into the production / staging environment.


## Setup the EKS environment.

1. Once you have your AWS account, install AWS CLI and configure you AWS profile, [as explaind here][noise-aws-setup].

1. Make sure you have your management environment setup in accordance to the Noise documnentation. See: [Setup Local management env][noise-local-setup]

1. Clone [titus-infra-aws] to a new folder
   ```sh
   git clone git@github.com:nearform/titus-infra-aws.git
   ```

1. Clone [Noise] to a new folder either
   ```sh
   git clone git@github.com:nearform/noise.git
   ```

1. Add a symlink to noise inside titus-infra-aws
  ```sh
  cd titus-infra-aws
  ln -s ../noise
  ```

1. Create an S3 bucket in accordance to Noise instructions found here: [Create an S3 bucket for terraform state][noise-state-bucket].
  **You only need to create the bucket, don't run terraform steps**.

1. Edit the `titus-infra-aws/main.tf` file:
  ```yaml
  provider "aws" {
    region     = "eu-west-1" # Set appropriate region
    profile    = "noise"     # Set same name as your local environment
  }

  terraform {
    backend "s3" {
      bucket  = "titus-noise-terraform-state" # Change for the name of the bucket you created
      region  = "eu-west-1"                   # Set appropriate region
      ...
    }
  }

  module "noise" {
    aws_region = "eu-west-1"                  # Set appropriate region
    project_name = "titus-noise"              # Change according to your projct
    ...
  }

  resource "aws_s3_bucket" "b" {
    region = "eu-west-1"         # Set appropriate region 
    ...   
  }
  ```

1. Init terraform: run the command `terraform init`

1. Now run the command `terraform plan` and with some luck you have no errors and a report of 90+ resources created.

1. Run the command: `terraform apply` - type yes when asked and sit back.


## Customize your infrastructure

1. Fork [titus-deploy] repository on github, and clone it
   ```sh
   git clone git@github.com:your-name/titus-deploy.git
   ```

1. in `titus-starter-kit/values.dev.yaml` edit
  ```yaml
  env:
    name: "titus-dev"                  # Change according to your project
    host: "titus-preprod.nearform.com" # Provide a DNS host you manage and that has a CNAME in AWS Route53
    ...
  ``` 

1. perform similar changes in `titus-starter-kit/values.prod.yaml` for your production environement

1. Commit you changes and push them to your fork

1. Read through the [titus-secret/README.md](https://github.com/nearform/titus-deploy/tree/master/titus-secrets) provided in the helm chart as it will explain the process of creating and maintaing your secrets. And keep them a secret.

1. Install the secrets helm chart
  ```sh
  helm install titus-deploy/titus-secrets/helm-secrets
  ```


## Configure CirclecI

This assumes you've already forked [Titus] repository. CircleCI will access and deploy it.

1. On CircleCI UI, add your project by searching the project under `Add projects`.
  ![circle-add-project]
  It will add a deployment key for you repository and setup the necessary hooks.
  Make sure you have admin access to the repository todo this.

1. In order for CircleCI to access your titus-deploy fork, in CircleCI titus project settings:
  - go to `Permissions` > `Checkout SSH keys`
  - In `Add user key`, click on `Create and add user key` button
  - Authenticate with Github (if not already), and complete the operation

1. Under CircleCI project environment variables add:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_DEFAULT_REGION`: AWS region hosting the infrastructure
  - `S3_BUCKET`: name of the S3 bucket in `titus-infra-aws/main.tf`: `aws_s3_bucket.b.name`
  ![circle-env-variables]

1. In titus repo, update the values in `.circleci/config.yaml`:
  - `DOCKER_REPO`: in AWS console, ECR service, use the URI, ie: `123456789.dkr.ecr.eu-west-1.amazonaws.com`
  - `TITUS_DEPLOY_REPO`: add your titus-deploy fork: `git@github.com:your-name/titus-deploy.git`
  - `AWS_ECR_REGION`: AWS region hosting the infrastructure
  - `AWS_EKS_REGION`: AWS region hosting the infrastructure


#### First deploy

Just Commit your changes, push them, and let the magic be!


[CircleCI]: https://circleci.com
[Noise]: https://nearform.github.io/noise
[noise-aws-setup]: https://nearform.github.io/noise/#/setup-local/?id=for-aws
[noise-local-setup]: https://nearform.github.io/noise/#/setup-local/?id=install-dependencies
[noise-state-bucket]: https://nearform.github.io/noise/#/providers/aws/?id=create-an-s3-bucket-for-terraform-state
[titus-infra-aws]: https://github.com/nearform/titus-infra-aws
[titus-deploy]: https://github.com/nearform/titus-deploy
[Terraform]: https://www.terraform.io
[Azure]: https://azure.microsoft.com
[AWS]: https://aws.amazon.com
[Helm]: https://helm.sh
[Kubernetes]: https://kubernetes.io

[circle-add-project]: ../../img/circle-add-project.png
[circle-env-variables]: ../../img/circle-env-variables.png
