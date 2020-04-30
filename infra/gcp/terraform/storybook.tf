resource "google_cloud_run_service_iam_policy" "storybook_noauth" {
  location = google_cloud_run_service.storybook.location
  project  = google_cloud_run_service.storybook.project
  service  = google_cloud_run_service.storybook.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_service" "storybook" {
  name     = "titus-storybook"
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
      "template[0].spec[0].containers[0].image",
      "template[0].spec[0].service_account_name"
    ]
  }
}