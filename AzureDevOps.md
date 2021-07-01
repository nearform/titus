# Azure DevOps and Titus

How to create your pipelines using Azure and AzureDevOps

### Requirements:
- Azure account, a Resource Group and Owner permissions for it.
- Azure CLI client installed
- Terraform 0.15 or older

## INSTRUCTIONS:

Do "az login" and use your credentials to make sure you'll be able to run Terraform against your Resource Group.

Sometimes the az login takes some time to finish, wait for the output showing the account details (containing tenantId, ...)

### TERRAFORM - Create the required infrastructure

Go to infra > azure > terraform

For the first run, since there is no container registry, make sure backend, frontend and db-manager tf files are using the helloworld image.

```bash
    #name   = "titus-backend-${random_string.suffix.result}"
    image  = "microsoft/aci-helloworld:latest"
```

Change the TF variables to use your own resource group id, name and location and Apply the TF plan.

```bash
# Get this information from your Azure account manager
resource_group_id = "7d149fba-cc81-4bab-8461-ea09919d78cd"
resource_group_name = "DevOps_BenchTesting_MA_Jun21"
location = "West Europe"

# Default values for the postgres DB
db_user = "titus"
db_instance_name = "titus"

# Default values for the Azure Container Registry, if you change it you will have to adapt the pipeline yaml files accordingly
artifact_registry_repository_name = "tituscr"
```

Run:
```bash
terraform init
terraform plan -var-file input.tfvars -out tfplan.out
terraform apply "tfplan.out"
```

It will create the following elements:
- **titus-vnet**: Azure network and subnet inside of it.
- **titus-postgresql-server-XXXXXX** - Postgres SQL server and a "titus" DB in it.
- **tituskeyvault**: to store the DB password.
- **tituscr**: Azure Container Registry to store the container images.
- **titus-backend**: Container Instances for the backend. (default helloworld image on first run)
- **titus-frontend**: Container Instances for the frontend. (default helloworld image on first run)
- **titus-db-manager**: Container Instances for the db-manager. (default helloworld image on first run)

It will take 7-10 mins to finish, you can get some details at the end of the execution, like the frontend or backend endpoint (titus is not there yet, don't expect anything other than helloworld).

You can go to the next step while terraform creates everything. Once done, check if all the resources required have been created.

**You will get the FQDN for each resource in the terraform output.**


### AZUREDEVOPS - Create the pipelines

Go to AzureDevOps (https://dev.azure.com/), sign in,  create new project (top right), private, put a name and leave everything else as default.

**Service Connectors allow the pipeline to connect to Azure and manage Azure resources within you subscription, like the Container Registry (to login and push the images) or Container Instances (to restart and pull newwer versions of the artifacts/images)**

Create service connector for the resource group, call it "titusrgconnector" and make sure it uses your subscription and your resource group.
```bash
Project settings (Bottom left) > service connection > Azure Resource Manager > Service Principal
```

Create service connector for titus container registry, call it "tituscrconnector" and make sure it uses your subscription and the tituscr container registry.
```bash
Project settings (Bottom left) > service connection > Docker Registry > Azure Container Registry
```
If tituscr still not present, wait a couple of minutes for terraform to create it.

Go to Pipelines, New Pipeline, Select Github (YAML), "All repositories", search for titus and select it, "Existing Azure Pipelines YAML file" (at the bottom), select the branch and the file.

Click in Continue, and clicking in the name in the editor you can rename it.
Instead of Run, just Save it (wait until "Terraform apply ..." has finished to run any pipeline).

To run a pipeline, do a commit against one of the branches (default is all branches) and files/folders (any file under packages/titus-*) that triggers the pipeline to confirm it is working as expected.
**Triggers for each pipeline are defined at the top of each pipeline yaml file.**
To confirm all works as expected, do the commit and push, open pipeline, wait for the output and if all works as expected you can create the other 2 pipelines using the same steps.

### TERRAFORM - Update the container images to use the ones built by the pipelines 

Replace images in TF backend, frontend and db-manager tf files, plan and apply again to use the newer image for each package.

```bash
terraform plan -var-file sample-input.tfvars -out tfplan.out
terraform apply "tfplan.out"
```

The pipeline will deploy the latest image from now on, no need to re run terraform.