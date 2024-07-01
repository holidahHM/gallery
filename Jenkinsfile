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
    nodejs "NodeJS_14"
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
        sh 'npm install mocha'
        sh 'npm test'
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
          def renderServiceName = 'gallery'
          def renderApiKey = 'rnd_lyN7KNxziPBAyFIM8omFIvEUMQ2Hrnd_CATdEZdbs8igG257NwuVIRaX3P0p'

          withCredentials([string(credentialsId: 'renderApiKey', variable: 'RENDER_API_KEY')]) {
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
    stage('Notify on Successful Deploy') {
      when {
        allOf {
          branch 'master'
          buildingTag()
          changeRequest()
          not {
            anyOf {
              buildingTag()
              changeRequest()
            }
          }
        }
      }
     steps {
        script {
          // slackSend (
          //   color: '#36a64f',
          //   message: 'Deployment to production successful!',
          //   channel: 'friday-week-2-ip-1',  // Replace with your Slack channel
          //   webhookUrl: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'  // Replace with your webhook URL
            slackSend (color: '#36a64f', message: 'Deployment to production successful!', channel: '#general')
        }
        }
      }
    }
  }
}
