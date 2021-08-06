terraform {
  required_version = ">= 1.0.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.71.0"
    }
  }
}

# (Optional) store terraform state in a storage account
# terraform {
#   backend "azurerm" {
#     resource_group_name  = "titus-rg"
#     storage_account_name = "titusonazure"
#     container_name       = "tfstate"
#     key                  = "terraform.tfstate"
#   }
# }

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  skip_provider_registration = true
}

data "azurerm_client_config" "current" {
}

output "account_id" {
  value = data.azurerm_client_config.current.client_id
}

output "tenant_id" {
  value = data.azurerm_client_config.current.tenant_id
}

output "subscription_id" {
  value = data.azurerm_client_config.current.subscription_id
}
