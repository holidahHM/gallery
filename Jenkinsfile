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
        sh 'gradle build'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'gradle test'
      }
    }
    stage('Deploy to Heroku') {
      steps {
        withCredentials([string(credentialsId: 'heroku-api-key', variable: 'HEROKU_API_KEY')]) {
          sh '''
          if git remote | grep heroku; then
            git remote remove heroku
          fi
          git remote add heroku https://heroku:${HEROKU_API_KEY}@git.heroku.com/stormy-taiga-76478.git
          git push heroku master
          '''
        }
      }
    } 
  }
}
