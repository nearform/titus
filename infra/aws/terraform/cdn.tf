resource "aws_cloudfront_distribution" "this" {
  enabled = true
  aliases = [format("%s-ui", var.default_name)]

  comment = var.default_name

  origin {
    domain_name = "${aws_api_gateway_rest_api.main.id}.execute-api.${var.region}.amazonaws.com"
    origin_path = "/${var.environment}"
    origin_id   = "api"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1"]
    }
  }
  origin {
    domain_name = "${aws_api_gateway_rest_api.main.id}.execute-api.${var.region}.amazonaws.com"
    origin_path = "/${var.environment}"
    origin_id   = "config"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1"]
    }
  }

  origin {
    domain_name = format("s3-content.%s.%s.vittle.ai.s3.amazonaws.com", var.region, var.environment)
    origin_path = "/static-content"
    origin_id   = format("S3-content.%s.%s.vittle.ai/static-content", var.region, var.environment)
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = aws_api_gateway_rest_api.main.id

    forwarded_values {
      query_string = true
      headers      = ["Accept", "Authorization", "CloudFront-Forwarded-Proto", "Host", "Origin"]

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https" #if api-gw is supporting TLS
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
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

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn      = "" #Requires Cert ARN
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }
}