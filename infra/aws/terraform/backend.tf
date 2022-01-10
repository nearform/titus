############################# ECS Related ########################
resource "aws_ecs_cluster" "this" {
  name = var.default_name
}

resource "aws_ecr_repository" "this" {
  name = var.default_name
}

resource "aws_ecs_task_definition" "titus" {
  family                   = var.default_name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 512
  memory                   = 1024
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  #container_definitions = format("[%s]", local.api_json_map)
  container_definitions = jsonencode([
    {
      name = var.default_name
      #image     = "711655675495.dkr.ecr.eu-west-1.amazonaws.com/damian-titus-backend:3b406043-24b7-4cbb-b5cd-0303dca66a8f"
      image     = format("%s:latest", aws_ecr_repository.this.repository_url)
      cpu       = 512
      memory    = 1024
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options: {
          "awslogs-group": aws_cloudwatch_log_group.this.name,
          "awslogs-region": var.region,
          "awslogs-stream-prefix": "ecs"
        }
      }
      environment = [
        {
          name  = "API_HOST"
          value = "0.0.0.0"
        },
        {
          name  = "API_PORT"
          value = "8080"
        },
        # {
        #   name  = "CORS_ORIGIN"
        #   value = google_cloud_run_service.frontend.status.0.url
        # },
        {
          name  = "PG_HOST"
          value = aws_db_instance.this.address,
        },
        {
          name  = "PG_PORT"
          value = "5432"
        },
        {
          name  = "PG_DB"
          value = aws_db_instance.this.name
        },
        {
          name  = "PG_USER"
          value = var.db_user
        },
        {
          name  = "SECRETS_STRATEGY"
          value = "aws"
        },
        {
          name  = "SECRETS_PG_PASS"
          value = aws_secretsmanager_secret.db_password.id
        },
        {
          name  = "JWT_SECRET"
          value = "1234abcd"
        },
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "AUTH0_DOMAIN"
          value = "dummy"
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "titus" {
  name            = var.default_name
  cluster         = aws_ecs_cluster.this.id
  launch_type     = "FARGATE"
  task_definition = aws_ecs_task_definition.titus.arn
  desired_count   = 1
  force_new_deployment = true
  network_configuration {
    security_groups = [aws_security_group.this.id]
    subnets         = [aws_subnet.this["dmz1"].id, aws_subnet.this["dmz2"].id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.this.id
    container_name   = var.default_name
    container_port   = 8080 # Or 443 if certs are created
  }

  depends_on = [
    aws_lb_listener.this
  ]

  lifecycle {
    ignore_changes = [
      task_definition,
      desired_count
    ]
  }
}

########################################################################

########################################################################
# IAM 
########################################################################
data "aws_iam_policy_document" "ecs_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task_execution" {
  name               = "${var.default_name}-task-exec-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task_role" {
  name               = "${var.default_name}-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume_role_policy.json
}

data "aws_iam_policy_document" "ecs_task_policy" {

  statement {
    actions = ["secretsmanager:GetSecretValue"]
    resources = [
      aws_secretsmanager_secret.db_password.arn
    ]

  }

}

resource "aws_iam_policy" "ecs_task_policy" {
  name   = "${var.default_name}-ecs-task-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.ecs_task_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_policy" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.ecs_task_policy.arn
}
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
  cidr_blocks = ["0.0.0.0/0"] # This could also be the network interface IP of the NLB

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
