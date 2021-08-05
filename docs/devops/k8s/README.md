# Deploy Titus on Kubernetes

To set up a [Titus] deployment on an [Kubernetes] using [Helm] and [kinD], there are few steps to be performed.

## Requirements:
- Helm installed locally.
- A local running kinD cluster with a custom configuration, including ingress controller and port mappings.
- Kubectl command line tool installed.
- Docker installed locally to build the images.


## Infrastructure Stack

The stack is built with minimum number of services to make Titus work on Azure:
- **titus-postgresql**: Postgres SQL server and a "titus" DB in it.
- **titus-backend**: Container Instances for the backend.
- **titus-frontend**: Container Instances for the frontend.
- **titus-db-manager**: Container Instances for the db-manager.


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


## Update the Container images

If you use kinD you need to upload your custom docker images to the cluster or provide an docker registry. 

For simplicity let's build and upload all images to kinD itself.

```bash
$ cd packages/titus-backend && docker build -t titus-backend:latest .
$ cd packages/titus-db-manager && docker build -t titus-db-manager:latest .
$ cd packages/titus-frontend && docker build -t titus-frontend:latest .
```
```bash
$ kind load docker-image titus-backend:latest 
$ kind load docker-image titus-frontend:latest 
$ kind load docker-image titus-db-manager:latest 
```

## Config and Deploy

By default the frontend is trying to connect the backend at localhost:5000. If you want to change that Settings you need to define an environment variable at docker build time.
```bash
$ REACT_APP_API_PATH="http://titus-backend.localhost" docker build -t titus-frontend:latest .
```

You have to enable ingress for the frontend and backend service to get it up and running as expected inside the values.yaml.
```yaml
frontend:
  ingress:
    enabled: true
    ...
backend:
  ingress:
    enabled: true
```

By default the ingress settings configure titus-frontend.localhost and titus-backend.localhost subdomains listen for.

For Database use the helm chart deploy postgresql subchart by default and creates a secret for you. If you want to use your own (external) database and/or your own already existing secret for the db password you can config that in the values.yaml as well.

```yaml
externalDatabase:
  host: "postgresql.example.com"
  port: 5432
  user: titus
  password: ""
  database: titus
  existingSecret: "titus-db-password"
```


## Verifying Kubernetes deployment

- To check if your Frontend is working as expected open you browser and go to http://titus-frontend.localhost
- For the backend you can curl directly the healthcheck endpoint 
```bash
$ curl -kL http://titus-backend.localhost/healthcheck
```

At this point you have Titus running on your Azure account. 

[Helm]: https://helm.sh/
[Kubernetes]: https://kubernetes.io/
[Titus]: https://github.com/nearform/titus
[kinD]: https://kind.sigs.k8s.io/