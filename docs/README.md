# ![logo]

Develop and deploy your solutions quickly using Titus, an application development and deployment stack. Titus is production ready and can be deployed to all major cloud providers.

# Titus Overview
Titus is an application development and deployment stack suitable for SaaS solutions. It provides a ready to deploy frontend, backend and database and includes infrastructure and service tooling for continuous integration and deployment.

Titus helps you create high quality software applications and documentation faster and more efficiently. It looks like this:

![titus-feature-overview]
Fig.1 Titus Feature Overview

We provide everything you need to start deploying features in a production ready, scalable manner.

## Developer Experience
Developer experience using Titus is first class. We want you as a developer to enjoy using Titus so much that it becomes your stack of choice.

Titus is well documented, includes modern tooling, for example, [Storybook], and has linting and testing as first-class citizens. Titus supports common-sense inclusions such as quality logging and Docker convenience commands for day-to-day building and working with the stack locally.

## No Compromise DevOps
To achieve a rock-solid but easy to configure base, we use [Terraform] in conjunction with [Kubernetes] (K8s) to deploy and manage infrastructure and service needs. We keep deployment configuration simple by using [Taurus], which wraps common Terraform configurations into an easy to use Terraform plugin. Taurus is used in a configuration repository that contains secrets, Helm charts, and so on.

![titus-pipeline]
Fig.2 Titus Pipeline

You can deploy the Titus repository to [AWS] via [CircleCI] and it can be configured with minimal changes to work with [Azure] via [Azure Pipelines]. [Google Cloud Platform][GCP]  support is not included in Taurus yet, but the stack can be deployed there, if you wish to add the infrastructure scripts to support it.

## Production Grade CI Pipeline
The primary goal of Titus is to enable you to build your new features straight away. We are passionate about this and therefore use a modern deployment pipeline to ensure you can deliver continuously:

![titus-ci-pipeline]
Fig.3 Titus CI Pipeline

## You Decide the Details
Perhaps the most important feature of Titus is its simplicity. There are no CSS decisions, no deviation from standard linting rules and no clever frontend framework to get tangled up with.

We understand these things vary from project to project, so we get out of your way and let you make those decisions. We just make sure you can build and deploy those decisions with ease.

# Explore Titus
The quickest way to get exploring is to view our Quick Start Guide. It covers forking, cloning and pulling Titus locally. It takes you through configuration and the local deployment to Docker. All you need installed are the latest stable versions of  [Docker], [Node], and [npm].

- Go to the [Quick Start Guide].


<!-- External Links -->
[Taurus]: https://nf-taurus.netlify.com
[CircleCI]: https://circleci.com/product/#features
[Storybook]: https://storybook.js.org/
[Terraform]: https://www.terraform.io/
[Kubernetes]:  https://kubernetes.io/
[Docker]: https://docs.docker.com/install/#supported-platforms
[Node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/get-npm
[AWS]: https://aws.amazon.com/
[Azure]: https://azure.microsoft.com
[Azure Pipelines]: https://azure.microsoft.com/en-us/services/devops/pipelines/
[GCP]: https://cloud.google.com/

<!-- Internal Links -->
[Quick Start Guide]: quick-start/

<!-- Images -->
[logo]: img/Accel_Logo_Titus.svg
[titus-feature-overview]: img/titus-feature-overview.svg
[titus-deployment-workflow]: img/titus-deployment-workflow.svg
[titus-ci-pipeline]: img/titus-ci-pipeline.svg
[titus-pipeline]: img/titus-pipeline.svg
