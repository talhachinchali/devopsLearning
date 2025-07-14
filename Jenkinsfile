pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'talhac'
    DOCKER_HUB_PASS = credentials('dockerhub-creds')  // This should be the ID you gave in Jenkins credentials
    IMAGE_TAG = 'latest'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/talhachinchali/devopsLearning.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_HUB_USER/user-service:$IMAGE_TAG ./user-service'
      }
    }

    stage('Docker Login') {
      steps {
        sh "echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin"
      }
    }

    stage('Push to Docker Hub') {
      steps {
        sh 'docker push $DOCKER_HUB_USER/user-service:$IMAGE_TAG'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f ./k8s/user-deployment.yaml'
      }
    }
  }
}
