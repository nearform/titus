import {DeploymentPermissions, MiraApp, MiraConfig} from 'mira'
import {Construct} from '@aws-cdk/core'
import {PolicyStatement} from '@aws-cdk/aws-iam'

export default class CustomPermissions extends DeploymentPermissions {
  constructor(parent: Construct, props?: any) {
    super(parent, props)
    const account = MiraConfig.getEnvironment()
    const baseProject = MiraApp.getBaseStackName()

    this.role.addToPolicy(new PolicyStatement(
      {
        actions: [
          "iam:CreateRole",
          "iam:DeleteRole",
          "iam:AttachRolePolicy",
          "iam:DeleteRolePolicy",
          "iam:DetachRolePolicy",
          "iam:GetRole",
          "iam:GetRolePolicy",
          "iam:PassRole",
          "iam:PutRolePolicy"
        ],
        resources: [
          `arn:aws:iam:${account.env.region}:${account.env.account}:${baseProject}-*`
        ]
      },
    ))

    // Ec2 (Vpc)
    this.role.addToPolicy(new PolicyStatement(
      {
        "actions": [
          "ec2:CreateVpc",
          "ec2:DeleteVpc",
          "ec2:allocateAddress",
          "ec2:releaseAddress",
          "ec2:CreateInternetGateway",
          "ec2:DeleteInternetGateway",
          "ec2:AttachInternetGateway",
          "ec2:DetachInternetGateway",
          "ec2:ModifyVpcAttribute",
          "ec2:createTags",
          "ec2:deleteTags",
          "ec2:CreateSubnet",
          "ec2:DeleteSubnet",
          "ec2:CreateRoute",
          "ec2:DeleteRoute",
          "ec2:CreateRouteTable",
          "ec2:DeleteRouteTable",
          "ec2:CreateSecurityGroup",
          "ec2:DeleteSecurityGroup",
          "ec2:RevokeSecurityGroupEgress",
          "ec2:AuthorizeSecurityGroupEgress",
          "ec2:AuthorizeSecurityGroupIngress",
          "ec2:RevokeSecurityGroupIngress",
          "ec2:ModifySubnetAttribute",
          "ec2:AssociateRouteTable",
          "ec2:DisassociateRouteTable",
          "ec2:CreateNatGateway",
          "ec2:DeleteNatGateway"
        ],
        "resources": [
          `arn:aws:ec2:${account.env.region}:${account.env.account}:*`
        ]
      }
    ))

    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "ec2:describeAddresses",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeVpcs",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeAccountAttributes",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeRouteTables",
        "ec2:DescribeNatGateways"
      ],
      resources: [
        "*"
      ]
    }))

    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "secretsmanager:GetRandomPassword",
        "secretsmanager:CreateSecret",
        "secretsmanager:DeleteSecret",
        "secretsmanager:TagResource",
        "secretsmanager:GetSecretValue",
        "secretsmanager:PutSecretValue"
      ],
      resources: [
        "*"
      ]
    }))

    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "rds:*"
      ],
      resources: [
        `arn:aws:rds:${account.env.region}:${account.env.account}:*`
      ]
    }))

    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "cognito-idp:CreateUserPool",
        "cognito-idp:DeleteUserPool",
        "cognito-idp:CreateUserPoolClient",
        "cognito-idp:DeleteUserPoolClient",
        "cognito-identity:CreateIdentityPool",
        "cognito-identity:DeleteIdentityPool",
        "cognito-identity:SetIdentityPoolRoles"
      ],
      resources: [
        `*`
      ]
    }))

    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "ssm:PutParameter",
        "ssm:DeleteParameter",
        "ssm:GetParameters",
        "ssm:AddTagsToResource",
        "ssm:RemoveTagsFromResource"
      ],
      resources: [
        `*`
      ]
    }))

    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "lambda:*",
      ],
      resources: [
        `*`
      ]
    }))
    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "logs::*",
      ],
      resources: [
        `*`
      ]
    }))
    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "ecs:*",
        "elasticloadbalancing:CreateListener",
        "elasticloadbalancing:CreateLoadBalancer",
        "elasticloadbalancing:CreateRule",
        "elasticloadbalancing:CreateTargetGroup",
        "elasticloadbalancing:DeleteListener",
        "elasticloadbalancing:DeleteLoadBalancer",
        "elasticloadbalancing:DeleteRule",
        "elasticloadbalancing:DeleteTargetGroup",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeRules",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:AddTags"
      ],
      resources: [
        `*`
      ]
    }))
    this.role.addToPolicy(new PolicyStatement({
      actions: [
        "route53:ListHostedZonesByName"
      ],
      resources: [
        `arn:aws:iam:${account.env.region}:${account.env.account}:${baseProject}-*`
      ]
    }))

    // TODO Add policies for ECS, NLB, APIGateway, Lambda, Cloudfront
  }
}
