resource "azurerm_container_registry" "titus-container-registry" {
  name                     = var.artifact_registry_repository_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  sku                      = "Standard"
  admin_enabled            = true
  
  #georeplication_locations = ["East US", "West Europe"]
}
