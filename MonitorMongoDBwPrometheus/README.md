# Monitoring MongoDB with Prometheus

## Project Description

We'll deploy a MongoDB application and will add this MongoDB app to Prometheus targets.

### Prometheus and Grafana Web UIs

#### Port Forward

In order to dispaly the Prometheus and Grafana UIs in the external world we'll do **port-forward**.

```
kubectl port-forward service/prometheus-kube-prometheus-prometheus 9090

```

#### Service Monitors

In order to list the Service Monitors (services that monitors by the Prometheus) we can run `kubectl get servicemonitor` command. And further, we can investigate the details of the .yaml files with following command

```
kubectl get servicemonitor prometheus-grafana -o yaml > grafana.yaml
```
In that .yaml file `release: prometheus` part is the crucial part. By clarfying that we allow prometheus to find Service monitor in the cluster and register them. So that it can start scraping the application or endpoint.

### Deploy MongoDB Exporter

#### Exporter 

An **exporter** simply is a translator between apps data to Prometheus understandable metrics.

- It's sitting btw application and the Prometheus, getting data from the application transforming it into data or metrics that Prometheus will understand. And then it exposes these metrics at **/metrics** endpoint for Prometheus to able to scrape them.

---

From the following link https://prometheus.io/docs/instrumenting/exporters/ we can get necesarry exporters. But we'll get our exporter as Helm chart. 

#### Install MongoDB-exporter Helm Chart

###### Add repos
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```
###### Install chart
```
helm install mongodb-exporter prometheus-community/prometheus-mongodb-exporter
```

##### Edit Values.yaml

We'll edit the values.yaml files in the mongodb-exporter Helm chart.

```
helm show values prometheus-community/prometheus-mongodb-exporter > values.yaml
```

In order to edit the Helm chart with new Values.yaml files we will configure our values.yaml file as below.

```
# our service name is mongodb-service
mongodb:
  uri: "mongodb://mongodb-service:27017"
serviceMonitor:
  additionalLabels:
    release: prometheus

```

Then we'll install the mongodb-exporter Helm chart again with our values.yaml configurations. We should first delete the Helm chart we downloaded with the same name with `helm ls`, `helm uninstall <chart-name>`

```
helm install mongodb-exporter prometheus-community/prometheus-mongodb-exporter -f values.yaml
```
