variable "subscription_id" {
    type    = string
}
variable "resource_group_name" {
    type    = string
}
variable "location" {
    type    = string
    default = "West Europe"
}
variable "titus_domain_name" {
    type    = string
}
variable "titus_network_range" {
    type    = string
    default = "10.0.0.0/16"
}
variable "titus_subnet_range" {
    type    = string
    default = "10.0.1.0/24"
}

variable "db_user" {
    type    = string
    default = "titus"
}
variable "db_instance_name" {
    type    = string
    default = "titus"
}

variable "artifact_registry_repository_name" {
    type    = string
    default = "tituscr"
}

variable "tags" {
    default = {
        "environment": "development"
        "project": "titus"
    }
}

