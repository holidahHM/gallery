// pipeline { 
//   agent any
//   tools { 
//     gradle "Gradle-6"
//   }
//   environment {
//     GIT_AUTHOR_NAME = 'holidahHM'
//     GIT_AUTHOR_EMAIL = 'holidahmwangi@gmail.com"'
//     GIT_COMMITTER_NAME = 'holidahHM'
//     GIT_COMMITTER_EMAIL = 'holidahmwangi@gmail.com"'
//   }
//   stages { 
//     stage('Clone Repository') {
//       steps { 
//         git 'https://github.com/holidahHM/gallery.git'
//       }
//     }
//     stage('Set Git Config') {
//       steps {
//         sh 'git config --global user.email "holidahmwangi@gmail.com"'
//         sh 'git config --global user.name "holidahHM"'
//       }
//     }
//     stage('Build Project') {
//       steps { 
//         sh 'gradle build --stacktrace --info'
//       }
//     }
//     stage('Run Tests') {
//       steps {
//         sh 'gradle test --stacktrace --info'
//       }
//     }
//   stage('Deploy to Heroku') {
//      stage('Deploy to Heroku') {
//       steps {
//         withCredentials([string(credentialsId: 'heroku-api-key', variable: 'HEROKU_API_KEY')]) {
//           sh '''
//           if git remote | grep heroku; then
//             git remote remove heroku
//           fi
//           git remote add heroku https://heroku:${HEROKU_API_KEY}@git.heroku.com/gentle-forest-31701.git
//           git push heroku master
//           '''
//         }
//       }
//     } 
//   }
// }

pipeline { 
  agent any
  tools { 
    nodejs "NodeJS_14"  // Use the name you configured in Global Tool Configuration
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
       //sh 'npm install'
        //sh 'npm run build'  // Run your defined build script
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
          git remote add heroku https://heroku:${HEROKU_API_KEY}@git.heroku.com/gentle-forest-31701.git
          git push heroku master
          '''
        }
      }
    } 
    stage('Deploy to Render') {
      steps {
        script {
          def renderServiceName = 'gallery'  // Replace with your Render service name
          def renderApiKey = 'rnd_lyN7KNxziPBAyFIM8omFIvEUMQ2H'  // Replace with your Render API key

          withCredentials([string(credentialsId: 'render-api-key', variable: 'RENDER_API_KEY')]) {
            sh """
            curl -X POST "https://api.render.com/v1/services/${renderServiceName}/deploys" \
            -H "Authorization: Bearer ${RENDER_API_KEY}" \
            -H "Content-Type: application/json" \
            -d '{"clearCache": false}'
            """
          }
        }
      }
    }
  }
}
