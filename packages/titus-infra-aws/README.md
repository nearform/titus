# Titus Aws Cdk Deploy

This package allows to deploy easily the titus project on a AWS account.

## Infrastructure schema

https://app.creately.com/diagram/oO8xdP2vjf5

## Prerequisites

- An AWS administrator account
- A domain managed in AWS Route53

## Validate the configuration

```
npm run validate:deploy
```

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
      "profile": "default"
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

### Request a certificate
To deploy the app a certificate is required, it can be requested from the AWS dasboard or with the command:

Dashboard link:
https://console.aws.amazon.com/acm/home?region=us-east-1#/

CLI: 
```
AWS_REGION=us-east-1 aws acm request-certificate --domain-name *.yourdomain.com
```

**Certificate Requirement**
The certificate will be connected to a CloudFront deployment then it requires to be requested in `us-east-1`

https://aws.amazon.com/it/premiumsupport/knowledge-center/custom-ssl-certificate-cloudfront/
```
To assign an ACM certificate to a CloudFront distribution, you must request or import the certificate in the US East (N. Virginia) Region. If you're using the ACM console, check the Region selector in the navigation bar. Confirm that US East (N. Virginia) is selected before you request or import the certificate.
Note: After you assign an ACM certificate to a CloudFront distribution, the certificate is distributed to all edge locations for the CloudFront distribution's price class.
```  

## ECR Registry
The application is loaded using the AWS docker registry.

### Create the repository if not exists

```
aws ecr create-repository --repository-name awsEcrRepositoryName

(eg.)
aws ecr create-repository --repository-name myrepo-titus-backend
```

Tu publish, from the `titus-backend` root directory
```
docker build -t AWS_ECR_REPOSITORY_NAME .
docker tag AWS_ECR_REPOSITORY_NAME:latest YOUR_ACCOUNT_NUMBER.dkr.ecr.YOUR_REGION.amazonaws.com/AWS_ECR_REPOSITORY_NAME:latest
docker push YOUR_ACCOUNT_NUMBER.dkr.ecr.YOUR_REGION.amazonaws.com/AWS_ECR_REPOSITORY_NAME:latest

(eg.)

docker build -t myrepo-titus-backend .
docker tag myrepo-titus-backend:latest 12345678.dkr.ecr.eu-west-1.amazonaws.com/myrepo-titus-backend:latest
docker push 12345678.dkr.ecr.eu-west-1.amazonaws.com/myrepo-titus-backend:latest
```

### Deploy the image on a deployed app
Once the infrastructure is deployed the update to Fargate Cluster can be done using the aws-cli

```
aws ecs update-service --service SERVICE_NAME --cluster CLUSTER_NAME --force-new-deployment
```

CLUSTER_NAME can be retrieved from the `output.json` file in the attribute: `EcsClusterName`

Get the list of the services:

```
aws ecs list-services --cluster CLUSTER_NAME

(eg.)

aws ecs list-services --cluster titus-backend-cluster
``` 

returns:
```
{
    "serviceArns": [
        "arn:aws:ecs:eu-west-1:123123123123:service/Nf-TitusApp-Service-default-MainStack-Ecs0NestedStackEcs0NestedStackResourceABCDABCD-175905DKB9FKC-TitusAlbService6B54E9EA-ABCDABCD"
    ]
}
```

The service name is the last part of the ARN.

(Eg.)
```
aws ecs update-service --service Nf-TitusApp-Service-default-MainStack-Ecs0NestedStackEcs0NestedStackResourceABCDABCD-175905DKB9FKC-TitusAlbService6B54E9EA-ABCDABCD --cluster titus-backend-cluster --force-new-deployment
```

Will force the cluster to refresh the services at the last version.

## Deploy

#### Prerequisite (Bootstrap)
If your region never had a CDK deploy prepare with:

```
npx cdk bootstrap
```

### Deploy

Deploy the app using:

```
npm run deploy:cdk
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

