pipeline { 
  agent any
  tools { 
    gradle "Gradle-6"
  }
  stages { 
    stage('Clone Repository') {
      steps { 
        git 'https://github.com/holidahHM/gallery.git'
      }
    }
    stage('Build Project') {
      steps { 
        dir('gallery') { // Navigate to the correct directory if necessary
          sh 'gradle build'
        }
      }
    }
    stage('Run Tests') {
      steps {
        dir('gallery') { // Navigate to the correct directory if necessary
          sh 'gradle test'
        }
      }
    }
    stage('Deploy to Heroku') {
      steps {
        dir('gallery') { // Navigate to the correct directory if necessary
          withCredentials([string(credentialsId: 'heroku-api-key', variable: 'HEROKU_API_KEY')]) {
            sh '''
            git remote add heroku https://heroku:${HEROKU_API_KEY}@git.heroku.com/stormy-taiga-76478.git || true
            git fetch heroku
            git merge heroku/master
            git push heroku master
            '''
          }
        }
      }
    } 
  }
}
