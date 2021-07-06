# #########################################
# API Gateway REST API
# #########################################
resource "aws_api_gateway_rest_api" "main" {
  name                     = format("%s-gw", var.default_name)
  minimum_compression_size = -1
}

#### Please uncomment for GW custom domain - Requires a Certificate and DNS 
#resource "aws_api_gateway_domain_name" "main" {
#  certificate_arn = var.gateway_api_certificate_arn
#  domain_name     = var.api_dns
#  security_policy = "TLS_1_2"
#}

#resource "aws_api_gateway_base_path_mapping" "path_mapping" {
#  base_path = "v1"
#
#  api_id      = aws_api_gateway_rest_api.main.id
#  domain_name = aws_api_gateway_domain_name.main.domain_name
#  stage_name  = aws_api_gateway_deployment.live.stage_name
#}

# #########################################
# /config
# #########################################
resource "aws_api_gateway_resource" "config" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  parent_id   = aws_api_gateway_rest_api.main.root_resource_id
  path_part   = "config"
}

resource "aws_api_gateway_method" "config" {
  rest_api_id      = aws_api_gateway_rest_api.main.id
  resource_id      = aws_api_gateway_rest_api.main.root_resource_id
  http_method      = "GET"
  authorization    = "NONE"
  api_key_required = false
}

resource "aws_api_gateway_integration" "config" {
  rest_api_id             = aws_api_gateway_rest_api.main.id
  resource_id             = aws_api_gateway_rest_api.main.root_resource_id
  http_method             = aws_api_gateway_method.config.http_method
  timeout_milliseconds    = 29000
  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  connection_type         = "VPC_LINK"
  connection_id           = aws_api_gateway_vpc_link.this.id
  uri                     = format("http://%s/config", aws_lb.this.dns_name)
}

resource "aws_api_gateway_method_response" "config" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_rest_api.main.root_resource_id
  http_method = aws_api_gateway_method.config.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "config" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_rest_api.main.root_resource_id
  http_method = aws_api_gateway_method.config.http_method
  status_code = "200"

  depends_on = [
    aws_api_gateway_integration.config
  ]
}

# #########################################
# /api
# #########################################
resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  parent_id   = aws_api_gateway_rest_api.main.root_resource_id
  path_part   = "api"
}

resource "aws_api_gateway_method" "api" {
  rest_api_id          = aws_api_gateway_rest_api.main.id
  resource_id          = aws_api_gateway_rest_api.main.root_resource_id
  http_method          = "ANY"
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = aws_api_gateway_authorizer.main.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_api_gateway_integration" "api" {
  rest_api_id             = aws_api_gateway_rest_api.main.id
  resource_id             = aws_api_gateway_rest_api.main.root_resource_id
  http_method             = aws_api_gateway_method.api.http_method
  timeout_milliseconds    = 29000
  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  connection_type         = "VPC_LINK"
  connection_id           = aws_api_gateway_vpc_link.this.id
  uri                     = format("http://%s/api", aws_lb.this.dns_name)
}

resource "aws_api_gateway_method_response" "api" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_rest_api.main.root_resource_id
  http_method = aws_api_gateway_method.api.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "api" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_rest_api.main.root_resource_id
  http_method = aws_api_gateway_method.api.http_method
  status_code = "200"

  depends_on = [
    aws_api_gateway_integration.api
  ]
}

resource "aws_api_gateway_authorizer" "main" {
  name          = format("%s-auth", var.default_name)
  rest_api_id   = aws_api_gateway_rest_api.main.id
  type          = "COGNITO_USER_POOLS"
  provider_arns = [aws_cognito_user_pool.user_pool.arn]
}

resource "aws_api_gateway_vpc_link" "this" {
  name        = format("%s-gw", var.default_name)
  description = "Provides access to VPC related resources"
  target_arns = [aws_lb.this.arn]
}

# #########################################
# API Gateway Deployment
# #########################################
resource "aws_api_gateway_deployment" "live" {
  rest_api_id       = aws_api_gateway_rest_api.main.id
  stage_description = ""

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_integration.api
  ]
}

resource "aws_api_gateway_account" "gw" {
  cloudwatch_role_arn = aws_iam_role.gateway.arn
}

resource "aws_cloudwatch_log_group" "api_gateway" {
  name              = format("%s-gw-access-logs", var.default_name)
  retention_in_days = 1
}

resource "aws_api_gateway_stage" "live" {
  deployment_id = aws_api_gateway_deployment.live.id
  rest_api_id   = aws_api_gateway_rest_api.main.id
  stage_name    = "live"
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway.arn
    format          = "[$context.requestTime] \"$context.httpMethod $context.path $context.protocol\" $context.status [$context.identity.userAgent] $context.responseLength $context.requestId"
  }

  lifecycle {
    ignore_changes = [
      cache_cluster_size
    ]
  }
}

# #########################################
# IAM 
# #########################################
data "aws_iam_policy_document" "gw_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "gateway" {
  name               = format("%s-gw", var.default_name)
  assume_role_policy = data.aws_iam_policy_document.gw_assume_role_policy.json
}

data "aws_iam_policy_document" "gw" {
  statement {
    actions = ["logs:*"]
    resources = [
      "*"
    ]
  }
}

resource "aws_iam_policy" "gw" {
  name   = format("%s-gw", var.default_name)
  path   = "/"
  policy = data.aws_iam_policy_document.gw.json
}

resource "aws_iam_role_policy_attachment" "gw" {
  role       = aws_iam_role.gateway.name
  policy_arn = aws_iam_policy.gw.arn
}





