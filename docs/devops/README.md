# DevOps
Deployment for Titus is a fully featured, modern, production grade experience. There are a number of ways to look at Titus' deployment tooling. For simplicity the pipeline can be broken it down into two types of deployment, Infrastructure, which is handled via [Noise](https://nearform.github.io/noise/#/) and [Terraform](https://www.terraform.io/) and Services, which is handled by helm.

![titus-infrastructure-pipeline](../img/titus-pipeline.svg)

To keep concerns separated Titus (this repo) is deployed to AWS, using CircleCI. It's infrastructure configuration is in a repo named `titus-infra-aws` and it's service configuration is in `titus-deploy`.

## Setting up Infrastructure
Titus runs on [Kubernetes](https://kubernetes.io/) and can be deployed to [Azure](https://azure.microsoft.com), [AWS](). Low level infrastructure is managed by [Terraform](https://www.terraform.io/), with service level infrastructure managed by [Kubernetes](https://kubernetes.io/).

Titus makes use of [Noise](https://nearform.github.io/noise/#/) which is a Terraform plugin that that understands how to set up Kubernetes and deploy different types of infrastructure and service with ease. We wrap __Noise__ in a configuration repo, __titus-infra-*__ (where the providers name is appended to the name), which includes:

- A configured Noise plugin via a `main.tf` file
- Any additional terraform or other scripts custom to the deployment

The exact nature of how to set up infrastructure varies from provider to provider, so is broken down into provider specific guides below. Note, you will need to be proficient with your chosen provider, and Terraform, the guides below are not suitable to learn either:

## Setting up CI Deployment
Services are deployed using [CircleCI](https://circleci.com) which runs [Helm](https://helm.sh/) to handle service updates to the running cluster.

### On AWS using CircleCI

To setup the titus deployment on an AWS environment making use of CircleCI there is several steps to run through and consider.
The current circleci config is setup to have the team work on branches that gets commited to a master and at a code freeze
the team would release tag the current master that also would be running in the dev environment. And that would trigger a propagation
of the dev image into the production / staging environment.


#### Howto setup the EKS environment.

__1.__ Make sure you have your management environment setup in accordance to the Noise documnentation. See: [Setup Local management env](https://nearform.github.io/noise/#/setup-local/)

__2.__ Clone [titus-infra-aws](https://github.com/nearform/titus-infra-aws) to a new folder

__3.__ Clone [Noise](https://github.com/nearform/noise) to a new folder either inside of titus-infra-aws or you would need to symlink the two projects together as titus-infra-aws makes use of Noise as a module.

__4.__ Create an S3 bucket in accordance to Noise instructions found here: [Create an S3 bucket for terraform state](https://nearform.github.io/noise/#/providers/aws/).
You dont need to run terraform steps from the Noise instructions.

__5.__ Go into the titus-infra-aws folder and edit the main.tf file.

__Change values:__

* Set appropriate region in provider.
* Set appropriate aws_region in module.
* Set provider profile to the same profile as your local environment.
* Set appropriate project name
* Terraform -> Backend -> Bucket : To the name of the bucket you created above.
* If you want to also change the name on the backend bucket defined in the last lines of the main.tf file.

__6.__ Now run the command `terraform plan` and with some luck you have no errors and a report of 90+ resources creaated.

__7.__ Run the command: `terraform apply` - type yes when asked and sit back.

## Setting up CI Deployment
Services are deployed using [CircleCI]() which runs [Helm]() to handle service updates to the running cluster.

### On AWS using CircleCI

To setup the titus deployment on an AWS environment making use of CircleCI there is several steps to run through and consider.
The current circleci config is setup to have the team work on branches that gets commited to a master and at a code freeze
the team would release tag the current master that also would be running in the dev environment. And that would trigger a propagation
of the dev image into the production / staging environment.

#### CirclecI

__1.__ Add your project thru the UI of circleci by searching the project under `Add projects`
It will add a deployment key for you repository and setup the necessary hooks.
Make sure you have admin access to the repository todo this.

__2.__ Under environment variables add this:
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - AWS_DEFAULT_REGION
    - S3_BUCKET
These values should have been used during the standup of the Noise environment that support Titus.

__3.__ Make sure you .circleci/config.yaml is updated with the necessary container repository value (AWS ECR id value)
This value is defined as `DOCKER_REPO` in the config file and should reflect the value of the ECR repo from AWS Console

__4.__ Control that the docker container name is set correctly for frontend and backend images.

__5.__ Note the build will fail because its missing deployment in the cluster. That is fine, because that means you now have an image so you can create the deployment.

#### Deploying secrets
__1.__ In your titus-deploy repository you will have a chart that is called helm-secrets.

__2.__ Read through the [README.md](https://github.com/nearform/titus-deploy/tree/master/titus-secrets) provided in the helm chart as it will explain the process
of creating and maintaing your secrets. And keep them a secret.

__3.__ Install the secrets helm chart.

#### First deploy

__1.__ Goto AWS ECR and get the image names for your just newly built images that failed to deploy and run this command

__2.__ Go into the titus-deploy folder.

__3.__ Run these commands:

```sh
helm upgrade --install titus-prod titus-starter-kit  -f titus-starter-kit/values.prod.yaml \
--set docker.images.frontend=<replace me with docker image> \
--set docker.images.backend=<replace me with docker image>

helm upgrade --install titus-dev titus-starter-kit  -f titus-starter-kit/values.dev.yaml \
--set docker.images.frontend=<replace me with docker image> \
--set docker.images.backend=<replace me with docker image>
```
___Note:___ This will deploy same image to both prod and dev environment. If you wanted to add more environments you create another line and add necessary sections to circleci configuration.

### On Azure
Azure documentation will follow once we have an Azure pipelines file in place.

### Infrastructure


## Apps & Services
Titus includes a fully featured, production ready, CI Pipeline. Titus uses CircleCI as it's infrastructure of choice for continuous integration. The Titus CI Pipeline includes all of the steps needed to build assets, lint and test, as well as pushing containers and deployment proper.

![titus-ci-pipeline](../img/titus-ci-pipeline.svg)

- For more detail see our [CI Pipeline Guide](devops/ci-pipeline.md).

### Guides

- Adding a new service or app helm chart

[CircleCI]: /

<!-- Images -->
[titu__s-devops-quote]: ../img/titus-devops-quote.svg
