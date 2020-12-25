const School = require('../models/school.model.js');

exports.create = (req, res) => {
    const school = new School({
        name: req.body.name,
        address: req.body.address,
        noOfStudents: req.body.noOfStudents
    });

    return school.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).send({
                    message: err.message || "Some error occurred while creating the School."
                });
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the School."
                });
            }
    });
};

exports.get = (req, res) => {
    let filters = {};
    if (typeof req.params.name === 'string') {
        filters.name = {$regex: req.params.name, $options: 'i'};
    }
    if (typeof req.params.address === 'string') {
        filters.address = {$regex: req.params.address, $options: 'i'};
    }
    if (typeof req.params.search === 'string' && req.params.search !== '') {
        filters.$text = {$search: req.params.search};;
    }
    return School.find(filters)
        .skip(req.params.offset)
        .limit(req.params.limit)
        .then(schools => {
            res.send(schools);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving schools."
        });
    });
};