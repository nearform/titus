resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "aws_secretsmanager_secret" "db_password" {
  name = format("%s-db-password", var.default_name)
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result
}

resource "aws_db_instance" "this" {
  allocated_storage    = 5
  engine               = "postgres"
  engine_version       = "12.6"
  instance_class       = "db.t3.micro"
  name                 = var.default_name
  username             = var.default_name
  password             = random_password.db_password.result
  db_subnet_group_name = aws_db_subnet_group.this.name
  skip_final_snapshot  = true
}