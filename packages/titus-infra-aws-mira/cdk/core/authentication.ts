import {
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
  CfnUserPool,
  UserPool,
  UserPoolClient
} from '@aws-cdk/aws-cognito'
import { Effect, FederatedPrincipal, PolicyStatement, Role } from '@aws-cdk/aws-iam'
import { Construct, Stack } from '@aws-cdk/core'

// Encapsulate UserPool configuration

// Cognito example: https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/cdk.ts
// - https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-cognito.CfnIdentityPool.html
// https://stackoverflow.com/questions/55784746/how-to-create-cognito-identitypool-with-cognito-userpool-as-one-of-the-authentic

export class Authentication extends Construct {
  readonly identityPoolRef: string
  readonly userPoolArn: string
  readonly userPoolClientId: string
  readonly userPoolId: string

  constructor (scope: Construct, id: string) {
    super(scope, id)

    const { account, region, stackName } = Stack.of(this)
    const userPool = new UserPool(this, 'UserPool', {
      autoVerify: {
        email: true
      },
      signInAliases: {
        email: true
      },
      userPoolName: stackName
    })

    this.userPoolArn = userPool.userPoolArn
    this.userPoolId = userPool.userPoolId


    // // See example here: https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/customResourceConstructs/cognitoDomainCustomResourceConstruct.ts
    // new CognitoDomainCustomResourceConstruct(this, "CognitoDomain", { Domain: 'mira-login.nearform.com' }, this.userPool)

    const client = new UserPoolClient(this, 'Client', { userPool })
    this.userPoolClientId = client.userPoolClientId

    const identityPool = new CfnIdentityPool(this, 'IdentityPool', {
      allowUnauthenticatedIdentities: true,
      cognitoIdentityProviders: [{
        clientId: client.userPoolClientId,
        providerName: userPool.userPoolProviderName
      }]
    })

    this.identityPoolRef = identityPool.ref

    const cognitoPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'cognito-sync:*',
        'cognito-identity:*'
      ],
      resources: [
        `arn:aws:cognito-sync:${region}:${account}:identitypool/${identityPool.ref}`,
        `arn:aws:cognito-sync:${region}:${account}:identitypool/${identityPool.ref}/*`
      ]
    })

    const mobileAnalyticsPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'mobileanalytics:PutEvents'
      ],
      resources: ['*']
    })

    const unauthenticatedRole = new Role(this, 'Unauthenticated', {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: {
          'cognito-identity.amazonaws.com:aud': identityPool.ref
        },
        'ForAnyValue:StringLike': {
          'cognito-identity.amazonaws.com:amr': 'unauthenticated'
        }
      }, 'sts:AssumeRoleWithWebIdentity')
    })

    unauthenticatedRole.addToPolicy(cognitoPolicy)
    unauthenticatedRole.addToPolicy(mobileAnalyticsPolicy)

    const authenticatedRole = new Role(this, 'Authenticated', {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: {
          'cognito-identity.amazonaws.com:aud': identityPool.ref
        },
        'ForAnyValue:StringLike': {
          'cognito-identity.amazonaws.com:amr': 'authenticated'
        }
      }, 'sts:AssumeRoleWithWebIdentity')
    })

    authenticatedRole.addToPolicy(cognitoPolicy)
    authenticatedRole.addToPolicy(mobileAnalyticsPolicy)

    new CfnIdentityPoolRoleAttachment(this, 'DefaultAttachment', {
      identityPoolId: identityPool.ref,
      roles: {
        authenticated: authenticatedRole.roleArn,
        unauthenticated: unauthenticatedRole.roleArn
      }
    })

    const internalCfn = userPool.node.defaultChild as CfnUserPool
    internalCfn.adminCreateUserConfig = {
      allowAdminCreateUserOnly: false,
      unusedAccountValidityDays: 7
    }
    internalCfn.mfaConfiguration = 'OFF'
    internalCfn.policies = {
      passwordPolicy: {
        minimumLength: 8,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
        requireUppercase: true
      }
    }

    internalCfn.schema = [
      {
        attributeDataType: 'String',
        developerOnlyAttribute: false,
        mutable: true,
        name: 'email',
        required: true,
        stringAttributeConstraints: {
          maxLength: '2048',
          minLength: '0'
        }
      },
      {
        attributeDataType: 'String',
        developerOnlyAttribute: false,
        mutable: true,
        name: 'orgType',
        required: false,
        stringAttributeConstraints: {
          maxLength: '256',
          minLength: '0'
        }
      },
      {
        attributeDataType: 'String',
        developerOnlyAttribute: false,
        mutable: true,
        name: 'orgName',
        required: false,
        stringAttributeConstraints: {
          maxLength: '256',
          minLength: '0'
        }
      },
      {
        attributeDataType: 'String',
        developerOnlyAttribute: false,
        mutable: true,
        name: 'country',
        required: false,
        stringAttributeConstraints: {
          maxLength: '256',
          minLength: '0'
        }
      }
    ]

    internalCfn.smsVerificationMessage = 'Your verification code is {####}'
    internalCfn.emailVerificationMessage = 'Your verification code is {####}'
    internalCfn.emailVerificationSubject = 'Your verification code'
  }
}
