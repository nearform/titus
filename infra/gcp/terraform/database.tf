resource "random_string" "suffix" {
  length      = 6
  min_numeric = 6
  upper       = false
  special     = false
}

resource "google_sql_database_instance" "main" {
  name             = "${var.cloudsql_db_instance_name}-${random_string.suffix.result}"
  database_version = "POSTGRES_11"
  region           = var.region

  settings {
    tier = var.cloudsql_tier
    ip_configuration {
      ipv4_enabled = true
    }
  }
}

resource "google_sql_database" "main" {
  name     = var.cloudsql_db_name
  instance = google_sql_database_instance.main.name
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "google_secret_manager_secret" "db_password" {
  provider = google-beta

  secret_id = "${var.cloudsql_db_instance_name}-db-password"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "db_password" {
  provider = google-beta

  secret      = google_secret_manager_secret.db_password.id
  secret_data = random_password.db_password.result
}

resource "google_sql_user" "main" {
  name     = var.cloudsql_db_user
  password = random_password.db_password.result
  instance = google_sql_database_instance.main.name
}
