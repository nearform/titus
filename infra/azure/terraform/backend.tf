resource "azurerm_container_group" "titus-backend-containergroup" {
  #name                = "titus-backend-group-${random_string.suffix.result}"
  name                = "titus-backend"
  location            = var.location
  resource_group_name = var.resource_group_name
  ip_address_type     = "public"
  dns_name_label      = "titus-backend-${random_string.suffix.result}"
  #network_profile_id  = azurerm_network_profile.titus-net-profile.id
  os_type             = "Linux"
  image_registry_credential {
    username = azurerm_container_registry.titus-container-registry.admin_username
    password = azurerm_container_registry.titus-container-registry.admin_password
    server   = "${var.artifact_registry_repository_name}.azurecr.io"
  }

  container {
    name   = "titus-backend-${random_string.suffix.result}"
    #image  = "microsoft/aci-helloworld:latest"
    image  = "${var.artifact_registry_repository_name}.azurecr.io/titus-backend:latest"
    cpu    = "1"
    memory = "1.5"

    ports {
      port     = "8080"
      protocol = "TCP"
    }

    environment_variables = {
      "API_HOST"    = "0.0.0.0"
      "API_PORT"    = "8080"
      "CORS_ORIGIN" = azurerm_container_group.titus-frontend-containergroup.fqdn
      "PG_HOST"     = azurerm_postgresql_server.titus-db-server.fqdn
      "PG_PORT"     = "5432"
      "PG_DB"       = azurerm_postgresql_database.titus-db.name
      "PG_USER"     = "${var.db_user}@${azurerm_postgresql_server.titus-db-server.name}"
      "PG_PASS"     = azurerm_key_vault_secret.titus-db-password.value
      #"SECRETS_STRATEGY" = "gcp"
      "SECRETS_PG_PASS" = "PG_PASS"
      "JWT_SECRET"  = "1234abcd"
      "NODE_ENV"    = "development"
      "AUTH0_DOMAIN" = "dummy"
    }
  }

  tags = {
    environment = "titus-azure"
  }
}




