resource "google_cloud_run_service_iam_member" "frontend_noauth" {
  location = google_cloud_run_service.frontend.location
  service  = google_cloud_run_service.frontend.name
  role = "roles/run.invoker"
  member = "allUsers"
}

resource "google_cloud_run_service" "frontend" {
  name     = "titus-frontend"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/cloudrun/hello"
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