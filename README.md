# tickethub

#run type script:
ts-node index.ts

commands:

###### docker

#create and running a container from an image
#docker run = docker create + docker start
sudo docker run image_name

#only creating a container, bellow command will print container_id in terminal
sudo docker create image_name

#start a container
sudo docker start container_id
#start a container and print out output in terminal
sudo docker start -a container_id

#show only running container:
sudo docker ps
#show all images with status (running and exited container)
sudo docker ps --all

#restart exit container,
#first use docker ps --all to get all container status along with their ids. then use docker start container_id, or docker start -a container_id

# clear all container

sudo docker system prune

#show the logs of container latter example bellow:
#running docker logs command not restarting the container, it prints the out put of the container in terminal.
sudo docker create busybox echo hi there
sudo docker start container_id
suod docker logs container_id

#stop a docker container:
example:
docker create busybox ping google.com
docker start container_id
docker logs container_id
docker ps #will show that ping is executing continusly forever.
docker stop container_id
#or
docker kill conatiner_id

## get terminal access of a container

sudo docker exec -it container_id sh
#exit the terminal of a container
ctl+d or type exit

#making an image

###### minikube

minikube start --driver=kvm2

#showing ip address:
minikube ip
#showing version:
minikube version
#showing addons list:
minikube addons list
#showing dashboard
minikube dashboard

######### kubectl #######
kubectl version
kubectl cluster-info
kubectl proxy --port=8080

#pods status
kubectl get pods

#ececute and open shell on a pod
kubectl exec -it [pod_name] [cmd]

#logs of a pod
kubectl log [pod_name]

# delete a pod

kubectl delete pod [pod_name]

#get debug information of a pod
kubectl describe pod [pod_name]

#process a config file (Deployment/Service)
kubectl apply -f [config_file_name]

#get all deployments
kubectl get deployments

# get info about deployments

kubectl describe deployments

#delete a deployment
kubectl delete deployment [deployment_name]

#updating deployment from doker hub:
#update your code
#build image with latest tag
#push newly build image to docker hub
#then run command: kubectl rollout restart deployment [deployment_file_name]
docker build -t lordrafiq/posts .
docker push lordrafiq/posts
kubectl rollout restart deployment posts-depl

#get all Service
kubectl get services

describe a service:
kubectl describe service [service_name]

#access image from outside
#to find a nodeport first use command
kubectl get services
http://192.168.39.234:31154/posts
http://minikube_ip:nodePort/name

****\*\***** skaffold **\*\*\*\***
#start:
skaffold dev
