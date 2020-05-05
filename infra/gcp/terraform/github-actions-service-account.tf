resource "google_service_account" "github_actions" {
  account_id   = "github-actions"
  display_name = "github-actions"
}

resource "google_service_account_key" "github_actions" {
  service_account_id = google_service_account.github_actions.name
}

resource "google_secret_manager_secret" "github_actions_sa" {
  provider = google-beta

  secret_id = "github-actions-service-account"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "github_actions_sa" {
  provider = google-beta

  secret = google_secret_manager_secret.github_actions_sa.id

  secret_data = google_service_account_key.github_actions.private_key
}

resource "google_storage_bucket_iam_member" "github_actions_us_gcr" {
  bucket = "artifacts.${var.gcp_project_id}.appspot.com"
  role   = "roles/storage.admin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_cloud_run_service_iam_member" "github_actions_backend" {
  location = google_cloud_run_service.backend.location
  service = google_cloud_run_service.backend.name
  role = "roles/run.admin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_cloud_run_service_iam_member" "github_actions_frontend" {
  location = google_cloud_run_service.frontend.location
  service = google_cloud_run_service.frontend.name
  role = "roles/run.admin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_cloud_run_service_iam_member" "github_actions_db_manager" {
  location = google_cloud_run_service.db_manager.location
  service = google_cloud_run_service.db_manager.name
  role = "roles/run.admin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_cloud_run_service_iam_member" "github_actions_storybook" {
  location = google_cloud_run_service.storybook.location
  service = google_cloud_run_service.storybook.name
  role = "roles/run.admin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_project_iam_member" "github_actions_service_account_user" {
  role    = "roles/iam.serviceAccountUser"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}