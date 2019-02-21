# New standup of helm charts.

1. If you built a new environment variables need to be updated in values.yaml
    ```yaml
        database:
            endpoint: <this value>

        ...

        redis:
            endpoint: <this value>

    ```
    You can retreive both of these values from AWS by going into RDS and Elasticache.

# Configuration

Follow the instructions [in NOISE](https://github.com/nearform/noise) to configure the required
elements.

Titus is deployed by via Helm with the Helm Chart on [this folder](./helm). You need to
configure your kubernetes access:

- Create a AWS profile called `noise` and set the aws cli to use it:
    ```
        aws configure --profile noise
        export AWS_PROFILE=noise
    ```
- copy the configuration on [kubectl-config](./kubectl-config) into ~/.kube/config

If everything is correct, you should be able to interact with the cluster:
```
kubectl get nodes
```

## Deploying new versions

Deployment of new versions is done by upgrading the Helm chart as standard and you can replace the values [here](./helm/values.yaml) to customize it.
