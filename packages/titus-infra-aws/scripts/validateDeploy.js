'use strict'

const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const colors = require('colors')
const yup = require('yup')

function loadConfig() {
  const configFileName = path.resolve(__dirname, '..', 'config', 'default.json')
  console.log(colors.blue(`Config file`))
  console.log(`Search for: ${configFileName}`)
  if (!fs.existsSync(configFileName)) {
    const errorMessage = `Config fila 'config/default.json' not found

You can start copying the config/default.sample.json 
${colors.green(`cp config/default.sample.json  config/default.json`)}
`
    throw new Error(errorMessage)
  }

  try {
    const fileContent = fs.readFileSync(configFileName, 'utf-8')
    const result = JSON.parse(fileContent)
    console.log('Config file found')

    return result
  } catch (e) {
    throw new Error(e.message)
  }
}

async function validateConfig(config) {
  const configSchema = yup.object().shape({
    app: yup.object().shape({prefix: yup.string().required(), name: yup.string().required()}),
    dev: yup.object().shape({target: yup.string().required()}),
    accounts: yup.object().shape({
      default: yup.object().shape({
        env: yup.object().shape({
          account: yup.string().required(),
          region: yup.string().required(),
          domainName: yup.string().required(),
          webAppUrl: yup.string().required(),
          certificateSslName: yup.string().required(),
          awsEcrRepositoryName: yup.string().required()
        }),
        profile: yup.string().required()
      })
    }),
  })
  await configSchema.validate(config, {abortEarly: false})

  if(config.accounts.default.env.account === '0000000000000') {
    throw new Error(colors.red("\nThe account '0000000000000' is not valid. Set a proper account"))
  }

  console.log('Config file valid\n')
}


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
${colors.green(`aws ecr create-repository --repository-name ${repositoryName}`)}
`
    throw new Error(errorMessage)
  }
  console.log('Repository found')


  const images = await ecr.describeImages({repositoryName}).promise()

  if (!images.imageDetails.length) {
    const errorMessage = `The repository does not contains images.

You can create the image from the root of the 'titus-backend' package with the commands:

Login to ecr:
${colors.green(`aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin ${account}.dkr.ecr.${region}.amazonaws.com`)}

Create and deploy the image:
${colors.green(`docker build -t ${repositoryName} .
docker tag ${repositoryName}:latest ${account}.dkr.ecr.${region}.amazonaws.com/${repositoryName}:latest
docker push ${account}.dkr.ecr.${region}.amazonaws.com/${repositoryName}:latest
`)}
`
    throw new Error(errorMessage)
  }
  console.log('Image found')

  console.log()
}


async function validateCertificate(config) {
  const certificateSslName = config.accounts.default.env.certificateSslName
  const region = config.accounts.default.env.region
  const account = config.accounts.default.env.account
  console.log(colors.blue(`Validate certificate`))
  console.log(`Search for: ${certificateSslName}`)
  var acm = new AWS.ACM({region: 'us-east-1'})
  const result = await acm.listCertificates().promise()


  if (!result.CertificateSummaryList.find(certificate => certificate.DomainName === certificateSslName)) {
    const errorMessage = `Certificate ${certificateSslName} not found

A certificate with the name ${colors.green(certificateSslName)} should exists in ${colors.green('us-east-1')} region.
(It should be in the same region of CloudFormation, if is attached directly to Api GW should be placed in the same region of Api GW)  

You can create the repository with the command:

${colors.green(`AWS_REGION=us-east-1 aws acm request-certificate --domain-name ${certificateSslName}`)}

Once the creation is done, the certificate should be approved, an email is sent to admin@your-domain.

Verify the status of the certificate here: https://console.aws.amazon.com/acm/home?region=us-east-1#/

`
    throw new Error(errorMessage)
  }
  console.log('Certificate found on region us-east-1')
}

async function run() {
  try {
    const config = loadConfig()
    await validateConfig(config)

    await validateDockerContainer(config)

    await validateCertificate(config)


    console.log('\n')
    console.log('Configuration check successfull, ready to deploy!! 🚀🚀🚀')
    console.log(`\nexec: ${colors.green('npm run deploy:cdk')}`)

  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}


run()
