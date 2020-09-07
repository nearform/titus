import {Construct} from "@aws-cdk/core";
import {Vpc, SecurityGroup, ISecurityGroup} from "@aws-cdk/aws-ec2";

export class StackVpc extends Construct {
  public readonly vpc: Vpc
  public readonly ingressSecurityGroup: ISecurityGroup
  public readonly egressSecurityGroup: ISecurityGroup

  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.vpc = new Vpc(this, `${id}Vpc`)

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
