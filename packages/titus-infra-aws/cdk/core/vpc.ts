import {Construct} from "@aws-cdk/core";
import {Vpc, SubnetType, SecurityGroup, ISecurityGroup} from "@aws-cdk/aws-ec2";

export class StackVpc extends Construct {
  public readonly vpc: Vpc
  public readonly ingressSecurityGroup: ISecurityGroup
  public readonly egressSecurityGroup: ISecurityGroup

  constructor(scope: Construct, id: string) {
    super(scope, id)

     this.vpc = new Vpc(this, `${id}Vpc`)
    // this.vpc = new Vpc(this, `${id}Vpc`, {
    //   cidr: '10.0.0.0/16',
    //   maxAzs: 2,
    //   natGateways: 1,
    //   subnetConfiguration: [
    //     {
    //       cidrMask: 28,
    //       name: 'Subnet1',
    //       subnetType: SubnetType.ISOLATED,
    //     },
    //     {
    //       cidrMask: 24,
    //       name: 'PublicSubnet',
    //       subnetType: SubnetType.PUBLIC,
    //     },
    //     {
    //       cidrMask: 26,
    //       name: 'Privateubnet',
    //       subnetType: SubnetType.PRIVATE,
    //     },
    //   ],
    // })
    //
    this.ingressSecurityGroup = new SecurityGroup(
      this,
      'ingress-security-group',
      {
        vpc: this.vpc,
        allowAllOutbound: false,
        securityGroupName: 'IngressSecurityGroup',
      }
    )

    this.egressSecurityGroup = new SecurityGroup(
      this,
      'egress-security-group',
      {
        vpc: this.vpc,
        allowAllOutbound: false,
        securityGroupName: 'EgressSecurityGroup',
      }
    )
  }
}
