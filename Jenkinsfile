pipeline { 
  agent any
  tools { 
    gradle "Gradle-6"
  }
  stages { 
    stage('Clone Repository') {
      steps { 
        git 'https://github.com/holidahHM/java-todo.git'
      }
    }
    stage('Verify Directory Structure') {
      steps {
        dir('gallery') {
          sh 'ls -la'
        }
      }
    }
    stage('Verify Gradle Files') {
      steps {
        dir('gallery') {
          sh '''
          if [ ! -f build.gradle ]; then
            echo "Error: build.gradle not found"
            exit 1
          fi
          if [ ! -f settings.gradle ]; then
            echo "Error: settings.gradle not found"
            exit 1
          fi
          '''
        }
      }
    }
    stage('Build Project') {
      steps { 
        dir('gallery') {
          sh 'gradle build --stacktrace --info'
        }
      }
    }
    stage('Run Tests') {
      steps {
        dir('gallery') {
          sh 'gradle test --stacktrace --info'
        }
      }
    }
    stage('Deploy to Heroku') {
      steps {
        dir('gallery') {
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
