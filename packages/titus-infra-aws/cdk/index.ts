import {MiraServiceStack, MiraApp} from 'mira'
import {Core} from './core'

import {EcsNlb} from './ecs-nlb'
import {ApiGatewayNlb} from './api-gw-nlb'

import {WebApp} from './web-app'

export class MainStack extends MiraServiceStack {
  constructor(parent: MiraApp, env: string) {
    super(parent, env, MainStack.name)

    const core = new Core(this)

    const ecs = new EcsNlb(this, {
      vpc: core.vpc,
      authentication: core.authentication,
      database: core.database
    })

    const api = new ApiGatewayNlb(this, {
      vpc: core.vpc,
      nlb: ecs.service.loadBalancer,
      userPoolArn: core.authentication.userPoolArn
    })

    new WebApp(this, {
      apiUrl: api.url,
    })
  }
}

export default MainStack
