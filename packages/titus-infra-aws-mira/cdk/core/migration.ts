import {HashedCode, MiraConfig} from 'mira'
import {ISecurityGroup, IVpc} from '@aws-cdk/aws-ec2'
import {Runtime, SingletonFunction} from '@aws-cdk/aws-lambda'
import {Construct, Duration, CustomResource} from '@aws-cdk/core'
import * as cr from '@aws-cdk/custom-resources'
import {ISecret} from "@aws-cdk/aws-secretsmanager";
import {resolve} from "path";
import {FollowMode} from "@aws-cdk/assets";

export interface MigrationProps {
  readonly securityGroup: ISecurityGroup
  readonly vpc: IVpc
  readonly secret: ISecret
}

export class Migration extends Construct {
  readonly lambda: SingletonFunction

  constructor(scope: Construct, id: string, props: MigrationProps) {
    super(scope, id)

    const code = new HashedCode(resolve(__dirname, '..', '..', '..', 'titus-db-manager'), {
      follow: FollowMode.ALWAYS
    })

    this.lambda = new SingletonFunction(this, 'FullMigrationFunction', {
      code,
      environment: {
        MIRA_PARAM_PREFIX: MiraConfig.projectPrefix,
        SECRET_ARN: props.secret.secretArn
      },
      handler: 'lambda.handler',
      runtime: Runtime.NODEJS_12_X,
      timeout: Duration.minutes(1),
      uuid: 'dd5f8bfa-7a30-4d48-bfac-4ddcda9c5fb3',
      vpc: props.vpc
    })

    props.secret.grantRead(this.lambda)

    if (!code.sourceHash) {
      throw new Error('Code was not yet bound.  No hash was available.')
    }

    const migrationProvider = new cr.Provider(this, 'MigrationProvider', {
      onEventHandler: this.lambda,

    })

    new CustomResource(this, 'MigrationCustomResource', {
      serviceToken: migrationProvider.serviceToken, properties: {
        deployHash: code.sourceHash
      }
    })
  }
}
