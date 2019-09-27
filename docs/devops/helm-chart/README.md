# Add a New Helm Chart
Helm is a package manager for Kubernetes. Kubernetes is used to manage containerised applications in a clustered environment. 

You can use Helm to configure and manage Kubernetes charts, which are packages of preconfigured Kubernetes resources. With charts, you create repeatable builds of an application. A Helm chart contains templates for resources that are necessary to run the application. A template uses variables that are substituted with values when the manifest is created. The chart includes a values file, values.yaml, that describes how to configure the resources.

For more information on Helm charts, refer to the [Helm Documentation].

1. If you built a new environment, update the following variables in the `values.yaml` file:
    ```yaml
        database:
            endpoint: <this value>

        ...

        redis:
            endpoint: <this value>

    ```
    You can get both of these values from AWS by going into RDS and Elasticache.

## Configure the Helm Chart

Follow the instructions in [Taurus](https://nf-taurus.netlify.com) to configure the required
elements.

Titus is deployed by via Helm with the Helm chart in the folder `./helm`. To
configure Kubernetes access, do the following:

- Create an AWS profile called `taurus` and set the AWS CLI to use it:
    ```
        aws configure --profile taurus
        export AWS_PROFILE=taurus
    ```
- Copy the configuration in the file `./kubectl-config` into the file `~/.kube/config`.

To interact with the cluster, use the command:
```
kubectl get nodes
```

## Deploy a New Version

To deploy a new version, upgrade the Helm chart and you can modify the values in the Helm yaml file `./helm/values.yaml` to customise your deployment.

[Helm Documentation]: https://helm.sh/docs
