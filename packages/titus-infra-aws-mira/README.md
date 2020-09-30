# Titus Aws Cdk Deploy with Mira

This package allows to deploy easily the titus project on a AWS account.

### Overview
This sample application uses many AWS services and can be used as a reference to create a complex infrastructure using Mira.

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

To deploy the stack the SSL Certificate and the Docker Repository (ECR) should exists and contains the `latest` image.

#### SSL Certificate
The SSL Certificate can be requested from the AWS dashboard:

https://console.aws.amazon.com/acm/home?region=us-east-1#/

or using the AWS CLI command
 
```AWS_REGION=us-east-1 aws acm request-certificate --domain-name *.yourdomain.com```

**Certificate Requirement**
The certificate will be connected to a CloudFront deployment then it requires to be requested in `us-east-1`

https://aws.amazon.com/it/premiumsupport/knowledge-center/custom-ssl-certificate-cloudfront/

> To assign an ACM certificate to a CloudFront distribution, you must request or import the certificate in the US East (N. Virginia) Region. If you're using the ACM console, check the Region selector in the navigation bar. Confirm that US East (N. Virginia) is selected before you request or import the certificate.
>
> Note: After you assign an ACM certificate to a CloudFront distribution, the certificate is distributed to all edge locations for the CloudFront distribution's price class.
  

#### Docker repository (ECR)

Create the repository if not exists:

```aws ecr create-repository --repository-name awsEcrRepositoryName```



Create and deploy the image:

```docker build -t AWS_ECR_REPOSITORY_NAME .```
```docker tag AWS_ECR_REPOSITORY_NAME:latest YOUR_ACCOUNT_NUMBER.dkr.ecr.YOUR_REGION.amazonaws.com/AWS_ECR_REPOSITORY_NAME:latest```
```docker push YOUR_ACCOUNT_NUMBER.dkr.ecr.YOUR_REGION.amazonaws.com/AWS_ECR_REPOSITORY_NAME:latest```

Once the infrastructure is deployed the Docker image can be updated with the command:

```aws ecs update-service --service SERVICE_NAME --cluster CLUSTER_NAME --force-new-deployment``` 

CLUSTER_NAME can be retrieved from the `output.json` file in the attribute: `EcsClusterName`

Get the list of the services:

```
aws ecs list-services --cluster CLUSTER_NAME

(eg.)

aws ecs list-services --cluster titus-backend-cluster
``` 

- An AWS administrator account
- A domain managed in AWS Route53

## Config file
A config file named `default.json` should be placed in `config` folder

```
{
  "app": {
    "prefix": "nf",
    "name": "titus-app"
  },
  "dev": {
    "target": "default"
  },
  "accounts": {
    "default": {
      "env": {
        "account": "YOURACCOUNTNUMEBER", // Check below to get it from CLI
        "region": "eu-west-1",  // The deployment region
        "domainName": "yourdomain.com", // The base domain name
        "webAppUrl": "www.yourdomain.com", // The web app url 
        "certificateSslName": "*.yourdomain.com", // The certificate, check below how to request a certifcate
        "awsEcrRepositoryName": "yourname-titus-backend" // The ECR docker repository
      },
      "profile": "default" // The profile used defined in ~.aws/credentials
    }
  }
}
```

### Get you account number
The account number can be retrieved using the command:
```
aws sts get-caller-identity

{
    "UserId": "AIDA5I.......",
    "Account": "91231238123098", // This value should be used in the config
    "Arn": "arn:aws:iam::912147919779:user/yournamehere"
}
```


### Bootsrap

If your region never had a CDK deploy prepare with:

```
cdk bootstrap aws://YOUR_ACCOUNT_NUMBER/YOUR_REGION
```

### Deploy

Deploy the app using:

```
npm run deploy
```

A file `output.json` is created in the root and contains the information of the deploy.

```
{
  "Nf-TitusApp-Service-default-MainStack": {
    "UserPoolId": "eu-west-1_ABCDE",
    "distributionDomainName": "ABCDE.cloudfront.net",
    "LoadBalancerUrl": "Nf-Ti-Titus-ABCDE.eu-west-1.elb.amazonaws.com",
    "Region": "eu-west-1",
    "ApiURLProd": "https://ABCDE.execute-api.eu-west-1.amazonaws.com/prod",
    "IdentityPoolID": "eu-west-1:3e9e2135-6d32-464d-9e1c-ABCDE",
    "TitusRestApiEndpoint21D760FD": "https://ABCDE.execute-api.eu-west-1.amazonaws.com/prod/",
    "UserPoolArn": "arn:aws:cognito-idp:eu-west-1:123123123123:userpool/eu-west-1_ABCDE",
    "EcsClusterName": "titus-backend-cluster",
    "WebClientId": "ABCDEABCDEABCDE"
  }
}
```

## Create a user
A CLI tool is available to create a user in the current cognito deploy

```
node scripts/createUser.js --email davide.fiorello@nearform.com --password YOUR_PASSWORD
```






