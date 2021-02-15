# School Assignment - Server

## Pre requests
A running mongodb server

Nodejs and npm installed on the server

## Starting the server
Check out/Download the code from this repo

Configure `url` parameter in the file `config/database.config.js` to match with the running Mongodb server

Run `npm install` from root directory

Run `node app.js` from root directory

## Running unit tests
npm install --save-dev jest
Run `npm test`

## Data Population
Use the cloud function `https://us-central1-skoolbag.cloudfunctions.net/populateSchoolList` to populate data. The link of the create school web service (Eg: http://3.20.225.155:3000/schools) should be passed as the query parameter `url` to the cloud function.

Eg: Visiting https://us-central1-skoolbag.cloudfunctions.net/populateSchoolList?url=http%3A%2F%2F3.20.225.155%3A3000%2Fschools with the browser will populate data using the web service http://3.20.225.155:3000/schools
