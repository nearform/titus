import {expect, haveResource, ResourcePart} from '@aws-cdk/assert'
import {MiraApp, MiraServiceStack} from 'mira'
import {Core} from '.'

describe('Core', () => {
  it('Verify the existence for a resource in any stack', async () => {
    const app = new MiraApp()
    const stack = new MiraServiceStack(app, 'default')
    const core = new Core(stack)

    expect(core).to(haveResource('AWS::EC2::VPC'))
    expect(core).to(haveResource('AWS::Cognito::UserPool'))
    expect(core).to(haveResource('AWS::RDS::DBInstance'))
    expect(core).to(haveResource('AWS::Lambda::Function'))
  })
})
