import {resolve} from 'path'
import {HashedCode, MiraStack, MiraConfig} from 'mira'
import {Runtime, Function, SingletonFunction} from '@aws-cdk/aws-lambda'
import {FollowMode} from '@aws-cdk/assets'
import {ISecurityGroup, IVpc, SecurityGroup, Vpc} from '@aws-cdk/aws-ec2'
import {Construct, Tag, Duration, Stack} from '@aws-cdk/core'
import {Authentication} from './authentication'
import {Database} from './database'
import {Migration} from './migration'
import {StackVpc} from './vpc'

export * from './authentication'
export * from './database'

export class Core extends MiraStack {
  readonly vpc: IVpc
  readonly ingressSecurityGroup: ISecurityGroup
  readonly egressSecurityGroup: ISecurityGroup
  readonly authentication: Authentication
  readonly database: Database

  constructor(parent: Construct) {
    super(parent, Core.name)

    const stackVpc = new StackVpc(this, 'Vpc')

    this.vpc = stackVpc.vpc
    this.ingressSecurityGroup = stackVpc.ingressSecurityGroup
    this.egressSecurityGroup = stackVpc.egressSecurityGroup

    /** https://github.com/aws/aws-cdk/issues/5469 **/
    Tag.remove(this, 'BuildVersion', {
      includeResourceTypes: ['AWS::EC2::EIP']
    })
    Tag.remove(this, 'Deployment', {
      includeResourceTypes: ['AWS::EC2::EIP']
    })
    Tag.remove(this, 'Environment', {
      includeResourceTypes: ['AWS::EC2::EIP']
    })
    Tag.remove(this, 'Name', {
      includeResourceTypes: ['AWS::EC2::EIP']
    })
    Tag.remove(this, 'StackName', {
      includeResourceTypes: ['AWS::EC2::EIP']
    })

    /** Create the database */
    this.database = new Database(this, 'Database', {
      vpc: this.vpc,
      ingressSecurityGroup: this.ingressSecurityGroup
    })

    // const apiGroup = new SecurityGroup(this, 'ApiGroup', {vpc: this.vpc})
    // /** Create the database */
    // this.database = new Database(this, 'Database', {
    //   // allowedGroups: [apiGroup],
    //   vpc: this.vpc
    // })

    new Migration(this, 'Migration', {
      securityGroup: this.ingressSecurityGroup,
      vpc: this.vpc,
      secret: this.database.secret
    })

    this.authentication = new Authentication(this, 'Authentication')
    const {
      identityPoolRef,
      userPoolArn,
      userPoolClientId,
      userPoolId
    } = this.authentication

    this.createParameter('Titus/ApiSecurityGroup', 'API Security Group', this.ingressSecurityGroup.securityGroupId)
    // this.createParameter('Titus/EgressApiGroup', 'API Egress Security Group', this.egressSecurityGroup.securityGroupId)
    this.createParameter('Titus/IdentityPoolId', 'Identity Pool ID', identityPoolRef)
    this.createParameter('Titus/UserPoolArn', 'User Pool ARN', userPoolArn)
    this.createParameter('Titus/UserPoolId', 'User Pool ID', userPoolId)
    this.createParameter('Titus/WebClientId', 'User Pool Client ID', userPoolClientId)

    this.addOutput('Region', Stack.of(this).region)
    this.addOutput('IdentityPoolID', identityPoolRef)
    this.addOutput('UserPoolArn', userPoolArn)
    this.addOutput('UserPoolId', userPoolId)
    this.addOutput('WebClientId',userPoolClientId)
    // this.addOutput('LoadBalancerUrl', ecs.service.loadBalancer.loadBalancerDnsName)
    // this.addOutput('GatewayApiUrl', api.url)
  }
}
