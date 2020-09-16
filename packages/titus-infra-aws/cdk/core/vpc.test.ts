import {countResources, expect, SynthUtils} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Vpc} from './vpc'

export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
    new Vpc(this, 'Vpc')
  }
}

describe('core/vpc', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const testStack = new TestStack(stack)

    // console.log(Object.values(SynthUtils.toCloudFormation(testStack).Resources as Array<any>).map(val => val.Type))
    expect(testStack).to(countResources('AWS::EC2::EIP', 3))
    expect(testStack).to(countResources('AWS::EC2::InternetGateway', 1))
    expect(testStack).to(countResources('AWS::EC2::NatGateway', 3))
    expect(testStack).to(countResources('AWS::EC2::Route', 6))
    expect(testStack).to(countResources('AWS::EC2::RouteTable', 6))
    expect(testStack).to(countResources('AWS::EC2::Subnet', 6))
    expect(testStack).to(countResources('AWS::EC2::SubnetRouteTableAssociation', 6))
    expect(testStack).to(countResources('AWS::EC2::SecurityGroup', 2))
    expect(testStack).to(countResources('AWS::EC2::VPC', 1))
    expect(testStack).to(countResources('AWS::EC2::VPCGatewayAttachment', 1))
  })
})
