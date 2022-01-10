resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "Static content"
}

locals {
  s3_origin_id = "static-content"
}

resource "aws_cloudfront_distribution" "this" {
  default_cache_behavior {
    allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods  = ["HEAD", "GET", "OPTIONS"]
    compress        = "true"
    forwarded_values {
      query_string = true
      headers      = ["Accept", "Authorization", "CloudFront-Forwarded-Proto", "Host", "Origin"]

      cookies {
        forward = "all"
      }
    }
    default_ttl            = "0"
    max_ttl                = "0"
    min_ttl                = "0"
    smooth_streaming       = "false"
    target_origin_id       = regex(format("%s-[a-z0-9]+.elb.[a-z-0-9]+.amazonaws.com", var.default_name), "${aws_api_gateway_integration.api.uri}")
    viewer_protocol_policy = "allow-all"
  }

  enabled         = "true"
  http_version    = "http2"
  is_ipv6_enabled = "true"

  origin {
    domain_name = regex(format("%s-[a-z0-9]+.elb.[a-z-0-9]+.amazonaws.com", var.default_name), "${aws_api_gateway_integration.api.uri}")
    origin_id   = regex(format("%s-[a-z0-9]+.elb.[a-z-0-9]+.amazonaws.com", var.default_name), "${aws_api_gateway_integration.api.uri}")
    origin_path = "/api"

    custom_origin_config {
      http_port                = "80"
      https_port               = "443"
      origin_keepalive_timeout = "5"
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = "30"
      origin_ssl_protocols     = ["TLSv1", "TLSv1.2", "TLSv1.1"]
    }
  }

  origin {
    domain_name = aws_s3_bucket.this.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
    origin_path = "/static-content"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  ordered_cache_behavior {
    path_pattern           = "/static-content"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "all"
      }
    }
  }

  retain_on_delete = "false"

  viewer_certificate {
    cloudfront_default_certificate = "true"
    minimum_protocol_version       = "TLSv1"
  }
  depends_on = [
    aws_api_gateway_integration.config,
    aws_api_gateway_integration.api
  ]
}
