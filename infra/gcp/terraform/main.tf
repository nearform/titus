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

provider "google-beta" {
  credentials = file("key.json")
  project     = var.gcp_project_id
  region      = var.region
  zone        = var.zone
}