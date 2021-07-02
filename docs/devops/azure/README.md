# Deploy Titus on Azure

To set up a [Titus] deployment on an [Azure] cloud using [Azure DevOps], there are few steps to be performed.

## Requirements:
- Azure account, a Resource Group and Owner permissions for it.
- Azure Storage Account to use as a backend for terraform and store the terraform state file, plus a container called tfstate in it and network access to it from your local machine.
- Azure CLI client installed.
- Terraform 0.15 or newer.


## Infrastructure Stack

The stack is built with minimum number of services to make Titus work on Azure:
- **titus-vnet**: Azure network and subnet inside of it.
- **titus-postgresql-server-XXXXXX**: Postgres SQL server and a "titus" DB in it.
- **tituskeyvault**: to store the DB password.
- **tituscr**: Azure Container Registry to store the container images.
- **titus-backend**: Container Instances for the backend. (default helloworld image on first run)
- **titus-frontend**: Container Instances for the frontend. (default helloworld image on first run)
- **titus-db-manager**: Container Instances for the db-manager. (default helloworld image on first run)


## Terraform and Azure account

After installing Azure CLI, run:
```
az login
```

Use your credentials to make sure you'll be able to run Terraform against your Azure account and Resource Group.

Sometimes the az login takes some time to finish, wait for the output showing the account details (containing tenantId, ...)


## Provision infrastruture with Terraform

Go to infra > azure > terraform

```
# Get this information from your Azure account manager
resource_group_id = "**********-****-****-****-************"
resource_group_name = "**********************"
location = "***** ******"

# Default values for the postgres DB
db_user = "titus"
db_instance_name = "titus"

# Default values for the Azure Container Registry, if you change it you will have to adapt the pipeline yaml files accordingly
artifact_registry_repository_name = "tituscr"
```

**For the first run, since there is no container registry, make sure backend, frontend and db-manager tf files are using the helloworld image. The other image will be enabled after the pipelines are executed for the first time.**

```
    image  = "microsoft/aci-helloworld:latest"
    #image  = "${var.artifact_registry_repository_name}.azurecr.io/titus-backend:latest"
```

Run:
```
terraform init
terraform plan -var-file input.tfvars -out tfplan.out
terraform apply "tfplan.out"
```

It will take 7-10 mins to finish, you can get some details at the end of the execution, like the frontend or backend endpoint.

Titus is not there yet, don't expect anything other than helloworld images. These images get replaced by Titus images after they are built using the pipelines.

**You will get the FQDN for each resource in the terraform output.**


## Create the pipelines in Azure DevOps

Go to AzureDevOps (https://dev.azure.com/), sign in,  create new project (top right), private, put a name and leave everything else as default.

**Service Connectors allow the pipeline to connect to Azure and manage Azure resources within your subscription, like the Container Registry (to login and push the images) or Container Instances (to restart and pull newwer versions of the artifacts/images)**

Create service connector for the resource group, call it **titusrgconnector** and make sure it uses your subscription and your resource group.
```
Project settings (Bottom left) > service connection > Azure Resource Manager > Service Principal
```

Create service connector for titus container registry, call it **tituscrconnector** and make sure it uses your subscription and the tituscr container registry.
```
Project settings (Bottom left) > service connection > Docker Registry > Azure Container Registry
```

Go to Pipelines, New Pipeline, Select Github (YAML), "All repositories", search for titus and select it, "Existing Azure Pipelines YAML file" (at the bottom), select the branch and the file azure-pipeline.yaml under the folder packages/titus-backend.

Click in Continue, and clicking in the name in the editor you can rename it.
Instead of Run, just Save it (or get a recent commit number to it and then you can run it too).

To run a pipeline, do a commit against one of the branches (default is all branches) and files/folders (any file under packages/titus-*) that triggers the pipeline to confirm it is working as expected.
**Triggers for each pipeline are defined at the top of each pipeline yaml file.**
To confirm all works as expected, do the commit and push, open the pipeline build, wait for the output and if all works as expected you can create the other 2 pipelines using the same steps.


## Update the Container images

Replace the helloworld images by the ones from the tituscr container registry in backend.tf, frontend.tf and db-manager.tf files, plan and apply again to use the newer image for each package.

```
    #image  = "microsoft/aci-helloworld:latest"
    image  = "${var.artifact_registry_repository_name}.azurecr.io/titus-backend:latest"
```

Run:
```
terraform plan -var-file input.tfvars -out tfplan.out
terraform apply "tfplan.out"
```

The pipeline will deploy the latest image from now on, there will be no need to re run terraform again.


## Verifying Azure deployment

- Use the Frontend FQDN you got from terraform output, using port 8080 to access Titus Frontend.
- Use the Backend FQDN you got from terraform output, with port 8080, using Curl or the browser, just add `/healthcheck` at the end of the URL. The response is JSON payload that included a "DB" property that indicate the Titus Backend can connect to the provisioned Postgres Database.

At this point you have Titus running on your Azure account. 

[Azure]: https://portal.azure.com/
[Azure DevOps]: https://dev.azure.com/
[Titus]: https://github.com/nearform/titus
[Terraform]: https://www.terraform.io