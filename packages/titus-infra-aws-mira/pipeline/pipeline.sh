#!/bin/bash

set -e

function checkEnvironment() {
  echo 'Check environment'
  if test -z $ROLE_ARN; then
    echo "The env variable '\$ROLE_ARN' is not defined"
    exit
  fi
  if test -z $ENVIRONMENT; then
    echo "The env variable '\$ENVIRONMENT' is not defined"
    exit
  fi

}

function help() {
  echo "Usage : $0 <command>"
  echo ""
  echo "Commands:"
  echo " - prepareCredentials"
}

function prepareCredentials() {
  echo "Assuming role $ROLE_ARN ..."
  CREDS=$(aws sts assume-role --role-arn $ROLE_ARN --role-session-name default --out json)
  echo $CREDS >temp_creds.json
  export AWS_ACCESS_KEY_ID=$(node -p "require('./temp_creds.json').Credentials.AccessKeyId")
  export AWS_SECRET_ACCESS_KEY=$(node -p "require('./temp_creds.json').Credentials.SecretAccessKey")
  export AWS_SESSION_TOKEN=$(node -p "require('./temp_creds.json').Credentials.SessionToken")
  rm temp_creds.json
}

function prepareEcrEnv() {
  echo "Export values for ECR"
  export ECR_ACCOUNT=$(node -p "require('./packages/titus-infra-aws-mira/config/default.json').accounts.${ENVIRONMENT}.env.account")
  export ECR_REGION=$(node -p "require('./packages/titus-infra-aws-mira/config/default.json').accounts.${ENVIRONMENT}.env.region")
  export ECR_REPOSITORY_NAME=$(node -p "require('./packages/titus-infra-aws-mira/config/default.json').accounts.${ENVIRONMENT}.env.awsEcrRepositoryName")
}

function prepareEcsEnv() {
  echo "Export values for ECS"
  export ECS_CLUSTER=Nf-TitusApp-$ENVIRONMENT-ecs-cluster
  export ECS_SERVICE_ARN=$(aws ecs list-services --cluster $ECS_CLUSTER --region $ECR_REGION --query 'serviceArns[0]' --output text)
  export ECS_SERVICE_NAME=$(aws ecs describe-services --cluster $ECS_CLUSTER --region $ECR_REGION --services $ECS_SERVICE_ARN --query 'services[0].serviceName' --output text)
}

function prepareCI() {
  echo "Export values for ECS"
  export ECS_CLUSTER=Nf-TitusApp-$ENVIRONMENT-ecs-cluster
  export ECS_SERVICE_ARN=$(aws ecs list-services --cluster $ECS_CLUSTER --region $ECR_REGION --query 'serviceArns[0]' --output text)
  export ECS_SERVICE_NAME=$(aws ecs describe-services --cluster $ECS_CLUSTER --region $ECR_REGION --services $ECS_SERVICE_ARN --query 'services[0].serviceName' --output text)
}

function cleanupCredentials() {
  echo "Clean up credentials"
  unset AWS_SECRET_ACCESS_KEY
  unset AWS_SESSION_TOKEN
  unset AWS_ACCESS_KEY_ID

  unset ECR_ACCOUNT
  unset ECR_REGION
  unset ECR_REPOSITORY_NAME

  unset ECS_CLUSTER
  unset ECS_SERVICE_ARN
  unset ECS_SERVICE_NAME
  exit
}

function buildAndPushDockerImage() {
  echo "Build and push docker image"
  aws ecr get-login-password --region ${ECR_REGION} | docker login --username AWS --password-stdin ${ECR_ACCOUNT}.dkr.ecr.${ECR_REGION}.amazonaws.com
  cd packages/titus-backend
  docker build -t ${ECR_REPOSITORY_NAME} .
  docker tag ${ECR_REPOSITORY_NAME}:latest ${ECR_ACCOUNT}.dkr.ecr.${ECR_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:latest
  docker push ${ECR_ACCOUNT}.dkr.ecr.${ECR_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:latest
  cd ../..
  exit
}

function refreshFargate() {
  echo "Refresh fargate"
  aws ecs update-service --service $ECS_SERVICE_NAME --cluster $ECS_CLUSTER --force-new-deployment --region $ECR_REGION
  exit
}

function deploy() {
  echo "Deploy"
  cd packages/titus-infra-aws-mira
  NODE_ENV=$ENVIRONMENT npx mira deploy --env=$ENVIRONMENT --file=cdk/index.js --role $ROLE_ARN --require-approval=never
  cd ../..
  exit
}

checkEnvironment

if [ $# -lt 1 ]; then
  help
  exit
fi

case "$1" in

checkEnvironment)
  ;;
prepareCI)
  echo "Prepare CI"
  prepareCredentials
  npm run prepare:deploy:ci
  cleanupCredentials
  ;;
buildAndPushDockerImage)
  echo "Build and push docker image"
  prepareCredentials
  prepareEcrEnv
  buildAndPushDockerImage
  cleanupCredentials
  ;;
refreshFargate)
  echo "Refresh fargate"
  prepareCredentials
  prepareEcrEnv
  prepareEcsEnv
  refreshFargate
  cleanupCredentials
  ;;
deploy)
  deploy
  ;;
*)
  echo "Command not valid"
  echo ""
  help
  ;;
esac
