pipeline { 
  agent any
  tools { 
    gradle "Gradle-6"
  }
  stages { 
    stage('clone repository') {
      steps { 
        git 'https://github.com/holidahHM/gallery
      }
    }
    stage('Build the project') {
      steps { 
        sh 'gradle build'
      }
    }
    stage('Tests') {
      steps { 
        sh 'gradle test'
      }
    }
  }
}