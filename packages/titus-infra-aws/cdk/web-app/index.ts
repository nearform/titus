import {AutoDeleteBucket, MiraConfig, MiraStack} from 'mira'
import {
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution,
  SecurityPolicyProtocol,
  SSLMethod
} from '@aws-cdk/aws-cloudfront'

import {BucketDeployment, Source as S3DeploymentSource} from '@aws-cdk/aws-s3-deployment'
import {Construct, Duration, Fn} from '@aws-cdk/core'
import targets = require('@aws-cdk/aws-route53-targets/lib');
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';

// From: https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/static-site/static-site.ts

interface WebAppProps {
  readonly apiUrl: string
}

export class WebApp extends MiraStack {
  constructor(parent: Construct, props: WebAppProps) {
    super(parent, WebApp.name)
    const domainConfig = MiraConfig.getEnvironment(MiraConfig.defaultEnvironmentName)
    /**
     * named resource warning
     */
    const bucketProps = {
      bucketName: (domainConfig.env as unknown as { webAppUrl: string }).webAppUrl,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html'
    }

    const siteBucket = new AutoDeleteBucket(this, 'SiteBucket', bucketProps)

    const distributionDomainName: string = this.getFullDeployment(
      siteBucket,
      props.apiUrl
    )
    this.addOutput('distributionDomainName', distributionDomainName)
  }

  private getFullDeployment(siteBucket: any, apiUrl: string): string {
    const domainConfig = MiraConfig.getEnvironment(MiraConfig.defaultEnvironmentName)
    const certificateSslName = (domainConfig.env as unknown as { certificateSslName: string }).certificateSslName

    const hostedZone = route53.HostedZone.fromLookup(this, 'TitusHostedZone', {
      domainName: (domainConfig.env as unknown as { domainName: string }).domainName
    })

    const certificateArn = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: certificateSslName,
      hostedZone,
      region: 'us-east-1', // Cloudfront only checks this region for certificates.
    }).certificateArn;

    const distribution = new CloudFrontWebDistribution(
      this,
      'Distribution',
      {
        aliasConfiguration: {
          acmCertRef: certificateArn,
          names: [(domainConfig.env as unknown as { webAppUrl: string }).webAppUrl],
          sslMethod: SSLMethod.SNI,
          securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
        },
        originConfigs: [
          {
            behaviors: [{isDefaultBehavior: true}],
            s3OriginSource: {
              s3BucketSource: siteBucket
            },
          },
          {
            behaviors: [
              {
                allowedMethods: CloudFrontAllowedMethods.ALL,
                defaultTtl: Duration.millis(0),
                forwardedValues: {
                  headers: [
                    'Accept',
                    'Access-Control-Request-Headers',
                    'Access-Control-Request-Method',
                    'Authorization',
                    'Content-Type',
                    'Origin',
                    'X-Api-Key'
                  ],
                  queryString: true
                },
                maxTtl: Duration.millis(0),
                minTtl: Duration.millis(0),
                pathPattern: '/api/v1/*'
              }
            ],
            customOriginSource: {
              // Host of the API
              domainName: Fn.select(2, Fn.split('/', apiUrl))
            },
            originPath: '/prod'
          },
          {
            behaviors: [
              {
                allowedMethods: CloudFrontAllowedMethods.ALL,
                defaultTtl: Duration.minutes(1),
                forwardedValues: {
                  headers: [
                    'Accept',
                    'Access-Control-Request-Headers',
                    'Access-Control-Request-Method',
                    'Authorization',
                    'Content-Type',
                    'Origin',
                    'X-Api-Key'
                  ],
                  queryString: true
                },
                maxTtl: Duration.minutes(2),
                minTtl: Duration.minutes(1),
                pathPattern: '/config/v1'
              }
            ],
            customOriginSource: {
              // Host of the API
              domainName: Fn.select(2, Fn.split('/', apiUrl))
            },
            originPath: '/prod'
          }
        ],
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: '/index.html'
          },
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: '/index.html'
          }
        ]
      }
    )

    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: (domainConfig.env as unknown as { webAppUrl: string }).webAppUrl,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone: hostedZone
    })

    new BucketDeployment(this, 'Deployment', {
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
      sources: [
        S3DeploymentSource.asset(
          '../titus-frontend/build'
        )
      ]
    })
    return distribution.domainName
  }
}
