// // pipeline { 
// pipeline {
//   agent any
//   environment {

//         EMAIL_BODY = 

//         """

//             <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>

//             <p>

//             View console output at 

//             "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"

//             </p> 

//             <p><i>(Build log is attached.)</i></p>

//         """

//         EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

//         EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

//         EMAIL_RECEPIENT = 'holidah.mwangi@student.moringaschool.com'

//     }
//   tools { 
//     nodejs "NodeJS_14"
//     gradle "Gradle-6"
//   }
//   stages {
//     stage('Clone Repository') {
//       steps { 
//         git 'https://github.com/holidahHM/gallery.git'
//       }
//     }
//     stage('Build Project') {
//       steps {
//         sh 'gradle build'
//       }
//     }
//     stage('Run Tests') {
//       steps {
//         sh 'npm install mocha'
//         sh 'npm test'
//         sh 'gradle test'
//       }
//     }
//     stage('Deploy to Heroku') {
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
//     stage('Deploy to Render') {
//       steps {
//         script {
//           def renderServiceName = 'gallery'
//           def renderApiKey = 'rnd_lyN7KNxziPBAyFIM8omFIvEUMQ2Hrnd_CATdEZdbs8igG257NwuVIRaX3P0p'

//           withCredentials([string(credentialsId: 'renderApiKey', variable: 'RENDER_API_KEY')]) {
//             sh """
//             curl -X POST "https://api.render.com/v1/services/${renderServiceName}/deploys" \
//             -H "Authorization: Bearer ${RENDER_API_KEY}" \
//             -H "Content-Type: application/json" \
//             -d '{"clearCache": false}'
//             """
//           }
//         }
//       }
//     }
//     stage('Notify on Successful Deploy') {
//       when {
//         allOf {
//           branch 'master'
//           buildingTag()
//           changeRequest()
//           not {
//             anyOf {
//               buildingTag()
//               changeRequest()
//             }
//           }
//         }
//       }
//      steps {
//         script {
        
//             slackSend (color: '#36a64f', message: 'Deployment to production successful!', channel: '#friday-week-2-ip-1')
//         }
//         }
//       }
//     }
//    post {
//         success {
//             emailext attachLog: true, 
//                 body: EMAIL_BODY, 

//                 subject: EMAIL_SUBJECT_SUCCESS,

//                 to: EMAIL_RECEPIENT
//         }

//         failure {
//             emailext attachLog: true, 
//                 body: EMAIL_BODY, 

//                 subject: EMAIL_SUBJECT_FAILURE, 

//                 to: EMAIL_RECEPIENT
//         }
//     }
//     }       




     
pipeline {
  agent any
  environment {
    EMAIL_BODY = """
      <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
      <p>View console output at 
      "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"</p>
      <p><i>(Build log is attached.)</i></p>
    """
    EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' - Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 
    EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' - Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 
    EMAIL_RECEPIENT = 'holidah.mwangi@student.moringaschool.com'
  }
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
        sh 'gradle test'
      }
    }
    stage('Deploy to Heroku') {
      steps {
        withCredentials([string(credentialsId: 'heroku-api-key', variable: 'HEROKU_API_KEY')]) {
          script {
            def herokuRemoteExists = sh(script: 'git remote | grep heroku', returnStatus: true) == 0
            if (herokuRemoteExists) {
              sh 'git remote remove heroku'
            }
            sh 'git remote add heroku https://heroku:${HEROKU_API_KEY}@git.heroku.com/gentle-forest-31701.git'
            sh 'git push heroku master'
          }
        }
      }
    }
    stage('Deploy to Render') {
      steps {
        script {
          def renderServiceName = 'gallery'
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
        branch 'master'
      }
      steps {
        script {
          slackSend(color: '#36a64f', message: 'Deployment to production successful!', channel: '#friday-week-2-ip-1')
        }
      }
    }
  }
  post {
    success {
      emailext(
        attachLog: true, 
        body: EMAIL_BODY, 
        subject: EMAIL_SUBJECT_SUCCESS,
        to: EMAIL_RECEPIENT
      )
    }
    failure {
      emailext(
        attachLog: true, 
        body: EMAIL_BODY, 
        subject: EMAIL_SUBJECT_FAILURE, 
        to: EMAIL_RECEPIENT
      )
    }
  }
}

