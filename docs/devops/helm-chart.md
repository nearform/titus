# New Standup of Helm Charts

1. If you built a new environment, update the following variables in the values.yaml file:
    ```yaml
        database:
            endpoint: <this value>

        ...

        redis:
            endpoint: <this value>

    ```
    You can get both of these values from AWS by going into RDS and Elasticache.

# Configuration

Follow the instructions [in NOISE](https://github.com/nearform/noise) to configure the required
elements.

Titus is deployed by via Helm with the Helm Chart on [this folder](./helm). To
configure Kubernetes access, do the following:

- Create an AWS profile called `noise` and set the AWS CLI to use it:
    ```
        aws configure --profile noise
        export AWS_PROFILE=noise
    ```
- Copy the configuration on [kubectl-config](./kubectl-config) into ~/.kube/config

To interact with the cluster, use the command:
```
kubectl get nodes
```

## Deploy New Versions

To deploy new versions, upgrade the Helm chart and you can replace the values [here](./helm/values.yaml) to customise it.
