import {expect, haveResource} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Database} from './database'
import {Vpc} from './vpc'

export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
    const coreVpc = new Vpc(this, 'Vpc')
    new Database(this, 'Rds', {vpc: coreVpc.vpc, ingressSecurityGroup: coreVpc.ingressSecurityGroup})
  }
}

describe('core/database', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const testStack = new TestStack(stack)

    expect(testStack).to(haveResource('AWS::RDS::DBInstance', {
      "DBName": "titus",
      "Engine": "postgres",
      "EngineVersion": "11.5",
    }))
    expect(testStack).to(haveResource('AWS::SecretsManager::SecretTargetAttachment'))
    expect(testStack).to(haveResource('AWS::SecretsManager::Secret'))
    expect(testStack).to(haveResource('AWS::RDS::DBSubnetGroup'))
  })
})
