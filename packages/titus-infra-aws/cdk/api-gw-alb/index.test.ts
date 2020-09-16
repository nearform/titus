import {countResources, expect as cdkExpect} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Core} from '../core'
import {EcsAlb} from '../ecs-alb'
import {ApiGatewayAlb} from '.'

export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
  }
}

describe('Api Gateway Alb', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const coreStack = new Core(stack)
    const ecsStack = new EcsAlb(stack, {
      authentication: coreStack.authentication,
      database: coreStack.database,
      vpc: coreStack.vpc
    })

    const gwStack = new ApiGatewayAlb(stack, {
      alb: ecsStack.service.loadBalancer,
      userPoolArn: coreStack.authentication.userPoolArn
    })

    cdkExpect(gwStack).to(countResources('AWS::IAM::Role', 1))
    cdkExpect(gwStack).to(countResources('AWS::Lambda::Function', 1))
    cdkExpect(gwStack).to(countResources('AWS::ApiGateway::Authorizer', 1))
    cdkExpect(gwStack).to(countResources('AWS::ApiGateway::Resource', 1))
    cdkExpect(gwStack).to(countResources('AWS::ApiGateway::Method', 2))
  })
})
