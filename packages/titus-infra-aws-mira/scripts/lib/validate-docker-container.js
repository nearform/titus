'use strict'

const AWS = require('aws-sdk')
const colors = require('colors')

async function validateDockerContainer(config) {
  const repositoryName = config.accounts.default.env.awsEcrRepositoryName
  const region = config.accounts.default.env.region
  const account = config.accounts.default.env.account
  console.log(colors.blue(`Validate Ecr repository`))
  console.log(`Search for: ${repositoryName}`)
  var ecr = new AWS.ECR({region})
  const result = await ecr.describeRepositories().promise()

  if (!result.repositories.find(repository => repository.repositoryName === repositoryName)) {
    const errorMessage = `Repository ${repositoryName} not found
You can create the repository with the command:
${colors.green(`aws ecr create-repository --region ${region} --repository-name ${repositoryName}`)}
`
    throw new Error(errorMessage)
  }
  console.log('Repository found')

  const images = await ecr.describeImages({repositoryName}).promise()

  if (!images.imageDetails.length) {
    const errorMessage = `The repository does not contains images.
You can create the image from the root of the 'titus-backend' package with the commands:
Login to ecr:
${colors.green(`aws ecr get-login-password --region ${region} | docker login --username AWS --password-stdin ${account}.dkr.ecr.${region}.amazonaws.com`)}
Create and deploy the image:
${colors.green(`docker build -t ${repositoryName} .
docker tag ${repositoryName}:latest ${account}.dkr.ecr.${region}.amazonaws.com/${repositoryName}:latest
docker push ${account}.dkr.ecr.${region}.amazonaws.com/${repositoryName}:latest
`)}
`
    throw new Error(errorMessage)
  }
  console.log('Image found\n')
}

module.exports = validateDockerContainer
