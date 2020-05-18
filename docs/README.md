# ![logo]

Develop and deploy your solutions quickly using Titus, an application development and deployment stack. Titus is production-ready and can be deployed to all major cloud providers.

# Titus Overview
Titus is an application development and deployment stack suitable for SaaS solutions. It provides a ready to deploy frontend, backend and database and includes infrastructure and service tooling for continuous integration and deployment.

Titus helps you create high quality software applications and documentation faster and more efficiently. It looks like this:

![titus-feature-overview]
Fig.1 Titus Feature Overview

We provide everything you need to start deploying features in a production-ready, scalable manner.

## Developer Experience
Developer experience using Titus is first class. We want you as a developer to enjoy using Titus so much that it becomes your stack of choice.

Titus is well documented, includes modern tooling, for example, [Storybook], and has linting and testing as first-class citizens. Titus supports common-sense inclusions such as quality logging and Docker convenience commands for day-to-day building and working with the stack locally.

## No Compromise DevOps
Titus comes with a full set of scripted functionality for continuous integration and deployment. This allows you to decide which CI/CD server to use on a case by case basis. By default, Titus makes use of GitHub Actions as its Continuous Integration and Deployment server. Google Cloud Platform (GCP) is the default cloud provider.

<!---to-do --->
<!---Fig.2 Titus Pipeline -->

## Production Grade CI Pipeline
The primary goal of Titus is to enable you to build your new features straight away. We are passionate about this and therefore use a modern deployment pipeline to ensure you can deliver continuously:

![titus-ci-pipeline]
Fig.2 Titus CI Pipeline

## You Decide the Details
Perhaps the most important feature of Titus is its simplicity. There are no CSS decisions, no deviation from standard linting rules and no clever frontend framework to get tangled up with.

We understand these things vary from project to project, so we get out of your way and let you make those decisions. We just make sure you can build and deploy those decisions with ease.

# Explore Titus
The quickest way to get exploring is to view our Quick Start Guide. It covers forking, cloning and pulling Titus locally. It takes you through configuration and the local deployment to Docker. All you need installed are the latest stable versions of  [Docker], [Node], and [npm].

- Go to the [Quick Start Guide].


<!-- External Links -->
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
