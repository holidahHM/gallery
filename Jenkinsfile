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
    stage('Set Git Config') {
      steps {
        sh 'git config --global user.email "holidahmwangi@gmail.com"'
        sh 'git config --global user.name "holidahHM"'
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
            git checkout master
            git merge heroku/master --allow-unrelated-histories -m "Merging remote changes" || true
            git push heroku master
            '''
        }
      }
    } 
  }
}
