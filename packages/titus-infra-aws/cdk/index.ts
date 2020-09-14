import {MiraServiceStack, MiraApp} from 'mira'
import {Core} from './core'

import {EcsNlb} from './ecs-nlb'
import {ApiGatewayNlb} from './api-gw-nlb'

import {EcsAlb} from './ecs-alb'
import {ApiGatewayAlb} from './api-gw-alb'

import {WebApp} from './web-app'

// The deploy is done on a Network Load Balancer, set `alb` to deploy on an application load balancer
// The ALB version is not protected, the balancer is accessible directly. DON'T USE IN PRODUCTION
const DEPLOY_TYPE = 'nlb'

export default class MainStack extends MiraServiceStack {
  constructor(parent: MiraApp, env: string) {
    super(parent, env, MainStack.name)

    const core = new Core(this)

    let api
    if (DEPLOY_TYPE === 'nlb') {
      const ecs = new EcsNlb(this, {
        vpc: core.vpc,
        authentication: core.authentication,
        database: core.database
      })

      api = new ApiGatewayNlb(this, {
        vpc: core.vpc,
        nlb: ecs.service.loadBalancer,
        userPoolArn: core.authentication.userPoolArn
      })
    } else {
      // The ALB version was left here as a reference. The Fargate cluster is public available,
      // then is possible to call the endpoint with JWT not verified.
      // To use this version implement the token verify in the application layer
      const ecs = new EcsAlb(this, {
        vpc: core.vpc,
        authentication: core.authentication,
        database: core.database
      })

      api = new ApiGatewayAlb(this, {
        alb: ecs.service.loadBalancer,
        userPoolArn: core.authentication.userPoolArn
      })
    }
    new WebApp(this, {
      apiUrl: api.url,
    })
  }
}
