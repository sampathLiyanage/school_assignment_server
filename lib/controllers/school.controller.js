const School = require('../models/school.model.js');

exports.create = (req, res) => {
    const school = new School({
        name: req.body.name,
        address: req.body.address,
        noOfStudents: req.body.noOfStudents
    });

    school.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the School."
        });
    });
};

exports.get = (req, res) => {
    School.find()
        .then(schools => {
            res.send(schools);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving schools."
        });
    });
};