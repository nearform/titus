import {countResources, expect, haveResource} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Database} from './database'
import {Vpc} from './vpc'
import {Migration} from "./migration";

export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
    const coreVpc = new Vpc(this, 'Vpc')
    const database = new Database(this, 'Rds', {vpc: coreVpc.vpc, ingressSecurityGroup: coreVpc.ingressSecurityGroup})
    new Migration(this, 'Migration', {
      vpc: coreVpc.vpc,
      secret: database.secret,
      securityGroup: coreVpc.ingressSecurityGroup
    })
  }
}

describe('core/migration', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const testStack = new TestStack(stack)

    expect(testStack).to(haveResource('AWS::CloudFormation::CustomResource'))
    expect(testStack).to(countResources('AWS::Lambda::Function', 2))
  })
})
