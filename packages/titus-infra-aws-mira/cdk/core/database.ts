import {
  IVpc,
  Port,
  Peer,
  InstanceClass,
  InstanceType,
  InstanceSize,
  SubnetType,
  ISecurityGroup
} from '@aws-cdk/aws-ec2'
import {Construct, Duration} from '@aws-cdk/core'
import { ISecret } from '@aws-cdk/aws-secretsmanager'
import {DatabaseInstance, DatabaseInstanceEngine, StorageType, PostgresEngineVersion} from '@aws-cdk/aws-rds'

export interface DbProps {
  readonly ingressSecurityGroup: ISecurityGroup
  readonly vpc: IVpc
}

export class Database extends Construct {
  readonly rdsInstance: DatabaseInstance
  readonly secret: ISecret

  constructor(scope: Construct, id: string, props: DbProps) {
    super(scope, id)

    props.ingressSecurityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(5432)
    )

    const instanceType = InstanceType.of(InstanceClass.T2, InstanceSize.MICRO)
    const storageEncrypted = false
    const masterUsername = 'postgres'
    const databaseName = 'titus'

    this.rdsInstance = new DatabaseInstance(this, 'postgres-rds-instance', {
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_11_5
      }),
      instanceType,
      vpc: props.vpc,
      vpcPlacement: {subnetType: SubnetType.PUBLIC},
      storageEncrypted,
      multiAz: false,
      autoMinorVersionUpgrade: false,
      allocatedStorage: 25,
      storageType: StorageType.GP2,
      backupRetention: Duration.days(3),
      deletionProtection: false,
      masterUsername,
      databaseName,
      port: 5432,
      securityGroups: [props.ingressSecurityGroup],
    })

    if (!this.rdsInstance.secret) {
      throw new Error('RDS did not provide the expected secret.')
    }
    this.secret = this.rdsInstance.secret
  }
}
