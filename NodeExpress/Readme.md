# k8s-web-to-nginx

Here we have two different deployments and servers.

The first deployment is simply running on the local port 3000 and displays the **hostname** of the current Pod.
The second deployment is the official nginx deployment.

Here the special thing about that project is, inside of the **index.mjx** file we send a request to the K8S server called **nginx** (In the nginx.yaml service name) and then get the response from that server and display that response in the **k8s-web-to-nginx** deployment. 

NOTE: If we change the server-name in the **nginx.yaml** file we will not going to get the nginx content from the nginx server. We're simply sending a PROXY request to another service.