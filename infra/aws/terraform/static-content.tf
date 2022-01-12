locals {
    upload_directory = "${path.cwd}/static-content/"
    mime_types = {
        htm   = "text/html"
        html  = "text/html"
        css   = "text/css"
        ttf   = "font/ttf"
        js    = "application/javascript"
        map   = "application/javascript"
        json  = "application/json"
  }
}

resource "aws_s3_bucket_object" "website_files" {
  for_each      = fileset(local.upload_directory, "**/*.*")
  bucket        = aws_s3_bucket.this.id
  key           = replace(each.value, local.upload_directory, "")
  source        = "${local.upload_directory}${each.value}"
  etag          = filemd5("${local.upload_directory}${each.value}")
  content_type  = lookup(local.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])
}
