module.exports = (app) => {
    const schools = require('../controllers/school.controller.js');

    app.post('/schools', schools.create);
    app.get('/schools', schools.get);
}