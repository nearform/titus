import {countResources, expect as cdkExpect, haveResource, SynthUtils} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Core} from '../core'
import {EcsNlb} from '.'

export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
  }
}

describe('Ecs Nlb', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const coreStack = new Core(stack)
    const ecsStack = new EcsNlb(stack, {
      authentication: coreStack.authentication,
      database: coreStack.database,
      vpc: coreStack.vpc
    })

    cdkExpect(ecsStack).to(countResources('AWS::EC2::SecurityGroup', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ECS::Service', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ECS::Cluster', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ECS::TaskDefinition', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ElasticLoadBalancingV2::Listener', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ElasticLoadBalancingV2::LoadBalancer', 1))
    cdkExpect(ecsStack).to(countResources('AWS::ElasticLoadBalancingV2::TargetGroup', 1))
    cdkExpect(ecsStack).to(countResources('AWS::IAM::Policy', 2))
    cdkExpect(ecsStack).to(countResources('AWS::IAM::Role', 2))
    cdkExpect(ecsStack).to(countResources('AWS::Logs::LogGroup', 1))

    cdkExpect(ecsStack).to(haveResource('AWS::EC2::SecurityGroup', {
      "GroupDescription": "Nf-Titus-Service-default/EcsNlb-0/TitusFargateNlbService/Service/SecurityGroup",
      "SecurityGroupEgress": [{
        "CidrIp": "0.0.0.0/0",
        "Description": "Allow all outbound traffic by default",
        "IpProtocol": "-1"
      }],
      "SecurityGroupIngress": [{
        "CidrIp": "0.0.0.0/0",
        "Description": "from 0.0.0.0/0:5000",
        "FromPort": 5000,
        "IpProtocol": "tcp",
        "ToPort": 5000
      }],
    }))

    cdkExpect(ecsStack).to(haveResource('AWS::ElasticLoadBalancingV2::TargetGroup', {
      "HealthCheckPath": "/healthcheck",
      "HealthCheckPort": "5000",
      "HealthCheckProtocol": "HTTP",
    }))

    const service = Object.values(SynthUtils.subset(ecsStack, {resourceTypes: ['AWS::ECS::Service']}).Resources)[0] as any
    expect(service.Properties).toEqual(expect.objectContaining(
      {
        "DeploymentConfiguration": {"MaximumPercent": 200, "MinimumHealthyPercent": 50},
        "DesiredCount": 1,
        "EnableECSManagedTags": false,
        "HealthCheckGracePeriodSeconds": 60,
        "LaunchType": "FARGATE",
        "LoadBalancers": [expect.objectContaining({
          "ContainerName": "titus-backend-container",
          "ContainerPort": 5000
        })],
        "NetworkConfiguration": {
          "AwsvpcConfiguration": expect.objectContaining({
            "AssignPublicIp": "DISABLED",
          })
        }
      },
    ))
  })
})
