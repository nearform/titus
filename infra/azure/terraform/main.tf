terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.66.0"
    }
  }
}

#terraform {
#  backend "azurerm" {
#    resource_group_name  = "DevOps_BenchTesting_MA_Jun21"
#    storage_account_name = "titusazure2"
#    container_name       = "tfstate"
#    key                  = "terraform.tfstate"
#  }
#}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
  subscription_id = var.resource_group_id
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
