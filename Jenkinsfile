pipeline {
    agent { label 'docker-daemon' }
    environment {
        DOCKER_IMAGE = 'artifactory.wikia-inc.com/dev/sandbot:image-test'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: params.branch, url: 'https://github.com/Wikia/sandbot.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE -f Dockerfile ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    sh "docker rmi --force $DOCKER_IMAGE"
                }
            }
        }
    }
}
