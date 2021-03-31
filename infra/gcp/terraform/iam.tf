
resource "google_project_iam_binding" "db_access_iam" {
  depends_on = [
    google_service_account.backend,
    google_service_account.db_manager
  ]
  role = "roles/cloudsql.client"
  members = [
    "serviceAccount:${google_service_account.backend.email}",
    "serviceAccount:${google_service_account.db_manager.email}"
  ]
}
