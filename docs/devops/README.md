![titus-devops-quote][]

# DevOps
Deployment for Titus is a fully featured, modern, production grade experience. There are a number of ways to look at Titus' deployment tooling. For simplicity the pipeline can be broken it down into two types of deployment, Infrastructure, which is handled via [Noise]() and [Terraform]() and Services, which is handled by helm.

![titus-infrastructure-pipeline](../img/titus-pipeline.svg)

To keep concerns separated Titus (this repo) is deployed to AWS, using CircleCI. It's infrastructure configuration is in a repo named `titus-infra-aws` and it's service configuration is in `titus-deploy`.

## Setting up Infrastructure
Titus runs on [Kubernetes]() and can be deployed to [Azure](), [AWS](). Low level infrastructure is managed by [Terraform](), with service level infrastructure managed by [Kubernetes]().

Titus makes use of [Noise]() which is a Terraform plugin that that understands how to set up Kubernetes and deploy different types of infrastructure and service with ease. We wrap __Noise__ in a configuration repo, __titus-infra-*__ (where the providers name is appended to the name), which includes:

- A configured Noise plugin via a `main.tf` file
- Any additional terraform or other scripts custom to the deployment

The exact nature of how to set up infrastructure varies from provider to provider, so is broken down into provider specific guides below. Note, you will need to be proficient with your chosen provider, and Terraform, the guides below are not suitable to learn either:

### On AWS
To Do.

### On Azure
Azure documentation will follow once we have an Azure pipelines file in place.

## Setting up CI Deployment
Services are deployed using [CircleCI]() which runs [Helm]() to handle service updates to the running cluster.

### On AWS using CircleCI
To Do.

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
[titus-devops-quote]: ../img/titus-devops-quote.svg
