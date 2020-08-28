import {MiraStack} from "mira";
import {CfnOutput, Construct, RemovalPolicy, Stack} from '@aws-cdk/core'
import {
  Cors,
  Deployment,
  HttpIntegration,
  IntegrationResponse,
  LogGroupLogDestination,
  PassthroughBehavior,
  ProxyResource,
  RestApi,
  Stage
} from '@aws-cdk/aws-apigateway'
import {ApplicationLoadBalancer} from '@aws-cdk/aws-elasticloadbalancingv2'
import {LogGroup, RetentionDays} from '@aws-cdk/aws-logs'

interface ApiGatewayProps {
  alb: ApplicationLoadBalancer
}

export class TitusApiGateway extends MiraStack {
  public api: RestApi
  public url: string

  constructor(scope: Construct, props: ApiGatewayProps) {
    super(scope, 'TitusApiGateway')

    this.api = new RestApi(scope, 'TitusRestApi', {
      description: 'Titus API',
      deploy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS, // this is also the default
      }
    })

    const v1 = this.api.root.addResource('api').addResource('v1')

    const integration = new HttpIntegration(this.buildLBEndpoint(props.alb.loadBalancerDnsName), {
      proxy: true,
      httpMethod: 'ANY',
      options: {
        // You can define mapping parameters from your method to your integration
        // - Destination parameters (the key) are the integration parameters (used in mappings)
        // - Source parameters (the value) are the source request parameters or expressions
        // @see: https://docs.aws.amazon.com/apigateway/latest/developerguide/request-response-data-mappings.html
        // 'integration.request.querystring.who': 'method.request.querystring.who'
        requestParameters: {
          'integration.request.path.proxy': 'method.request.path.proxy'
        },
      }
    })

    const proxyResource = new ProxyResource(this, 'TitusApiGWProxyResource', {
      anyMethod: true,
      defaultIntegration: integration,
      parent: v1,
      defaultMethodOptions: {
        requestParameters: {'method.request.path.proxy': true}
      },
    })

    const deployment = new Deployment(this, 'TitusApiGWDeployment', {
      api: this.api,
    })

    const logGroupProd = new LogGroup(this, 'ApiGWLogGroupProd', {
      logGroupName: '/aws/api-gateway/titus-api-prod',
      removalPolicy: RemovalPolicy.DESTROY,
      retention: RetentionDays.ONE_DAY
    })

    new Stage(this, 'ApiGWDevStageDev', {
      deployment,
      stageName: 'prod',
      accessLogDestination: new LogGroupLogDestination(logGroupProd),
    })

    this.url = `https://${this.api.restApiId}.execute-api.${Stack.of(this).region}.amazonaws.com/prod`
    this.addOutput('ApiURLProd', `https://${this.api.restApiId}.execute-api.${Stack.of(this).region}.amazonaws.com/prod`)
  }

  private buildLBEndpoint(dnsName: string) {
    return `http://${dnsName}/{proxy}`
  }
}
