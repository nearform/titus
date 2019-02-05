![Logo][logo-img]

Develop and Deploy to features in week one using Titus, an Accelerated Development & Deployment Stack. Titus is production ready can be deployed to all major cloud providers.

## Overview
Titus is a Application Development & Deployment Stack, or _ADDS_ for short. It scaffolds ready to deploy frontend, backend, and database while including infrastructure and service tooling for continuous integration and deployment.

On top of all this there are other pieces included that will help speed up application development, while maintaining high quality software and documentation. It looks a little something like this,

![titus-feature-overview][]

In other words, we provide everything you need to start deploying features, in a production ready, scalable manner.

### Developer first approach
Developer experience in Titus, is second to none. We want developers to enjoy using Titus so much, it becomes frictionless to select it. To ensure we keep to this ideal, our development motto is,

![titus-ci-pipeline](../img/titus-developer-statement.svg)

With this in mind, Titus is well documented includes modern tooling like [Storybook](), has linting and testing as first class citizen, and supports common sense inclusions such as quality logging and docker convenience commands for day to day debugging. 

### Production grade Infrastructure
To achieve a rock-solid but easy to configure infrastructural base, we make use of [Terraform]() in conjunction with [K8s]() manage infrastructure and service needs. We keep deployment configuration simple by using [Noise](), which wraps common Terraform configurations into an easy to use Terraform plugin. Noise itself is used in a configuration repo, which contains secrets, helm charts, etc.

![titus-infrastructure-pipeline](../img/titus-infrastructure-pipeline.svg)

To keep this part of Titus easy to use we maintain a tool, [titus-noise-cli]() which can generate template copies of titus-noise, that can be tailored to your needs.

### Production grade CI Pipeline
The primary goal of Titus is to enable you to get to building features in sprint one. We care a lot about this point. To ensure you can get features out the door quickly, we use a modern deployment pipeline to ensure you can deliver continuously.

![titus-ci-pipeline](../img/titus-ci-pipeline.svg)

Our CI is built upon [CircleCI]()'s Workflows and allows us to break our deployment into discrete jobs and workflows. The primary outputs of our CI are containers, which are built continuously, and deployment, which happens continuously to staging and be

## Getting started
The quickest way to get started is to view our quick start guide. It covers, forking, cloning, and pulling Titus local. From there it will walk you through configuration and deployment. All you need installed is the latest stable versions of [Docker]() and [Node]().

- Go to the [Quick start](/quick-start/)


[logo-img]: img/logo-pos.svg
[docs]:https://nearform.github.io/titus
[noise]:https://nearform.github.io/noise
[titus]:https://nearform.github.io/titus


[titus-feature-overview]: img/titus-feature-overview.svg
[titus-deployment-workflow]: img/titus-deployment-workflow.svg

## Why we built this
Taking 4 to 6 weeks to show a client value in a system they are paying for is an absolutely unacceptable situation in solution development. Our goal with Titus is to cut this time down to 2 weeks. We have a lot to say about this in our build considerations document linked below.

- [Considerations for building Titus]()
