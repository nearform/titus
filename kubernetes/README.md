# Infrastructure for titus.nearform.com

At [titus.nearform.com](https://titus.nearform.com) we have deployed a demo app
called `kitchen sink` based on the [Titus framework](https://github.com/nearform/titus).

This demo app has two components, a `frontend` React app and (backend) `api`
based on Node.js that is called by the frontend for certain functions.

The code for the `frontend` can be found in [packages/titus-kitchen-sink](https://github.com/nearform/titus/tree/master/packages/titus-kitchen-sink)
and the code for the `api` can be found in [packages/titus-kitchen-sink-backend](https://github.com/nearform/titus/tree/master/packages/titus-starter-backend).

## CI

Every commit and push to the `master` branch of the Titus repo will trigger a
CircleCI build. That build will go through 4 steps as defined in `.circleci/config.yml`:
install (npm modules), lint, test and build containers.

The `build containers` step will build the production frontend bundle and package it
in the `frontend` container. It will also package the API code in the `backend` container.
After it is done building them it will push them to private ECR (ECS) registries under
the nearForm AWS account:

https://console.aws.amazon.com/ecs/home?region=us-east-1#/repositories/titus-kitchen-sink-frontend
https://console.aws.amazon.com/ecs/home?region=us-east-1#/repositories/titus-kitchen-sink-backend

## Database and data

Because we just need to hold ephemeral demo data in the PostgreSQL database behind
the API, we have chosen to host the database in a container as well, in the Kubernetes cluster.

This container has been manually built, populated with demo data and pushed to a
private ECR (ECS) registry:

https://console.aws.amazon.com/ecs/home?region=us-east-1#/repositories/titus-kitchen-sink-db

## Application hosting

The application's components: frontend, backend (api), postgresql database, redis
and fake-s3 service are all hosted in a AWS EKS (Kubernetes) cluster: https://console.aws.amazon.com/eks/home?region=us-east-1#/clusters/titus

The K8s control plane is deployed and managed by AWS and two worker nodes have been
instantiated in EC2 as part of the cluster:

https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:search=titus-eks-worker-nodes;sort=tag:Name

All the application's components are deployed to this cluster via kubectl and the
[`titus.yml`](https://github.com/nearform/titus/blob/master/kubernetes/titus.yaml) file
that can be found in the repository in this directory.

Each of the components is deployed as a K8s `service` and either `deployments` or
`cronjobs`. The `service` is there to make the components pods (and containers) available
inside the cluster to the other components.

The `database` and `fake-s3` containers are deployed as k8s `cronjobs`. These cronjobs
have a limited lifetime of 24h and they are triggered daily. This has the effect that
once per day the pods running these containers restart themselves. Meaning that any
data deleted or added to the database or to the S3 function (which is used by the
uploader feature) will be nuked. We need this because these app is publicly available
and we do not know what things the users will do and what data they will add / delete.

## External availability and DNS

In the `titus.yml` kubernetes manifest, the `frontend` and `s3` service have been
defined as loadbalancer services. This means that kubernetes will automagically
create a AWS Classic Load Balancer for each service and point it to the service and
the pods / containers running behind it.

As with any AWS LB, it will have a public IP and DNS name associated with it.
In Route 53 we have defined CNAMEs for `titus.nearform.com` and `titus-s3.nearform.com`
pointing to these auto-generated LB DNS names.
