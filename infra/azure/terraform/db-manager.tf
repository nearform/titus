resource "azurerm_container_group" "titus-db-manager-containergroup" {
  #name                = "titus-db-manager-group-${random_string.suffix.result}"
  name                = "titus-db-manager"
  location            = var.location
  resource_group_name = var.resource_group_name
  ip_address_type     = "public"
  dns_name_label      = "titus-db-manager-${random_string.suffix.result}"
  #network_profile_id  = azurerm_network_profile.titus-net-profile.id
  os_type             = "Linux"
  image_registry_credential {
    username = azurerm_container_registry.titus-container-registry.admin_username
    password = azurerm_container_registry.titus-container-registry.admin_password
    server   = "${var.artifact_registry_repository_name}.azurecr.io"
  }

  container {
    name   = "titus-db-manager-${random_string.suffix.result}"
    #image  = "microsoft/aci-helloworld:latest"
    image  = "${var.artifact_registry_repository_name}.azurecr.io/titus-db-manager:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = "3002"
      protocol = "TCP"
    }

    environment_variables = {
      "HTTP_HOST"    = "0.0.0.0"
      "HTTP_PORT"    = "3002"
      "PG_HOST"     = azurerm_postgresql_server.titus-db-server.fqdn
      "PG_PORT"     = "5432"
      "PG_DATABASE" = azurerm_postgresql_database.titus-db.name
      "PG_USER"     = "${var.db_user}@${azurerm_postgresql_server.titus-db-server.name}"
      "PG_PASSWORD"     = azurerm_key_vault_secret.titus-db-password.value
      "SECRETS_STRATEGY" = "env"
      "SECRETS_PG_PASS" = "PG_PASSWORD"
      "JWT_SECRET"  = azurerm_key_vault_secret.titus-jwt-secret.value
      "NODE_ENV"    = "development"
      "AUTH0_DOMAIN" = "dummy"
    }
  }

  tags = var.tags
}

