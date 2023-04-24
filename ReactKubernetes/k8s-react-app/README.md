# React Application with Google Firebase Firestore with Kubernetes

### Technologies

- React
- Google Firebase
- Docker
- K8s

### Brief Explanation

#### React Application

Here in this project, I created a straightforward React application. In the application, there is a Form field input to get the Name and Surname of the user. While these inputs are given and saved by clicking the provided button, Google Firebase Firestore is updated with the new data and we list all Name-Surname couples on the same UI Page.

  - The React application running on port 3000

#### Docker

In order to create a K8s cluster we first need a Docker image. Using the following command we create our Docker image using the Dockerfile.
  - docker build  -f Dockerfile -t k8s-react-app.

#### K8s

I created a yaml file that creates the Deployment and Service. 

in order to use a local Docker image in the Deployment  `eval $(minikube -p minikube docker-env)` command is executed in the terminal. In addition to that *imagePullPolicy: Never* is assigned. That basically directs imagePullPolicy from Gitlab to your local docker-env.

Then using NodePort we make our K8s container internally reachable on the 30100 port.

Then with the `kubectl apply -f deployment.yaml` command we create our K8s deployment.

