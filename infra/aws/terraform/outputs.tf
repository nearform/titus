output "db_name" {
  value = aws_db_instance.this.name
  sensitive = true
}

output "db_password" {
  sensitive = true
  value = random_password.db_password.result
}