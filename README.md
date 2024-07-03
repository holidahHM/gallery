Author: Holidah Mwangi

Gallery CI/CD Jenkins Pipeline

Date: 03/07/2024


This repository contains the configuration for a Jenkins pipeline that automates the building, testing, and deployment of the Gallery project.
The pipeline is configured to work with Node.js, Gradle, and deploys to both Heroku and Render platforms.


##Prerequisites##
Jenkins installed and configured
Node.js 14
Gradle 6
Mocha for testing
Heroku account and API key
Render account and API key

###stages###
Clone Repository
Build Project
Run Tests
Deploy to Heroku
Deploy to Render
Notify on Successful Deploy

## stage clone repo
git 'https://github.com/holidahHM/gallery.git'

##Stage Build project 
  sh 'gradle build'

##Stage run tests
sh 'npm install mocha'
    sh 'npm test'

  ##Deploy to Heroku
  Deploys the project to Heroku using the provided API key.

  ##Deploy to Render
Deploys the project to Render using the provided API key.

##Notify on Successful Deploy
Sends a Slack notification on successful deployment to the production environment.

NB//Make sure to input  the  actual values in your Jenkins configuration  for heroku-api-key, renderApiKey, and Slack channel.

Site accessible on [https://gallery-kt8f.onrender.com/ ](https://gallery-kt8f.onrender.com/)





