import {expect as cdkExpect, haveResource, countResources, SynthUtils} from '@aws-cdk/assert'
import {Construct} from "@aws-cdk/core";
import {MiraApp, MiraServiceStack, MiraStack} from 'mira'
import {Authentication} from './authentication'


export class TestStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, TestStack.name)
    new Authentication(this, 'Cognito')
  }
}

describe('authentication', () => {
  it('Creates the stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const authentication = new TestStack(stack)

    cdkExpect(authentication).to(haveResource('AWS::Cognito::UserPool'))
    cdkExpect(authentication).to(haveResource('AWS::Cognito::UserPoolClient'))
    cdkExpect(authentication).to(haveResource('AWS::Cognito::IdentityPool'))
    cdkExpect(authentication).to(haveResource('AWS::Cognito::IdentityPoolRoleAttachment'))
    cdkExpect(authentication).to(countResources('AWS::IAM::Role', 2))
    cdkExpect(authentication).to(countResources('AWS::IAM::Policy', 2))
    const cognitoRoles = SynthUtils.subset(authentication, {resourceTypes: ['AWS::IAM::Role']})

    const rolesAttributes = Object.values(cognitoRoles.Resources)

    expect(((rolesAttributes[0] as any).Properties.AssumeRolePolicyDocument.Statement as Array<any>).find(statement =>
      statement.Condition['ForAnyValue:StringLike']["cognito-identity.amazonaws.com:amr"] === 'unauthenticated'
    )).toBeTruthy()

    expect(((rolesAttributes[1] as any).Properties.AssumeRolePolicyDocument.Statement as Array<any>).find(statement =>
      statement.Condition['ForAnyValue:StringLike']["cognito-identity.amazonaws.com:amr"] === 'authenticated'
    )).toBeTruthy()
  })
})
