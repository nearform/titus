import {Construct} from "@aws-cdk/core";
import {Vpc as CdkVpc, SecurityGroup, ISecurityGroup} from "@aws-cdk/aws-ec2";

export class Vpc extends Construct {
  public readonly vpc: CdkVpc
  public readonly ingressSecurityGroup: ISecurityGroup
  public readonly egressSecurityGroup: ISecurityGroup

  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.vpc = new CdkVpc(this, `${id}Vpc`)

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
