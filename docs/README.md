![logo]

Develop and Deploy solutions quickly using Titus, an Accelerated Development & Deployment Stack. Titus is production ready and can be deployed to all major cloud providers.

## What is Titus
Titus is a Application Development & Deployment Stack suitable for SaaS type solutions. It scaffolds ready to deploy frontend, backend and database while including infrastructure and service tooling for continuous integration and deployment.

On top of all this there are other pieces included that will help speed up application development, while maintaining high quality software and documentation. It looks a little something like this:

![titus-feature-overview]

In other words, we provide everything you need to start deploying features, in a production ready, scalable manner.

### Developer first experience
Developer experience in Titus is second to none. We want developers to enjoy using Titus so much it becomes frictionless to select it. To ensure we keep to this ideal our development motto is:

![titus-developer-statement]

With this in mind, Titus is well documented, includes modern tooling like [Storybook], has linting and testing as first class citizens, and supports common-sense inclusions such as quality logging and docker convenience commands for day to day building and working with the stack locally.

### No compromise DevOps
To achieve a rock-solid but easy to configure infrastructural base, we make use of [Terraform] in conjunction with [Kubernetes] (K8s) to deploy and manage infrastructure and service needs. We keep deployment configuration simple by using [Noise], which wraps common Terraform configurations into an easy to use Terraform plugin. Noise itself is used in a configuration repo, which contains secrets, helm charts, etc.

![titus-pipeline]

The Titus repository itself is deployed to [AWS] via [CircleCI] and can be configured with ease to work with [Azure] via [Azure Pipelines] with minimal changes. [Google Cloud Platform][GCP], support is not yet included in Noise but the stack itself can be deployed to there, should you wish to add the infrastructure scripts to support it.

### Production grade CI pipeline
The primary goal of Titus is to enable you to get to building features in sprint one. We care a lot about this point and so use a modern deployment pipeline to ensure you can deliver continuously:

![titus-ci-pipeline]

### You decide the details
Perhaps the most important feature of Titus is how little in includes. There are no decisions made on CSS, no deviation from standard linting rules and no clever frontend framework to get tangled up with.

We understand these things will vary project to project, so we get out of your way and let you make those decisions. We just make sure you can build deploy those decisions with ease.

## Explore Titus
The quickest way to get exploring is to view our quick start guide. It covers, forking, cloning and pulling Titus locally. From there it will walk you through configuration and local deployment to Docker. All you need installed is the latest stable versions of [Docker] and [Node].

- Go to the [Quick start]


<!-- External Links -->
[Noise]: https://nearform.github.io/noise
[titus-noise-cli]: https://github.com/nearform/titus-noise-cli
[CircleCI]: https://circleci.com/product/#features
[Storybook]: https://storybook.js.org/
[Terraform]: https://www.terraform.io/
[Kubernetes]:  https://kubernetes.io/
[Docker]: https://www.docker.com/
[Node]: https://nodejs.org/en/
[AWS]: https://aws.amazon.com/
[Azure]: https://azure.microsoft.com
[Azure Pipelines]: https://azure.microsoft.com/en-us/services/devops/pipelines/
[GCP]: https://cloud.google.com/

<!-- Internal Links -->
[Quick start]: quick-start/

<!-- Images -->
[logo]: img/Accel_Logo_Titus.svg#logo
[titus-feature-overview]: img/titus-feature-overview.svg
[titus-deployment-workflow]: img/titus-deployment-workflow.svg
[titus-developer-statement]: img/titus-developer-statement.svg
[titus-ci-pipeline]: img/titus-ci-pipeline.svg
[titus-pipeline]: img/titus-pipeline.svg
