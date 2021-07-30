resource "aws_cognito_user_pool" "user_pool" {
  name                = format("%s-user-pool", var.default_name)
  username_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name                         = format("%s-user-pool-client", var.default_name)
  user_pool_id                 = aws_cognito_user_pool.user_pool.id
  #allowed_oauth_flows          = ["client_credentials"]
  callback_urls                = ["http://localhost"]
  default_redirect_uri         = "http://localhost"
  allowed_oauth_scopes         = aws_cognito_resource_server.resource_server.scope_identifiers
  supported_identity_providers = ["COGNITO"]
}


resource "aws_cognito_resource_server" "resource_server" {
  name         = var.default_name
  identifier   = "https://api.${var.domain_name}"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  scope {
    scope_name        = "all"
    scope_description = "Access to all API GW endpoints."
  }
}

resource "aws_cognito_user_pool_domain" "main" {
  domain          = "${var.default_name}-${random_string.suffix.result}-login"
  user_pool_id    = aws_cognito_user_pool.user_pool.id
  certificate_arn = "" # Certificate ARN
}
