import {AutoDeleteBucket, MiraConfig, MiraStack} from 'mira'
import {
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution,
  OriginProtocolPolicy,
  SecurityPolicyProtocol,
  SSLMethod
} from '@aws-cdk/aws-cloudfront'
import {BucketDeployment, Source as S3DeploymentSource} from '@aws-cdk/aws-s3-deployment'
import {Construct, Duration, Fn} from '@aws-cdk/core'
import {CustomResource, CustomResourceProvider} from '@aws-cdk/aws-cloudformation'
import {ITopic, Topic} from '@aws-cdk/aws-sns'

// From: https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/static-site/static-site.ts

interface WebAppProps {
  readonly apiUrl: string
  readonly webAppUrl: string
}

export class WebApp extends MiraStack {
  constructor(parent: Construct, props: WebAppProps) {
    super(parent, WebApp.name)
    /**
     * named resource warning
     */
    const bucketProps = {
      bucketName: props.webAppUrl,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html'
    }

    const siteBucket = new AutoDeleteBucket(this, 'SiteBucket', bucketProps)

    const distributionDomainName: string = this.getMinimalDeployment(
      siteBucket,
      props.apiUrl
    )
    this.addOutput('distributionDomainName', distributionDomainName)
  }

  private getMinimalDeployment(siteBucket: any, apiUrl: string): string {
    const distribution = new CloudFrontWebDistribution(
      this,
      'Distribution',
      {
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
          }
        ],
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: '/index.html'
          }
        ]
      }
    )

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
