pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'talhac'
    DOCKER_HUB_PASS = 'dckr_pat_ZT6AAu0epSurBmOeiKlUsuNPVho' 
    IMAGE_TAG = 'latest'
  }

  stages {
    stage('Checkout Code') {
      steps {
         git branch: 'main', url: 'https://github.com/talhachinchali/devopsLearning.git'
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
        sh 'kubectl rollout restart deployment user-service'
      }
    }
  }
}
