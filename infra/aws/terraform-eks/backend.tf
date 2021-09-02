
resource "aws_ecr_repository" "this" {
  name = var.default_name
}
#resource "aws_eks_cluster" "example" {
#  name     = "example"
#  role_arn = aws_iam_role.example.arn
#
#  vpc_config {
#    subnet_ids = [aws_subnet.this["dmz1"].id, aws_subnet.this["dmz2"].id]
#  }
#
#  depends_on = [
#    aws_iam_role_policy_attachment.example-AmazonEKSClusterPolicy,
#    aws_iam_role_policy_attachment.example-AmazonEKSVPCResourceController,
#  ]
#}
#
#output "endpoint" {
#  value = aws_eks_cluster.example.endpoint
#}
#
#resource "aws_eks_node_group" "example" {
#  cluster_name    = aws_eks_cluster.example.name
#  node_group_name = "example"
#  node_role_arn   = aws_iam_role.example-node.arn
#  subnet_ids      = [aws_subnet.this["dmz1"].id, aws_subnet.this["dmz2"].id]
#
#  scaling_config {
#    desired_size = 1
#    max_size     = 1
#    min_size     = 1
#  }
#
#  depends_on = [
#    aws_iam_role_policy_attachment.example-AmazonEKSWorkerNodePolicy,
#    aws_iam_role_policy_attachment.example-AmazonEKS_CNI_Policy,
#    aws_iam_role_policy_attachment.example-AmazonEC2ContainerRegistryReadOnly,
#  ]
#}
#output "kubeconfig-certificate-authority-data" {
#  value = aws_eks_cluster.example.certificate_authority[0].data
#}
#resource "aws_iam_role" "example" {
#  name = "eks-cluster-example"
#
#  assume_role_policy = <<POLICY
#{
#  "Version": "2012-10-17",
#  "Statement": [
#    {
#      "Effect": "Allow",
#      "Principal": {
#        "Service": "eks.amazonaws.com"
#      },
#      "Action": "sts:AssumeRole"
#    }
#  ]
#}
#POLICY
#}
#resource "aws_iam_role" "example-lb" {
#  name = "eks-ls-example"
#
#  assume_role_policy = <<POLICY
#{
#    "Version": "2012-10-17",
#    "Statement": [
#        {
#            "Effect": "Allow",
#            "Action": [
#                "iam:CreateServiceLinkedRole",
#                "ec2:DescribeAccountAttributes",
#                "ec2:DescribeAddresses",
#                "ec2:DescribeAvailabilityZones",
#                "ec2:DescribeInternetGateways",
#                "ec2:DescribeVpcs",
#                "ec2:DescribeSubnets",
#                "ec2:DescribeSecurityGroups",
#                "ec2:DescribeInstances",
#                "ec2:DescribeNetworkInterfaces",
#                "ec2:DescribeTags",
#                "ec2:GetCoipPoolUsage",
#                "ec2:DescribeCoipPools",
#                "elasticloadbalancing:DescribeLoadBalancers",
#                "elasticloadbalancing:DescribeLoadBalancerAttributes",
#                "elasticloadbalancing:DescribeListeners",
#                "elasticloadbalancing:DescribeListenerCertificates",
#                "elasticloadbalancing:DescribeSSLPolicies",
#                "elasticloadbalancing:DescribeRules",
#                "elasticloadbalancing:DescribeTargetGroups",
#                "elasticloadbalancing:DescribeTargetGroupAttributes",
#                "elasticloadbalancing:DescribeTargetHealth",
#                "elasticloadbalancing:DescribeTags"
#            ],
#            "Resource": "*"
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "cognito-idp:DescribeUserPoolClient",
#                "acm:ListCertificates",
#                "acm:DescribeCertificate",
#                "iam:ListServerCertificates",
#                "iam:GetServerCertificate",
#                "waf-regional:GetWebACL",
#                "waf-regional:GetWebACLForResource",
#                "waf-regional:AssociateWebACL",
#                "waf-regional:DisassociateWebACL",
#                "wafv2:GetWebACL",
#                "wafv2:GetWebACLForResource",
#                "wafv2:AssociateWebACL",
#                "wafv2:DisassociateWebACL",
#                "shield:GetSubscriptionState",
#                "shield:DescribeProtection",
#                "shield:CreateProtection",
#                "shield:DeleteProtection"
#            ],
#            "Resource": "*"
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "ec2:AuthorizeSecurityGroupIngress",
#                "ec2:RevokeSecurityGroupIngress"
#            ],
#            "Resource": "*"
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "ec2:CreateSecurityGroup"
#            ],
#            "Resource": "*"
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "ec2:CreateTags"
#            ],
#            "Resource": "arn:aws:ec2:*:*:security-group/*",
#            "Condition": {
#                "StringEquals": {
#                    "ec2:CreateAction": "CreateSecurityGroup"
#                },
#                "Null": {
#                    "aws:RequestTag/elbv2.k8s.aws/cluster": "false"
#                }
#            }
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "ec2:CreateTags",
#                "ec2:DeleteTags"
#            ],
#            "Resource": "arn:aws:ec2:*:*:security-group/*",
#            "Condition": {
#                "Null": {
#                    "aws:RequestTag/elbv2.k8s.aws/cluster": "true",
#                    "aws:ResourceTag/elbv2.k8s.aws/cluster": "false"
#                }
#            }
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "ec2:AuthorizeSecurityGroupIngress",
#                "ec2:RevokeSecurityGroupIngress",
#                "ec2:DeleteSecurityGroup"
#            ],
#            "Resource": "*",
#            "Condition": {
#                "Null": {
#                    "aws:ResourceTag/elbv2.k8s.aws/cluster": "false"
#                }
#            }
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "elasticloadbalancing:CreateLoadBalancer",
#                "elasticloadbalancing:CreateTargetGroup"
#            ],
#            "Resource": "*",
#            "Condition": {
#                "Null": {
#                    "aws:RequestTag/elbv2.k8s.aws/cluster": "false"
#                }
#            }
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "elasticloadbalancing:CreateListener",
#                "elasticloadbalancing:DeleteListener",
#                "elasticloadbalancing:CreateRule",
#                "elasticloadbalancing:DeleteRule"
#            ],
#            "Resource": "*"
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "elasticloadbalancing:AddTags",
#                "elasticloadbalancing:RemoveTags"
#            ],
#            "Resource": [
#                "arn:aws:elasticloadbalancing:*:*:targetgroup/*/*",
#                "arn:aws:elasticloadbalancing:*:*:loadbalancer/net/*/*",
#                "arn:aws:elasticloadbalancing:*:*:loadbalancer/app/*/*"
#            ],
#            "Condition": {
#                "Null": {
#                    "aws:RequestTag/elbv2.k8s.aws/cluster": "true",
#                    "aws:ResourceTag/elbv2.k8s.aws/cluster": "false"
#                }
#            }
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "elasticloadbalancing:AddTags",
#                "elasticloadbalancing:RemoveTags"
#            ],
#            "Resource": [
#                "arn:aws:elasticloadbalancing:*:*:listener/net/*/*/*",
#                "arn:aws:elasticloadbalancing:*:*:listener/app/*/*/*",
#                "arn:aws:elasticloadbalancing:*:*:listener-rule/net/*/*/*",
#                "arn:aws:elasticloadbalancing:*:*:listener-rule/app/*/*/*"
#            ]
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "elasticloadbalancing:ModifyLoadBalancerAttributes",
#                "elasticloadbalancing:SetIpAddressType",
#                "elasticloadbalancing:SetSecurityGroups",
#                "elasticloadbalancing:SetSubnets",
#                "elasticloadbalancing:DeleteLoadBalancer",
#                "elasticloadbalancing:ModifyTargetGroup",
#                "elasticloadbalancing:ModifyTargetGroupAttributes",
#                "elasticloadbalancing:DeleteTargetGroup"
#            ],
#            "Resource": "*",
#            "Condition": {
#                "Null": {
#                    "aws:ResourceTag/elbv2.k8s.aws/cluster": "false"
#                }
#            }
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "elasticloadbalancing:RegisterTargets",
#                "elasticloadbalancing:DeregisterTargets"
#            ],
#            "Resource": "arn:aws:elasticloadbalancing:*:*:targetgroup/*/*"
#        },
#        {
#            "Effect": "Allow",
#            "Action": [
#                "elasticloadbalancing:SetWebAcl",
#                "elasticloadbalancing:ModifyListener",
#                "elasticloadbalancing:AddListenerCertificates",
#                "elasticloadbalancing:RemoveListenerCertificates",
#                "elasticloadbalancing:ModifyRule"
#            ],
#            "Resource": "*"
#        }
#    ]
#}
#POLICY
#}
#
##module "eks" {
##  # truncated
##
##  write_kubeconfig   = true
##  config_output_path = "./"
##
##  workers_additional_policies = [aws_iam_policy.worker_policy.arn]
##}
##
##resource "aws_iam_policy" "worker_policy" {
##  name        = "worker-policy"
##  description = "Worker policy for the ALB Ingress"
##
##  policy = file("iam-policy.json")
##}
#
#resource "aws_iam_role_policy_attachment" "example-AmazonEKSClusterPolicy" {
#  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
#  role       = aws_iam_role.example.name
#}
#
#resource "aws_iam_role_policy_attachment" "example-AmazonEKSVPCResourceController" {
#  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
#  role       = aws_iam_role.example.name
#}
#
#resource "aws_iam_role" "example-node" {
#  name = "eks-node-group-example"
#
#  assume_role_policy = jsonencode({
#    Statement = [{
#      Action = "sts:AssumeRole"
#      Effect = "Allow"
#      Principal = {
#        Service = "ec2.amazonaws.com"
#      }
#    }]
#    Version = "2012-10-17"
#  })
#}
#
##resource "aws_iam_role" "example-lb" {
##  name = "eks-lb-example"
##
##  assume_role_policy = jsonencode({
##    Statement = [{
##      Action = "sts:AssumeRole"
##      Effect = "Allow"
##      Principal = {
##        Service = "ec2.amazonaws.com"
##      }
##    }]
##    Version = "2012-10-17"
##  })
##}
#
#resource "aws_iam_role_policy_attachment" "example-AmazonEKSWorkerNodePolicy" {
#  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
#  role       = aws_iam_role.example-node.name
#}
#
#resource "aws_iam_role_policy_attachment" "example-AmazonEKS_CNI_Policy" {
#  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
#  role       = aws_iam_role.example-node.name
#}
#
#resource "aws_iam_role_policy_attachment" "example-AmazonEC2ContainerRegistryReadOnly" {
#  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
#  role       = aws_iam_role.example-node.name
#}
########################################################################

