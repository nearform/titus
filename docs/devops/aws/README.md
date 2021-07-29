# Titus Aws Cdk Deploy with Terraform

This package allows to deploy easily the titus project on a AWS account.


### Overview
This sample application uses many AWS services and can be used as a reference to create a complex infrastructure using Terraform.

An high level description of TITUS can be summarized with:

- React frontend
- Api service
- Authentication with Cognito
- Data storage on RDS Postgres

The schema below shows the deployed architecture:

![titus infrastructure](./infra.png#hla)

The web stack contains a React.js [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) which provides the UI.

The application has a single entry point through CloudFront that manage the routing serving static files from an S3 Bucket and the api calls from the Api Gateway.

The Api service runs on Ecs Fargate container service with a Network Load Balancer (NLB) and an Autoscaling.

The Authentication is managed by Api Gateway through a Cognito UserPool. 

The Api Gateway is connected to NLB using a Vpc Private Link. 
NLB and Fargate instances are not accessible from the public network. Can be accessed only by the Api Gateway.

A DNS entry is created in Route53 and a certificate is assigned to the endpoint to allow https connection.

### Resources deployed

The stack is split in 4 nested stack:

- Core
- Ecs
- ApiGateway
- WebApp

#### Core
This stack contains the base resource required by the application

- [Vpc](https://docs.aws.amazon.com/vpc)
- [Rds](https://docs.aws.amazon.com/rds)
- [Cognito](https://docs.aws.amazon.com/cognito/)

#### Ecs
This stack contains the Ecs/Fargate infrastructure

- [Ecs](https://docs.aws.amazon.com/ecs/)
- [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing)
- [Ec2 Autoscaling](https://docs.aws.amazon.com/autoscaling/)

#### Ecs
This stack contains the Ecs/Fargate infrastructure

- [Ecs](https://docs.aws.amazon.com/ecs/)
- [Ecr](https://docs.aws.amazon.com/ecr/)
- [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing)
- [Ec2 Autoscaling](https://docs.aws.amazon.com/autoscaling/)

#### Api Gateway
This stack contains the Api Gateway configuration connected to The NLB through a VpcLink. It creates a lambda function as well, used by the Frontend to retrieve the configuration data. 

- [Api Gateway](https://docs.aws.amazon.com/apigateway)
- [Lambda](https://docs.aws.amazon.com/lambda)

#### Web App
This stack contains the CloudFront configuration, the DNS creation and the storage for the Front End application. 

- [Cloud Front](https://docs.aws.amazon.com/cloudfront)
- [S3](https://docs.aws.amazon.com/s3)
- [Route 53](https://docs.aws.amazon.com/route53)
- [Certificate manager](https://docs.aws.amazon.com/acm)

## Deploy with Mira

### Prerequisites

- An AWS administrator account

Install Terraform 1.0.0 and the aws cli. Navigate to the infra/aws folder and run
```terraform plan
```terraform apply







