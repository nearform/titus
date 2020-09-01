import {MiraServiceStack, MiraApp} from 'mira'
import {Core} from './core'
import {Ecs} from './ecs'
import {TitusApiGateway} from './api_gw'
import {WebApp} from './web-app'

export default class MainStack extends MiraServiceStack {
  constructor(parent: MiraApp, env: string) {
    super(parent, env, MainStack.name)

    const core = new Core(this)
    const ecs = new Ecs(this, {
      vpc: core.vpc,
      authentication: core.authentication,
      database: core.database
    })
    const api = new TitusApiGateway(this, {alb: ecs.service.loadBalancer, userPoolArn: core.authentication.userPoolArn})
    new WebApp(this, {
      apiUrl: api.url,
      webAppUrl: "titus.davidefiorello.com"
    })
  }
}
