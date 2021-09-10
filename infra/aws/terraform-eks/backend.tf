
resource "aws_ecr_repository" "this" {
  name = var.default_name
}

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
