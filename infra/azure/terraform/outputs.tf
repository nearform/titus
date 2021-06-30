output "fontend_fqdn" {
  description = "Frontend FQDN"
  value       = azurerm_container_group.titus-frontend-containergroup.fqdn
}

output "backend_fqdn" {
  description = "Backend FQDN"
  value       = azurerm_container_group.titus-frontend-containergroup.fqdn
}

output "db_host" {
  description = "Database Server URL"
  value       = azurerm_postgresql_server.titus-db-server.fqdn
}

output "db_user" {
  description = "Database user"
  value       = "${var.db_user}@${azurerm_postgresql_server.titus-db-server.name}"
}

output "db_password" {
  description = "Database password"
  value       = "You can extract it from the keyvault or the terraform.tfstate file"
}