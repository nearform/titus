import { expect, haveResource, ResourcePart } from '@aws-cdk/assert'
import { MiraApp, MiraServiceStack } from 'mira'
import { Core } from '.'

describe('Core', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const core = new Core(stack)

    expect(core).to(haveResource('AWS::Cognito::UserPool'))
    expect(core).to(haveResource('AWS::Cognito::UserPoolClient'))
    expect(core).to(haveResource('AWS::Cognito::IdentityPool'))
    expect(core).to(haveResource('AWS::EC2::VPC'))
    expect(core).to(haveResource('AWS::SecretsManager::Secret'))

    expect(core).to(haveResource('AWS::RDS::DBCluster', {
      DeletionPolicy: 'Delete',
      UpdateReplacePolicy: 'Delete'
    }, ResourcePart.CompleteDefinition))
  })
})
