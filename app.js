const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('apidoc'))

const databaseService = require('./lib/services/database.service');
databaseService.connectToMongoDB();

app.get('/', (req, res) => {
  res.json({"message": "Welcome to SkoolBag application."});
});

require('./lib/routes/school.routes.js')(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});