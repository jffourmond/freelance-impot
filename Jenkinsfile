def ssh(remoteCommand){
    return sh(returnStdout: true, script: "ssh $SSH_TARGET $remoteCommand")
}

pipeline {

    agent any

    stages {
       
       stage('Edit files') {
            steps {
                sh "sed -ie s/ID_ANALYTICS/$ID_ANALYTICS/ index.html"
            }
       }       
       
       stage('Build image'){
            steps {                 
                echo "Building new image $APP_NAME ..."
                sh "docker build -t $APP_NAME ."
                sh "docker tag $APP_NAME $DOCKER_REGISTRY/$APP_NAME"
                sh "docker push $DOCKER_REGISTRY/$APP_NAME"
            }
       }       
       
       stage('Stop old container') {
            steps {
                script {
                    def containerId = ssh "sudo docker ps -a -q --filter name=$APP_NAME --format=\"{{.ID}}\" "
                    echo "Container Id to stop : $containerId"
                    if (containerId){
                            echo "Stopping old container $containerId ..."
                            ssh "sudo docker stop $containerId"
                            echo "Deleting old container $containerId ..."
                            ssh "sudo docker rm $containerId"
                    } 
                }
            }
       }
       
       stage('Run new container') {
           steps {
                script {
                    ssh "sudo docker pull $DOCKER_REGISTRY/$APP_NAME"
                    ssh "sudo docker run -d -p 8001:80 --name $APP_NAME -t $APP_NAME"
                }
           }
       }       
       
    }   
}    
