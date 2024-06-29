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
        sh 'gradle build --stacktrace --info'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'gradle test --stacktrace --info'
      }
    }
    stage('Deploy to Heroku') {
      steps {
        withCredentials([string(credentialsId: 'heroku-api-key', variable: 'HEROKU_API_KEY')]) {
            sh '''
            git remote add heroku https://heroku:${HEROKU_API_KEY}@git.heroku.com/stormy-taiga-76478.git || true
            git fetch heroku
            git pull heroku master || true
            git push heroku master
            '''
        }
      }
    } 
  }
}
