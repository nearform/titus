import {countResources, expect} from '@aws-cdk/assert'
import {MiraApp} from 'mira'
import {default as MainStack} from './index'

describe('Core', () => {
  it('Verify the existence for a resource in any stack', async () => {
    const app = new MiraApp()
    const stack = new MainStack(app, 'default')

    expect(stack).to(countResources('AWS::CloudFormation::Stack', 4))
  })
})
