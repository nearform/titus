# Deploy Titus on GCP

To set up a [Titus] deployment on an [GCP] environment using [Github Actions], there are several steps to perform.


In order to deploy Titus in GCP follow the following steps.
Note: [Terraform] 0.12+ is required for the infrastructure creation.


## Set up the Service Account

This is created by Terraform script in Titus. Open the IAM / Service Account, select the new account and download it as `key.json` into infra/terraform/gcp
Alternatively, you can create it manually:

* In IAM go to Service Account and create a new one with role of `Project Owner`
* Copy the provided `key.json` into infra/terraform/gcp and click Done


## Configure Terraform variables

Edit `infra/terraform/gcp/variables.tf` and change the `gcp_project_id` and optionally set the `region` and `zone`.


## Create your infrastruture

* In a new shell change directory to `infra/terraform/gcp`.
* Run `terraform init`
* Run `terraform apply`: a few errors are expected at this point since you may not have activated GCP API's required for Titus and Terraform.
* Activate the API's described in each error by following the link in each error and activate the related API. The API's are: `Secret Manager API`, `Cloud SQL Admin API`, `Cloud Run API`, `Identity and Access Management (IAM) API` 
* Run `terraform apply` again, your resources are now added in the GCP project.

At this point you have finished provisioning your GCP project.
A GCP provided "Hello World" frontend app is running as your frontend, you can click the link to see it works. 

Next we will deploy all Titus packages to the new GCP infrastruture.


## GitHub configuration

 Open your forked repository Settings page and select Secrets.
 Add the following secrets:

 *  `GCP_PROJECT_ID`:  Copy value from `key.json` into the secret value
 *  `GCP_SA_EMAIL`: Copy value from `key.json` into the secret value
 *  `GCP_SA_KEY`: run `cat key.json | base64`, copy the value into the secret value

## Deploying

To deploy we use GitHub Actions, these run by default on changes on `master`, to each of Titus packages. 
To trigger all to deploy you need to make a change in all of them, like for example increasing in each one the package version, then, merge your current changes into your `master` and push to GitHub. Now open the GitHub Actions page to see the workflows running and the deployment logs.

## Verifying your GCP deployment

* Click the Frontend link in it's GCP Console / Cloud Run page to see Titus
* Click the Storybook link in it's GCP Console / Cloud Run page to see Titus Storybook, login with `admin:admin`
* Click the Backend link in it's GCP Console / Cloud Run page, then and add `/healthcheck` at the end of the URL. The response is JSON payload that included a "DB" property that indicate the Titus Backend can connect to the provisioned GCP Database

At this point you have Titus running on your GCP account. 
To update it with new features you only need to merge into repository `master` branch and follow the deployment in Github Actions.


[GCP]: https://console.cloud.google.com
[Github Actions]: https://github.com/features/actions
[Titus]: https://github.com/nearform/titus
[Terraform]: https://www.terraform.io
