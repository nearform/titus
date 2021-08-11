# Deploy on Kubernetes

To set up a [Titus] deployment on an [Kubernetes] using [Helm] and [kinD], there are few steps to be performed.

## Requirements:
- Helm installed locally.
- A local running kinD cluster with a custom configuration, including ingress controller and port mappings.
- Kubectl command line tool installed.
- Docker installed locally to build the images.
- Hashicorp Vault (Optional)
- Kubernetes Secrets Store CSI Driver (Optional)


## Infrastructure Stack

The stack is built with minimum number of services to make Titus work on Azure:
- **titus-postgresql**: Postgres SQL server and a "titus" DB in it.
- **titus-backend**: Container Instances for the backend.
- **titus-frontend**: Container Instances for the frontend.
- **titus-db-manager**: Container Instances for the db-manager.
- **vault**: Hashicorp Vault instance to store secrets. (Optional)
- **vault-csi-provider**: CSI secrets store provider to provide vault secrets in Kubernetes (Optional)


## Helm and KinD

You can find instructions on how to install helm and kinD on you specific opertion system at [Install Helm](https://helm.sh/docs/helm/helm_install/) and [Install kinD](https://kind.sigs.k8s.io/docs/user/quick-start/).

If you not already enabled and run an ingress controller inside your kinD cluster you can use the following config ([Ingress for kinD](https://kind.sigs.k8s.io/docs/user/ingress/)).
```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP

```

This is not mandatory to expose your services and let the frontend work as expected by requesting the backend service at it's external URL.
Instead of using a ingress controler you can switch your services from ClusterIP to NodePort as described below.


## Update the Container images

If you use kinD you need to upload your custom docker images to the cluster or provide an docker registry. 

For simplicity let's build and upload all images to kinD itself.

```bash
$ cd packages/titus-backend && docker build -t titus-backend:latest .
$ cd packages/titus-db-manager && docker build -t titus-db-manager:latest .
$ cd packages/titus-frontend && cp .env.sample .env && docker build -t titus-frontend:latest .
```
```bash
$ kind load docker-image titus-backend:latest 
$ kind load docker-image titus-frontend:latest 
$ kind load docker-image titus-db-manager:latest 
```

## Config and Deploy

If you want to expose your services for testing porposes you can just switch from clusterIP to NodePort inside values.yaml

You can enable ingress for the frontend and backend service to expose your services for production use inside the values.yaml. Be sure you already have installed an ingress controller.
```yaml
frontend:
  ingress:
    enabled: true
    ...
backend:
  ingress:
    enabled: true
```

By default the ingress settings configure titus-frontend.localhost and titus-backend.localhost subdomains listen for. Make sur your frontend image was build with the right backend API url configured.

For Database use the helm chart deploy postgresql subchart by default and creates a secret for you. If you want to use your own (external) database and/or your own already existing secret for the db password you can config that in the values.yaml as well.

```yaml
postgresql:
  enabled: true
  postgresqlUsername: titus
  postgresqlPassword: ""
  postgresqlDatabase: titus
  existingSecret: ""
externalDatabase:
  host: "postgresql.example.com"
  port: 5432
  user: titus
  password: ""
  database: titus
  existingSecret: "titus-postgresql"
```

If you decide to use your own secret please make sure it contains at least the keys named 'postgresql-password' for the unprevileged user titus and postgresql-postgres-password for root user.

If you fully configured the chart and you are happy let's deploy Titus
```bash
$ cd infra/k8s/helm && helm upgrade -i -n titus --create-namespace --kubeconfig {PATH_TO_YOUR_KUBECONFIG} -f values.yaml titus .
```

## Verifying Kubernetes deployment

- To check if your Frontend is working as expected open you browser and go to http://titus-frontend.localhost
- For the backend you can curl directly the healthcheck endpoint 
```bash
$ curl -kL http://titus-backend.localhost/healthcheck
```

## Use CSI to store Secrets

before you can use external secret store you need to prepare your kubernetes cluster to read from it. For this we will use [Secret Store CSI Driver] and for example porpose a local Hashicorp Vault instance running in dev mode to show how to use Secrets through the CSI Driver in Kubernetes. 

### Install CSI

```bash
$ helm repo add secrets-store-csi-driver https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/master/charts
$ helm upgrade -i -n csi --create-namespace csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver \
  --set syncSecret.enabled=true \
  --set enableSecretRotation=true
```

### Install Vault

Do not use this for production environment. You should use you own production ready Vault instance and a well defined backend storage like Consul to store your Secrets.
```bash
$ helm repo add hashicorp https://helm.releases.hashicorp.com
$ helm upgrade -i -n vault --create-namespace vault hashicorp/vault \
  --set "server.dev.enabled=true" \
  --set "injector.enabled=false" \
  --set "csi.enabled=true"
```

Before Kubernetes can use Vault we need to setup authentication permissions
```bash
$ kubectl -n vault exec -it vault-0 -- /bin/sh
/$ vault auth enable kubernetes
/$ vault write auth/kubernetes/config \
   issuer="https://kubernetes.default.svc.cluster.local" \
   token_reviewer_jwt=\ 
   "$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
   kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443" \
   kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
/$ exit
```

For Titus we need to store some secrets for database and external authentication and authorization services like Auth0 or AD into Vault and define a access policy for it.
If you choose a non default service account for titus or if you deploy titus in a namesace different from titus, you need to change it also here.
```bash
$ kubectl -n vault exec -it vault-0 -- /bin/sh
/$ vault kv put secret/auth0-client-secret secret="YOUR_AUTH0_CLIENT_SECRET"
/$ vault kv put secret/ad-secret secret="YOUR_AD_SECRET"
/$ vault kv put secret/db-password postgresql-password="YOUR_DB_PASSWORD",postgresql-postgresql-password="YOUR_DB_ADMIN_PASSWORD"
/$ vault policy write titus - <<EOF
path "secret/data/*" {
 capabilities = ["read"]
}
EOF
/$ vault write auth/kubernetes/role/backend \
   bound_service_account_names=titus \
   bound_service_account_namespaces=titus \
   policies=titus \
   ttl=20m
/$ exit
```

Now we can deploy our Helm chart for titus with CSI enabled.
```bash
$ helm upgrade -i -n titus --create-namespace -f value.yaml titis . \
  --set backend.csi.enabled=true \
  --set postgresql.existingSecret="db-password"
```

### Warnings and Limitations

in the early beta version of secrets csi driver, volume mounts are obligatory even secrets only needs to bind to environment variables ([FeatureRequest](https://github.com/kubernetes-sigs/secrets-store-csi-driver/issues/298)). Secrets mount as a volume are written to the docker overlay fs in cleartext. Depends on your environment, it could break your secuirty policies and in general it is a bad practice to write secrets in cleartext to the filesystem.

External secrets are only synced to kubernetes secrets when a CSI volume mount is defined for a container. If you want to use external secrets outside of Pods like in ingress objects for TLS certificates for example, secrets needs to mount elsewhere.

InitContainer which mounts secrets volumes will not be deleted their mounted volumes when they finished as long as the secrets are in use.

## Cleanup Kubernetes deployment

If you don't want anymore Titus to be deployed to you cluster just let helm delete your deployment
```bash
$ helm delete -n titus --kubeconfig {PATH_TO_YOUR_KUBECONFIG} titus
```

Helm will not delete persistence volumes automaticaly. If you are sure you dont want your database data and configuration anymore you have to delete it manually via kubectl

To delete you fully kinD cluster ust type
```bash
$ kind delete cluster 
```

[Helm]: https://helm.sh/
[Kubernetes]: https://kubernetes.io/
[Titus]: https://github.com/nearform/titus
[kinD]: https://kind.sigs.k8s.io/
[Secret Store CSI Driver]: https://github.com/kubernetes-sigs/secrets-store-csi-driver