########################################################################
# IAM 
########################################################################
#######################################################################


########################################################################
# Load Balancer
########################################################################


########################################################################
# Logs 
########################################################################
resource "aws_cloudwatch_log_group" "this" {
  name              = var.default_name
  retention_in_days = 3

  lifecycle {
    create_before_destroy = true
  }
}

########################################################################
# SGs
########################################################################
resource "aws_security_group" "this" {
  name        = format("%s-ecs-service", var.default_name)
  description = "Allow access to ECS Service"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group_rule" "inbound" {
  type = "ingress"

  from_port   = 80
  to_port     = 80
  protocol    = "tcp"
  cidr_blocks = ["1.1.1.1/32"] # Network interface IPs of NLB

  security_group_id = aws_security_group.this.id
}

resource "aws_security_group_rule" "outbound" {
  type = "egress"

  from_port   = 0
  to_port     = 0
  protocol    = -1
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_security_group.this.id
}

#locals {
#  container_definitions = {
#    name      = "api"
#    #image     = format("%s.dkr.ecr.%s.amazonaws.com/%s:%s", data.aws_caller_identity.current.account_id, var.region, ##format("%s-api", var.default_name), "master")
#    image     = "711655675495.dkr.ecr.eu-west-1.amazonaws.com/#damian-titus-backend:3b406043-24b7-4cbb-b5cd-0303dca66a8f"
#    essential = true
#  }

#  api_json_map = jsonencode(local.container_definitions)
#}

data "aws_caller_identity" "current" {}
