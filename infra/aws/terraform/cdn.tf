resource "aws_cloudfront_distribution" "this" {
  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["HEAD", "GET", "OPTIONS"]
    compress               = "true"
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
    target_origin_id       = regex("titus-[a-z0-9]+.elb.[a-z-0-9]+.amazonaws.com","${aws_api_gateway_integration.api.uri}")
    viewer_protocol_policy = "allow-all"
  }

  enabled         = "true"
  http_version    = "http2"
  is_ipv6_enabled = "true"

  origin {
    domain_name = regex("titus-[a-z0-9]+.elb.[a-z-0-9]+.amazonaws.com","${aws_api_gateway_integration.api.uri}")
    origin_id   = regex("titus-[a-z0-9]+.elb.[a-z-0-9]+.amazonaws.com","${aws_api_gateway_integration.api.uri}")
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
    domain_name = format("s3-content.%s.%s.vittle.ai.s3.amazonaws.com", var.region, var.environment)
    origin_path = "/static-content"
    origin_id   = format("S3-content.%s.%s.vittle.ai/static-content", var.region, var.environment)
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
    target_origin_id       = format("S3-content.%s.%s.vittle.ai/static-content", var.region, var.environment)
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
