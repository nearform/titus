import {countResources, expect as cdkExpect} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Core} from '../core'
import {EcsAlb} from '.'

export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
  }
}

describe('Ecs Alb', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const coreStack = new Core(stack)
    const ecsStack = new EcsAlb(stack, {
      authentication: coreStack.authentication,
      database: coreStack.database,
      vpc: coreStack.vpc
    })

    cdkExpect(ecsStack).to(countResources('AWS::ApplicationAutoScaling::ScalableTarget', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ApplicationAutoScaling::ScalingPolicy', 1))
    cdkExpect(ecsStack).to(countResources('AWS::EC2::SecurityGroup', 2))
    cdkExpect(ecsStack).to(countResources('AWS::EC2::SecurityGroupEgress', 1))
    cdkExpect(ecsStack).to(countResources('AWS::EC2::SecurityGroupIngress', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ECS::Cluster', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ECS::Service', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ECS::TaskDefinition', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ElasticLoadBalancingV2::Listener', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ElasticLoadBalancingV2::LoadBalancer', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ElasticLoadBalancingV2::TargetGroup', 1))
    cdkExpect(ecsStack).to(countResources('AWS::IAM::Policy', 1))
    cdkExpect(ecsStack).to(countResources('AWS::IAM::Role', 2))
    cdkExpect(ecsStack).to(countResources('AWS::Logs::LogGroup', 1))
  })
})
