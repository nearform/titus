import {MiraConfig, MiraStack} from 'mira'
import {Repository} from '@aws-cdk/aws-ecr'
import {Construct, Duration, RemovalPolicy} from '@aws-cdk/core'
import {IVpc} from '@aws-cdk/aws-ec2'
import {ManagedPolicy, Role, ServicePrincipal} from '@aws-cdk/aws-iam'
import {ApplicationLoadBalancedFargateService} from "@aws-cdk/aws-ecs-patterns";
import {AwsLogDriver, Cluster, Compatibility, EcrImage, NetworkMode, Protocol, TaskDefinition,} from '@aws-cdk/aws-ecs'

import {LogGroup} from '@aws-cdk/aws-logs'

import {Authentication, Database} from '../core'

interface EcsAlbProps {
  readonly vpc: IVpc
  readonly authentication: Authentication
  readonly database: Database
}

export class EcsAlb extends MiraStack {
  public cluster: Cluster
  public service: ApplicationLoadBalancedFargateService

  constructor(parent: Construct, props: EcsAlbProps) {
    super(parent, EcsAlb.name)
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
      networkMode: NetworkMode.AWS_VPC,
    })

    const repo = Repository.fromRepositoryName(this, 'RepositoryFargate', (domainConfig.env as unknown as { awsEcrRepositoryName: string }).awsEcrRepositoryName)
    repo.repositoryUriForTag('latest')

    // add container to task definition
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
        AUTH_PROVIDER: "cognito"
      },
    })

    containerDefinition.addPortMappings({containerPort: 5000, protocol: Protocol.TCP})

    this.service = new ApplicationLoadBalancedFargateService(this, 'TitusAlbService', {
      cluster: this.cluster,
      taskDefinition: taskDefinition,
      assignPublicIp: true,
    })

    this.service.targetGroup.configureHealthCheck({
      path: "/healthcheck",
      interval: Duration.seconds(120),
      unhealthyThresholdCount: 5,
    });

    const scaling = this.service.service.autoScaleTaskCount({maxCapacity: 4, minCapacity: 1})
    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50
    })


    this.addOutput('LoadBalancerUrl', this.service.loadBalancer.loadBalancerDnsName)
    this.addOutput('EcsClusterName', this.service.cluster.clusterName)
  }
}
