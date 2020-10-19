import {countResources, expect as cdkExpect, haveResource, SynthUtils} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Core} from '../core'
import {EcsNlb} from '../ecs-nlb'
import {ApiGatewayNlb} from '../api-gw-nlb'
import {WebApp} from '.'

export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
  }
}

describe('Api Gateway Nlb', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const coreStack = new Core(stack)
    const ecsStack = new EcsNlb(stack, {
      authentication: coreStack.authentication,
      database: coreStack.database,
      vpc: coreStack.vpc
    })

    const gwStack = new ApiGatewayNlb(stack, {
      vpc: coreStack.vpc,
      nlb: ecsStack.service.loadBalancer,
      userPoolArn: coreStack.authentication.userPoolArn
    })

    const webAppStack = new WebApp(stack, {
      apiUrl: gwStack.url
    })

    cdkExpect(webAppStack).to(countResources('AWS::CloudFormation::CustomResource', 1))
    cdkExpect(webAppStack).to(countResources('AWS::CloudFront::Distribution', 1))
    cdkExpect(webAppStack).to(countResources('AWS::IAM::Policy', 4))
    cdkExpect(webAppStack).to(countResources('AWS::IAM::Role', 4))
    cdkExpect(webAppStack).to(countResources('AWS::Lambda::Function', 4))
    cdkExpect(webAppStack).to(countResources('AWS::Route53::RecordSet', 1))
    cdkExpect(webAppStack).to(countResources('AWS::S3::Bucket', 1))
    cdkExpect(webAppStack).to(countResources('AWS::S3::BucketPolicy', 1))
    cdkExpect(webAppStack).to(countResources('Custom::CDKBucketDeployment', 1))
    cdkExpect(webAppStack).to(countResources('Custom::MiraAutoDeleteBucket', 1))

    cdkExpect(webAppStack).to(haveResource('AWS::S3::Bucket', {
      "BucketName": "www.yourdomain.com",
    }))

    cdkExpect(webAppStack).to(haveResource("AWS::CloudFormation::CustomResource", {
      "DomainName": "*.yourdomain.com",
      "HostedZoneId": "DUMMY",
      "Region": "us-east-1"
    },))

    cdkExpect(webAppStack).to(haveResource("AWS::Route53::RecordSet", {
      "Name": "www.yourdomain.com.",
      "Type": "A",
      "HostedZoneId": "DUMMY"
    }))

    const distribution = Object.values(SynthUtils.subset(webAppStack, {resourceTypes: ['AWS::CloudFront::Distribution']}).Resources)[0] as any
    expect(distribution.Properties.DistributionConfig.Aliases).toEqual(["www.yourdomain.com"])
  })
})
