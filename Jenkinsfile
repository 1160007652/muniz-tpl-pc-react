pipeline {
  environment {
    dockerRepo = 'https://nexus.findora.org'
    dockerCreds = 'nexus'
    dockerName = 'chrome-extensions-web-wallet'
  }

  agent any

  options {
    ansiColor('xterm')
  }

  stages {

    stage('Build') {
      steps {
        script {
          docker.withRegistry( dockerRepo, dockerCreds ) {
            dockerImage = docker.build( dockerName + ":" + env.BRANCH_NAME, '--pull .')
          }
        }
      }
    }

    stage('Build Documentation') {
      steps {
        script {
          docker.withRegistry( dockerRepo, dockerCreds ) {
            dockerDocsImage = docker.build( dockerName + "-documentation:" + env.BRANCH_NAME, '--pull -f DockerfileDocs .')
          }
        }
      }
    }

    stage('Push') {
      when {
        branch 'master'
      }
      steps {
        script {
          docker.withRegistry( dockerRepo, dockerCreds ) {
            dockerImage.push();
            dockerDocsImage.push();
          }
        }
      }
    }

  }

}
