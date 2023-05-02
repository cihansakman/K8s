from prometheus_client import Counter, Histogram, generate_latest, REGISTRY
from flask import Flask

app = Flask(__name__)

hello_world_counter = Counter('hello_world_requests_total', 'Hello World Request Count')
hello_world_latency = Histogram('hello_world_request_latency_seconds', 'Hello World Request Latency')



'''
This code defines a custom counter metric named hello_world_total that counts the number of times the '/' endpoint is accessed. 
The metric is exposed in the Prometheus format by the prometheus-flask-exporter package.
'''
@app.route('/')
def hello_world():
    with hello_world_latency.time():
        hello_world_counter.inc()
        return 'Hello, World!'

@app.route('/metrics')
def metrics():
    return generate_latest(REGISTRY)


if __name__ == '__main__':
    app.run(debug='True', host='0.0.0.0')