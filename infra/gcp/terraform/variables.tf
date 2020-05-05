variable "gcp_project_id" {
  default = "upheld-dragon-268810" # Nearform GCP org - Titus
}

variable "region" {
  default = "europe-west1"
}

variable "zone" {
  default = "europe-west1-b"
}

variable "cloudsql_db_instance_name" {
  default = "titus"
}

variable "cloudsql_tier" {
  default = "db-custom-1-3840" # where 1 means 1 CPU and 3840 means 3,75GB RAM
}

variable "cloudsql_db_name" {
  default = "titus"
}

variable "cloudsql_db_user" {
  default = "titus"
}

variable "cloudsql_db_password" {
  default = "titus"
}