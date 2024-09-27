terraform {
    required_version = ">=1.9.5"

    required_providers {
      aws = ">=5.67.0"
      local = ">=2.5.2"
    }
}

provider "aws" {
  region = "us-east-1"
}