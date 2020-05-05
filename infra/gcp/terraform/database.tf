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

resource "google_sql_user" "main" {
  name     = var.cloudsql_db_user
  password = var.cloudsql_db_password
  instance = google_sql_database_instance.main.name
}
