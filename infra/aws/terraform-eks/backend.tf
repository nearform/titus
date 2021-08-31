
resource "aws_ecr_repository" "this" {
  name = var.default_name
}
resource "aws_eks_cluster" "example" {
  name     = "example"
  role_arn = aws_iam_role.example.arn

  vpc_config {
    subnet_ids = [aws_subnet.this["dmz1"].id, aws_subnet.this["dmz2"].id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.example-AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.example-AmazonEKSVPCResourceController,
  ]
}

output "endpoint" {
  value = aws_eks_cluster.example.endpoint
}

resource "aws_eks_node_group" "example" {
  cluster_name    = aws_eks_cluster.example.name
  node_group_name = "example"
  node_role_arn   = aws_iam_role.example-node.arn
  subnet_ids      = [aws_subnet.this["dmz1"].id, aws_subnet.this["dmz2"].id]

  scaling_config {
    desired_size = 1
    max_size     = 1
    min_size     = 1
  }

  depends_on = [
    aws_iam_role_policy_attachment.example-AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.example-AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.example-AmazonEC2ContainerRegistryReadOnly,
  ]
}
output "kubeconfig-certificate-authority-data" {
  value = aws_eks_cluster.example.certificate_authority[0].data
}
resource "aws_iam_role" "example" {
  name = "eks-cluster-example"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "example-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.example.name
}

resource "aws_iam_role_policy_attachment" "example-AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.example.name
}

resource "aws_iam_role" "example-node" {
  name = "eks-node-group-example"

  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "example-AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.example-node.name
}

resource "aws_iam_role_policy_attachment" "example-AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.example-node.name
}

resource "aws_iam_role_policy_attachment" "example-AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.example-node.name
}
########################################################################

########################################################################
# IAM 
########################################################################
#######################################################################


########################################################################
# Load Balancer
########################################################################
resource "aws_lb" "this" {
  name               = var.default_name
  load_balancer_type = "network"
  internal           = true
  subnets            = [aws_subnet.this["dmz1"].id, aws_subnet.this["dmz2"].id]
  #Security groups are not supported for load balancers with type 'network'
  #security_groups                  = [aws_security_group.this.id]
  enable_cross_zone_load_balancing = true
  enable_deletion_protection       = false
}

resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_lb.this.id
  port              = 80
  protocol          = "TCP" #Or TLS in case or SSL
  #  ssl_policy        = var.lb_protocol == "TLS" ? var.ssl_policy_attributes["value"] : ""
  #  certificate_arn   = var.lb_protocol == "TLS" ? var.lb_ssl_cert_arn : ""

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}

resource "aws_lb_target_group" "this" {
  name        = var.default_name
  port        = 80
  protocol    = "TCP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path     = null
    protocol = "TCP"
    matcher  = null
  }

  lifecycle {
    create_before_destroy = true
  }
}

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
