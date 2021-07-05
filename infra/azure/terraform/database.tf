resource "random_string" "suffix" {
  length      = 6
  min_numeric = 6
  upper       = false
  special     = false
}

resource "azurerm_postgresql_server" "titus-db-server" {
  name                = "titus-postgresql-server-${random_string.suffix.result}"
  location            = var.location
  resource_group_name = var.resource_group_name

  sku_name = "B_Gen5_2"

  #storage_mb                   = 5120
  #backup_retention_days        = 7
  #geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = var.db_user
  administrator_login_password = azurerm_key_vault_secret.titus-db-password.value
  version                      = "11"
  ssl_enforcement_enabled      = false
  #public_network_access_enabled    = false
}

resource "azurerm_postgresql_database" "titus-db" {
  name                = var.db_instance_name
  resource_group_name = var.resource_group_name
  server_name         = azurerm_postgresql_server.titus-db-server.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

resource "azurerm_postgresql_firewall_rule" "titus-fw-rule" {
  name                = "titus-db-fw-rule"
  resource_group_name = var.resource_group_name
  server_name         = azurerm_postgresql_server.titus-db-server.name
  # Allow Access to Azure Services/Container Instances
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}