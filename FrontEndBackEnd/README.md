# RestAPI with React Front-End

### Technologies

- React
- Flask
- Docker
- K8s

### Brief Explanation

The front end is a simple React Application that returns **Hello from the Rest API** phrase from the Flask Backend API when the given button is clicked.

- React Application running on port 3000
- Flask Application running on port 5000

#### Docker

In order to create a K8s cluster we first need Docker images. Using the following commands we create our Docker images using the Dockerfiles for front-end and back-end separately.

```
docker build -f Dockerfile -t sakm/hello-world-back-end .
docker build -f Dockerfile -t sakm/hello-world-front-end .
```

I added `sakm` tag before the image name to push them into my Dockerhub account. Then we can pull the Docker images from Dockerhub easily in the Kubernetes deployment.

```
docker push sakm/hello-world-back-end
docker push sakm/hello-world-front-end

```

#### K8s

I created two different yaml file that creates the Deployments and Services for the application. 

in order to use a local Docker image in the Deployment  `eval $(minikube -p minikube docker-env)` command is executed in the terminal. In addition to 

Both front-end and back-end run on the NodePort, which means both services have external IP addresses.

In order to reach the services

```
minikube service <service-name>
```

If we want to test our service on the local machine we can forward the ports from the minikube cluster to our host.

```
kubectl port-forward <pod_name> <local_port>:<pod_port>
```

Then the service will be reachable from the local machine.

Then with the `kubectl apply -f deployment.yaml` command we create our K8s deployments and services.

#### Problems

Even if everything is as it is supposed to be we can't get the message from the back-end server. Anyway, we can get the message in the cluster by using **curl** but still, front-end cannot reach the back-end.

But more or less the logic of deploying a RestAPI server is handled in that project.