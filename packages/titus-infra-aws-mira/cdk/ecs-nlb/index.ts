import {MiraConfig, MiraStack} from 'mira'
import {Repository} from '@aws-cdk/aws-ecr'
import {Construct, Duration, RemovalPolicy, Stack} from '@aws-cdk/core'
import {IVpc, Port} from '@aws-cdk/aws-ec2'
import {ManagedPolicy, Role, ServicePrincipal, Policy, PolicyStatement, Effect} from '@aws-cdk/aws-iam'
import {NetworkLoadBalancedFargateService} from "@aws-cdk/aws-ecs-patterns";
import {AwsLogDriver, Cluster, Compatibility, EcrImage, NetworkMode, TaskDefinition, Protocol} from '@aws-cdk/aws-ecs'
import {Protocol as ElbProtocol} from '@aws-cdk/aws-elasticloadbalancingv2'

import {LogGroup} from '@aws-cdk/aws-logs'

import {Authentication, Database} from '../core'

interface EcsNlbProps {
  readonly vpc: IVpc
  readonly authentication: Authentication
  readonly database: Database
}

/*
 * Run fargate in a Private VPB with NetworkLoadBalancer:
 * https://aws.amazon.com/blogs/compute/access-private-applications-on-aws-fargate-using-amazon-api-gateway-privatelink/
 *
 */
export class EcsNlb extends MiraStack {
  public cluster: Cluster
  public service: NetworkLoadBalancedFargateService

  constructor(parent: Construct, props: EcsNlbProps) {
    super(parent, EcsNlb.name)
    const domainConfig = MiraConfig.getEnvironment(MiraConfig.defaultEnvironmentName)

    const role = new Role(this, 'TitusTaskExecutionRole', {
      assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com')
    })
    role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'))

    this.cluster = new Cluster(this, 'FargateTitusCluster', {
      clusterName: 'titus-backend-cluster',
      vpc: props.vpc,
    })

    const taskDefinition = new TaskDefinition(this, 'titus-task-definition', {
      compatibility: Compatibility.FARGATE,
      executionRole: role,
      cpu: '256',
      memoryMiB: '512',
      networkMode: NetworkMode.AWS_VPC
    })

    taskDefinition.addToTaskRolePolicy(new PolicyStatement(
      {
        effect: Effect.ALLOW,
        actions: ["cognito-idp:ListUsers"],
        resources: [this.loadParameter('Titus/UserPoolArn').stringValue]
      }
    ))

    const repo = Repository.fromRepositoryName(this, 'RepositoryFargate', (domainConfig.env as unknown as { awsEcrRepositoryName: string }).awsEcrRepositoryName)
    repo.repositoryUriForTag('latest')

    // Define the task for fargate
    const containerDefinition = taskDefinition.addContainer('titus-backend-container', {
      image: new EcrImage(repo, 'latest'),
      logging: new AwsLogDriver({
        logGroup: new LogGroup(this, 'LogGroup', {
          logGroupName: '/ecs/titus-backend',
          removalPolicy: RemovalPolicy.DESTROY
        }),
        streamPrefix: 'ecs',
      }),
      environment: {
        NODE_ENV: 'production',
        API_HOST: '0.0.0.0',
        API_PORT: '5000',
        CORS_ORIGIN: 'true',
        PG_HOST: props.database.secret.secretValueFromJson('host').toString(),
        PG_PORT: props.database.secret.secretValueFromJson('port').toString(),
        PG_DB: props.database.secret.secretValueFromJson('dbname').toString(),
        PG_USER: props.database.secret.secretValueFromJson('username').toString(),
        PG_PASS: props.database.secret.secretValueFromJson('password').toString(),
        SECRETS_STRATEGY: 'env',
        SECRETS_PG_PASS: 'PG_PASS',
        AUTH_PROVIDER: "cognito",
        COGNITO_USER_POOL_ID: this.loadParameter('Titus/UserPoolId').stringValue,
        COGNITO_REGION: Stack.of(this).region
      },
    })
    containerDefinition.addPortMappings({containerPort: 5000, protocol: Protocol.TCP})

    this.service = new NetworkLoadBalancedFargateService(this, 'TitusFargateNlbService', {
      cluster: this.cluster,
      taskDefinition: taskDefinition,
      // Set `assignPublicIp` to true to make the fargate task available publicly.
      // Can be useful to test the instance directly. DON'T SET TO TRUE IN PRODUCTION
      assignPublicIp: false,
      publicLoadBalancer: false,
    })

    /**
     * Set the healthcheck configuration.
     * In the NLB the protocol should be specified, the default is `TCP`.
     */
    this.service.targetGroup.configureHealthCheck({
      protocol: ElbProtocol.HTTP,
      port: '5000',
      path: "/healthcheck",
      interval: Duration.seconds(30)
    });

    /*
     * The NetworkLoadBalancedFargateService doesn't create the inbound rules that allow the balancer to access the fargate service
     *
     * NLB Inbound Issue:
     * https://github.com/isotoma/allow-connections-to-ecs-service-from-network-load-balancer-cdk#readme
     * https://github.com/aws/aws-cdk/issues/4319
     * https://github.com/aws/aws-cdk/issues/1490
     * https://github.com/aws/aws-cdk/issues/5928
     */
    this.service.service.connections.allowFromAnyIpv4( Port.tcp(5000) );

    const scaling = this.service.service.autoScaleTaskCount({maxCapacity: 4, minCapacity: 1})
    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50
    })

    this.addOutput('LoadBalancerUrl', this.service.loadBalancer.loadBalancerDnsName)
    this.addOutput('EcsClusterName', this.service.cluster.clusterName)
  }
}
