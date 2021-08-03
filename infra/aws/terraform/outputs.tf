output "db_name" {
  value = aws_db_instance.this.name
}

output "secretmanager_db_password" {
  value = aws_secretsmanager_secret.db_password.id
}