terraform {
  required_version = ">= 1.0.0"

  #  backend "s3" {
  #    profile        = "titus"
  #    bucket         = "titus-aws-update"
  #    key            = "titus-state-file"
  #    region         = "eu-west-1"
  #    dynamodb_table = "titus-terraform-state-lock"
  #    encrypt        = true
  #  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.47.0"
    }
  }
}

provider "aws" {
  profile = "titus"
  region  = "eu-west-1"
}
