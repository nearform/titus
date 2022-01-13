data "aws_cloudfront_cache_policy" "this" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "Static content"
}

locals {
  s3_origin_id    = "static-content"
  apigw_origin_id = "apigw"
}

resource "aws_cloudfront_distribution" "this" {
  enabled          = "true"
  http_version     = "http2"
  is_ipv6_enabled  = "true"
  price_class      = "PriceClass_All"
  retain_on_delete = "false"

  origin {
    domain_name = aws_s3_bucket.this.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = replace(aws_api_gateway_deployment.live.invoke_url, "/^https?://([^/]*).*/", "$1")
    origin_id   = local.apigw_origin_id

    custom_origin_config {
      http_port                = "80"
      https_port               = "443"
      origin_keepalive_timeout = "5"
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = "30"
      origin_ssl_protocols     = ["TLSv1", "TLSv1.2", "TLSv1.1"]
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cache_policy_id        = data.aws_cloudfront_cache_policy.this.id
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "allow-all"
    default_ttl            = 0
    min_ttl                = 0
    max_ttl                = 0
  }

  ordered_cache_behavior {
    path_pattern           = "/api/*"
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["HEAD", "GET", "OPTIONS"]
    compress               = true
    target_origin_id       = local.apigw_origin_id
    viewer_protocol_policy = "allow-all"
    default_ttl            = 0
    min_ttl                = 0
    max_ttl                = 0

    forwarded_values {
      query_string = true
      headers      = ["Accept", "Authorization", "CloudFront-Forwarded-Proto", "Host", "Origin"]

      cookies {
        forward = "all"
      }
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = "true"
    minimum_protocol_version       = "TLSv1"
  }

  depends_on = [
    aws_api_gateway_integration.config,
    aws_api_gateway_integration.api
  ]
}
