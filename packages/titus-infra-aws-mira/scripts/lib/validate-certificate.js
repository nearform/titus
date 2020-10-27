'use strict'

const AWS = require('aws-sdk')
const colors = require('colors')

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
  console.log('Certificate found on region us-east-1\n')
}

module.exports = validateCertificate
