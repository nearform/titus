terraform {
  backend "gcs" {
    credentials = "key.json"
    bucket      = "titus-terraform-state"
    prefix      = "core"
  }
}

provider "google" {
  credentials = file("key.json")
  project     = var.gcp_project_id
  region      = var.region
  zone        = var.zone
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}