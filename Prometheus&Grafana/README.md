# Monitoring Kubernetes with Prometheus and Grafana

## Deploy Prometheus and Grafana using Helm Chart in Kubernetes

There are different ways of deploying Prometheus in Kubernetes but we'll deploy it using Helm. Because with Helm charts deploying such clusters is so easy and fast. 

- First you need to have the necessary **Helm** package in your computer.
- We will follow the following link to install **Prometheus-operator** [https://gitlab.com/nanuchi/youtube-tutorial-series/-/blob/master/prometheus-exporter/install-prometheus-commands.md?plain=0]

## install Prometheus-operator

##### Add repos

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
https://charts.helm.sh/stable
helm repo update
```

##### Install chart
```
helm install prometheus prometheus-community/kube-prometheus-stack
```
##### Install chart with fixed version

```
helm install prometheus prometheus-community/kube-prometheus-stack --version "9.4.1"
```

Now we can see with `kubectl get all` command we created all the necessary components by installing the helm charts. 

### Sidenote

If we want to investegate the details of the components we can save them in **yaml** files to see the details better. For instances we can look at to the statefulset configurations

```
kubectl describe statefulset prometheus-prometheus-kube-prometheus-prometheus > prom.yaml 
kubectl describe statefulset alertmanager-prometheus-kube-prometheus-alertmanager > alert.yaml 
kubectl describe deployment prometheus-kube-prometheus-operator > oper.yaml
```

## Display the UIs

All the services are running internally when we install the Prometheus and Grafana. In order to reach the running services externally we will use port-forward. 

First we can list all running services with `kubectl get svc`

```
NAME                                      TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
alertmanager-operated                     ClusterIP      None             <none>        9093/TCP,9094/TCP,9094/UDP   12m
kubernetes                                ClusterIP      10.96.0.1        <none>        443/TCP                      17d
prometheus-grafana                        ClusterIP      10.96.215.18     <none>        80/TCP                       12m
prometheus-kube-prometheus-alertmanager   ClusterIP      10.109.204.33    <none>        9093/TCP                     12m
prometheus-kube-prometheus-operator       ClusterIP      10.108.213.226   <none>        443/TCP                      12m
prometheus-kube-prometheus-prometheus     ClusterIP      10.104.71.245    <none>        9090/TCP                     12m
prometheus-kube-state-metrics             ClusterIP      10.102.152.180   <none>        8080/TCP                     12m
prometheus-operated                       ClusterIP      None             <none>        9090/TCP                     12m
prometheus-prometheus-node-exporter       ClusterIP      10.106.221.249   <none>        9100/TCP                     12m
```

#### Grafana

In order to forward the port first we should find out that in whihc port Grafana is running on. For that we can get the logs from the Grafana pod specifying the grafana container by **-c** flag.

```
kubectl logs prometheus-grafana-6984c5759f-srz6d -c grafana
```

Grafana is running on port **3000**.

```
kubectl port-forward deployment/prometheus-grafana 3000
```

**username**: admin
**password**: prom-operator

#### Prometheus

```
kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090
```