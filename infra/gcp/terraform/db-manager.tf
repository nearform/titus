resource "google_cloud_run_service_iam_member" "db_manager_noauth" {
  location = google_cloud_run_service.db_manager.location
  service  = google_cloud_run_service.db_manager.name
  role = "roles/run.invoker"
  member = "allUsers"
}

resource "google_cloud_run_service" "db_manager" {
  name     = "titus-db-manager"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/cloudrun/hello"
        ports {
          container_port = "8080"
        }
        env {
          name  = "HTTP_HOST"
          value = "0.0.0.0"
        }
        env {
          name  = "HTTP_PORT"
          value = "8080"
        }
        env {
          name  = "PG_HOST"
          value = "/cloudsql/${var.gcp_project_id}:${var.region}:${google_sql_database_instance.main.name}"
        }
        env {
          name  = "PG_PORT"
          value = "5432"
        }
        env {
          name  = "PG_DATABASE"
          value = var.cloudsql_db_name
        }
        env {
          name  = "PG_USER"
          value = var.cloudsql_db_user
        }
        env {
          name  = "SECRETS_STRATEGY"
          value = "gcp"
        }
        env {
          name  = "SECRETS_PG_PASS"
          value = "${google_secret_manager_secret.db_password.id}/versions/latest"
        }
        env {
          name  = "NODE_ENV"
          value = "production"
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "1000"
        "run.googleapis.com/cloudsql-instances" = "${var.gcp_project_id}:${var.region}:${google_sql_database_instance.main.name}"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  autogenerate_revision_name = true

  lifecycle {
    ignore_changes = [
      template[0].spec[0].containers[0].image,
      template[0].spec[0].service_account_name,
      template[0].metadata[0].annotations
    ]
  }
}