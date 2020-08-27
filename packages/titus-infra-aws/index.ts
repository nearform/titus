import {Construct} from '@aws-cdk/core'
import {MiraStack} from 'mira'
import {Core} from './core'
import {Ecs} from './ecs'
// import { WebApp } from './web-app'

export default class MainStack extends MiraStack {
  constructor(parent: Construct) {
    super(parent, MainStack.name)
    const core = new Core(this)
    const ecs = new Ecs(this, {
      environment: 'dev',
      vpc: core.vpc,
      ingressSecurityGroup: core.ingressSecurityGroup,
      authentication: core.authentication,
      database: core.database
    })
    // const api = new Api(this, { environment: 'dev', vpc: core.vpc, authentication: core.authentication })
    // new WebApp(this, { environment: 'dev', apiUrl: api.url, webAppUrl: 'staging.mira-nf.com' })
  }
}
