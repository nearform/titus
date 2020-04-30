resource "google_cloud_run_service_iam_policy" "db_manager_noauth" {
  location = google_cloud_run_service.db_manager.location
  project  = google_cloud_run_service.db_manager.project
  service  = google_cloud_run_service.db_manager.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_service" "db_manager" {
  name     = "titus-db-manager"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/cloudrun/hello"
        env {
          name  = "HTTP_HOST"
          value = "0.0.0.0"
        }
        env {
          name  = "HTTP_PORT"
          value = "8080"
        }
        env {
          name  = "PGHOST"
          value = "/cloudsql/${var.gcp_project_id}:${var.region}:${google_sql_database_instance.main.name}"
        }
        env {
          name  = "PGPORT"
          value = "5432"
        }
        env {
          name  = "PGDATABASE"
          value = var.cloudsql_db_name
        }
        env {
          name  = "PGUSER"
          value = var.cloudsql_db_user
        }
        env {
          name  = "PGPASSWORD"
          value = var.cloudsql_db_password
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
      "template[0].spec[0].containers[0].image",
      "template[0].spec[0].service_account_name"
    ]
  }
}