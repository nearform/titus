resource "random_string" "suffix" {
  length      = 6
  min_numeric = 6
  upper       = false
  special     = false
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}
resource "aws_secretsmanager_secret" "db_password" {
  name = "${var.default_name}-${random_string.suffix.result}-db-password"
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
  identifier           = var.default_name
  name                 = "titus_backend"
  username             = "titus_db_user"
  password             = random_password.db_password.result
  db_subnet_group_name = aws_db_subnet_group.this.name
  skip_final_snapshot  = true
  vpc_security_group_ids = [ aws_security_group.this.id ]
}