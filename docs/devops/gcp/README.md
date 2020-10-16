# Deploy Titus on GCP

To set up a [Titus] deployment on an [GCP] cloud using [Github Actions], there are few steps to be performed.

**Note:** [Terraform] 0.12+ is required for the infrastructure creation.

## Infrastructure Stack
The stack is built with minimum number of services to make Titus work on GCP:
- Cloudrun services (frontend, backend, db-manager, storybook)
- CloudSQL (PostgreSQL DB)

The stack serves only as an example and is expected to be adjusted or changed base on project needs.

**Note:** Cloudrun has few limitations (doesn't support Websockets, etc..) which should be considered before using - [Cloud Run Known Issues](https://cloud.google.com/run/docs/issues).

## Set up a Terraform GCP Service Account

To allow Terraform to provision services on GCP we need to give it a service account with right permissions.

In GCP web console navigate to `IAM & Admin / Service Accounts` and create a new service account with `Project Owner` role. Then create a key from it and download it as `key.json` into `infra/terraform/gcp`.


## Configure GCP project variables

Create a `infra/terraform/gcp/config.auto.tfvars` file and fill it with adjusted content of `infra/terraform/gcp/config.auto.tfvars.sample`. You must set these variables to match your GCP project:
- `gcp_project_id`
- `region`
- `zone`

## Enable GCP APIs
Titus uses multiple GCP services and for all of them Terraform expects their APIs to be enabled.

For provisioning Titus on fresh new GCP project these service APIs need to be enabled:
```
gcloud auth login
gcloud config set project <GCP_PROJECT_ID>

gcloud services enable sqladmin.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable iam.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

## Provision infrastruture

From `infra/terraform/gcp` folder run these commands from your terminal:
```sh
terraform init
terraform apply
```

At this point the provisioning of all required GCP services is done.

All Cloudrun services are deployed with default "Hello World" docker image provided by GCP. These images get replaced by Titus images on their first deployment via CD pipeline.


## GitHub configuration

Next we will deploy all Titus packages to the new GCP infrastruture.

Open your app repository `Settings / Secrets` and add the following secrets:
- `GCP_PROJECT_ID`:  Put in the id of your GCP project. You may find it in gcp web console or in `key.json` service account file
- `GCP_SA_EMAIL`: Copy value from GCP Secret Manager secret `github-actions-service-account-email` into the secret value
- `GCP_SA_KEY`: Copy value from GCP Secret Manager secret `github-actions-service-account` into the secret value

**Note:** You need to be a repository owner to set Github repository secrets.

## Deploying

Deployment of Titus packages by GitHub Actions is controlled by file changes in their folders where only `master` branch changes are followed.

To trigger deployment of all packages (backend/frontend/etc..) we need to make a change in all of their folders and push it to `master` branch. We may for example increase the `package.json` version in each of them.

Deployment progress and logs can be followed in GitHub Actions section of the repository.

## Verifying GCP deployment

- Click the Frontend link in it's GCP Console / Cloud Run page to see Titus
- Click the Storybook link in it's GCP Console / Cloud Run page to see Titus Storybook, login with `admin:admin`
- Click the Backend link in it's GCP Console / Cloud Run page, then and add `/healthcheck` at the end of the URL. The response is JSON payload that included a "DB" property that indicate the Titus Backend can connect to the provisioned GCP Database

At this point you have Titus running on your GCP account. 

[GCP]: https://console.cloud.google.com
[Github Actions]: https://github.com/features/actions
[Titus]: https://github.com/nearform/titus
[Terraform]: https://www.terraform.io