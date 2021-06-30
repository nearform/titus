resource "azurerm_container_group" "titus-frontend-containergroup" {
  #name                = "titus-frontend-group-${random_string.suffix.result}"
  name                = "titus-frontend"
  location            = var.location
  resource_group_name = var.resource_group_name
  ip_address_type     = "public"
  dns_name_label      = "titus-frontend-${random_string.suffix.result}"
  #network_profile_id  = azurerm_network_profile.titus-net-profile.id
  os_type             = "Linux"
  image_registry_credential {
    username = azurerm_container_registry.titus-container-registry.admin_username
    password = azurerm_container_registry.titus-container-registry.admin_password
    server   = "${var.artifact_registry_repository_name}.azurecr.io"
  }

  container {
    name   = "titus-frontend-${random_string.suffix.result}"
    image  = "microsoft/aci-helloworld:latest"
    #image  = "${var.artifact_registry_repository_name}.azurecr.io/titus-frontend:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = "8080"
      protocol = "TCP"
    }

    environment_variables = {
      "NODE_ENV" = "development"
      "BROWSER" = "none"
      "REACT_APP_ENABLE_ADMIN" = "false"
      # Set auth provider
      # AD, AUTH0, AWS, MEM, TITUS
      "REACT_APP_AUTH_PROVIDER" = "MEM"
      "REACT_APP_API_PATH" = "http://${azurerm_container_group.titus-backend-containergroup.ip_address}:8080"
      "REACT_APP_ADMIN_API_PATH" = "http://${azurerm_container_group.titus-backend-containergroup.ip_address}:8080/graphql"
    }
  }
  

  tags = {
    environment = "titus-azure"
  }
}




