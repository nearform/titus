import { ServerlessAurora } from 'mira'
import { IVpc, Port, SecurityGroup } from '@aws-cdk/aws-ec2'
import { ISecret } from '@aws-cdk/aws-secretsmanager'
import { Construct, Duration } from '@aws-cdk/core'

export interface DbProps {
  readonly allowedGroups: [ SecurityGroup ]
  readonly vpc: IVpc
}

export class Database extends Construct {
  readonly secret: ISecret
  readonly cluster: ServerlessAurora

  constructor (scope: Construct, id: string, props: DbProps) {
    super(scope, id)

    const defaultDatabaseName = 'mira'
    const username = 'nearform'

    const dbGroup = new SecurityGroup(this, 'DbGroup', {
      description: 'Allow Postgres connections from Lambda',
      vpc: props.vpc
    })

    this.cluster = new ServerlessAurora(this, 'Database', {
      databaseName: defaultDatabaseName,
      masterUsername: username,
      maxCapacity: 8,
      securityGroup: dbGroup,
      subnets: { subnets: props.vpc.privateSubnets },
      vpc: props.vpc
    })

    this.cluster.addRotationSingleUser('Rotation', Duration.days(15))
    if (!this.cluster.secret) {
      throw new Error('DatabaseCluster did not provide the expected secret.')
    }

    this.secret = this.cluster.secret

    for (const group of props.allowedGroups) {
      this.cluster.connections.allowFrom(
        group, Port.tcp(5432), // Postgres port
        `Allow ${group.securityGroupName} access to Postgres`)
    }
  }
}
