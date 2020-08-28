import {Construct} from '@aws-cdk/core'
import {MiraStack} from 'mira'
import {Core} from './core'
import {Ecs} from './ecs'
import {TitusApiGateway} from './api_gw'
import {WebApp} from './web-app'

export default class MainStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, MainStack.name)

    const core = new Core(this)
    const ecs = new Ecs(this, {
      vpc: core.vpc,
      ingressSecurityGroup: core.ingressSecurityGroup,
      authentication: core.authentication,
      database: core.database
    })
    const api = new TitusApiGateway(this, {alb: ecs.service.loadBalancer})
    new WebApp(this, {
      apiUrl: api.url,
      webAppUrl: "titus.davidefiorello.com"
    })
  }
}
