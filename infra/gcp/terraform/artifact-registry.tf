resource "google_artifact_registry_repository" "main" {
  provider = google-beta

  location = var.region
  repository_id = var.artifact_registry_repository_name
  description = "Application Docker repository"
  format = "DOCKER"
}