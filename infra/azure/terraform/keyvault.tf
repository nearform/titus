resource "azurerm_key_vault" "titus-key-vault" {
  name                       = "tituskeyvault"
  location                   = var.location
  resource_group_name        = var.resource_group_name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "create",
      "get",
      "list"
    ]

    secret_permissions = [
      "set",
      "get",
      "delete",
      "purge",
      "recover",
      "list"
    ]
  }
}

resource "random_password" "jwt-secret" {
  length  = 8
  special = false
}

resource "azurerm_key_vault_secret" "titus-jwt-secret" {
  name         = "titus-jwt-secret-${random_string.suffix.result}"
  value        = random_password.jwt-secret.result
  key_vault_id = azurerm_key_vault.titus-key-vault.id
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "azurerm_key_vault_secret" "titus-db-password" {
  name         = "titus-db-password-${random_string.suffix.result}"
  value        = random_password.db_password.result
  key_vault_id = azurerm_key_vault.titus-key-vault.id
}