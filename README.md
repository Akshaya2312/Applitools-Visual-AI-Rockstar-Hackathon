# rockstar-hackathon

This is the submission for [Applitools hackathon](https://applitools.com/hackathon)

# Prerequisites

 - Node version 8 or above
 - Npm version 6.4.x or above 
 - Applitools API Key to be set as environment variable using following commands

Mac / linux / Windows OS ( with Git bash terminal) : `export APPLITOOLS_API_KEY='YOUR_API_KEY'`

Windows(Powershell/ command prompt): `set APPLITOOLS_API_KEY='YOUR_API_KEY'` 
 
## Automation Tool and libraries used : 

- [Cypress](https://cypress.io) : To Run automated tests
- [Cypress-eyes-plugin](https://github.com/applitools/eyes-cypress) - To use as library to connect Applitools Dashboard using automated tests
- [cross-env](https://www.npmjs.com/package/cross-env) : To make scripts runnable across windows and Linux OS environments

# Steps

- There are two spec files 1: TraditionalTests.js and 2. VisualAITests.js 
- Execute command `npm run cypress:test:v1` to run functional and visual tests agains [V1](https://demo.applitools.com/hackathon.html) 
- Execute command `npm run cypress:test:v2` to run functional and visual tests agains [V2](https://demo.applitools.com/hackathonV2.html) 

To visualize the tests run following commands 
- `npm run cypress:open:v1` to open the tests configured to run against V1 version of the app
- `npm run cypress:open:v2` to open the tests configured to run against V2 version of the app

# Results

- VisualAITests.js result will be uploaded to Applitools
- For all the tests cypress creates `videos` folder where it saves the video in mp4 format for user to visualize the test execution result.




