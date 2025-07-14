pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'talhac'
    DOCKER_HUB_PASS = credentials('dockerhub-creds')
    IMAGE_TAG = 'latest'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/yourname/your-repo.git'
      }
    }

    stage('Build & Push user-service') {
      steps {
        sh """
          docker build -t $DOCKER_HUB_USER/user-service:$IMAGE_TAG ./user-service
          echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin
          docker push $DOCKER_HUB_USER/user-service:$IMAGE_TAG
        """
      }
    }

    stage('Build & Push product-service') {
      steps {
        sh """
          docker build -t $DOCKER_HUB_USER/product-service:$IMAGE_TAG ./product-service
          echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin
          docker push $DOCKER_HUB_USER/product-service:$IMAGE_TAG
        """
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh """
          kubectl apply -f ./k8s/user-deployment.yaml
          kubectl apply -f ./k8s/product-deployment.yaml
        """
      }
    }
  }
}
