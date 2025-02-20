const dbConfig = require('../../config/database.config.js');
const mongoose = require('mongoose');

exports.connectToMongoDB = () => {
    mongoose.Promise = global.Promise;

    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}