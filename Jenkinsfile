pipeline { 
  agent any
  tools { 
    gradle "Gradle-6"
  }
  environment {
    GIT_AUTHOR_NAME = 'holidahHM'
    GIT_AUTHOR_EMAIL = 'holidahmwangi@gmail.com"'
    GIT_COMMITTER_NAME = 'holidahHM'
    GIT_COMMITTER_EMAIL = 'holidahmwangi@gmail.com"'
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
   
  }
}
