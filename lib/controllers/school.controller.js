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
                    message: "Some error occurred while creating the School."
                });
            }
    });
};

exports.get = (req, res) => {
    let filters = {};
    if (typeof req.query.name === 'string') {
        filters.name = {$regex: req.query.name, $options: 'i'};
    }
    if (typeof req.query.address === 'string') {
        filters.address = {$regex: req.query.address, $options: 'i'};
    }
    if (typeof req.query.search === 'string' && req.query.search !== '') {
        filters.$text = {$search: req.query.search};;
    }
    return School.find(filters)
        .skip(parseInt(req.query.offset))
        .limit(parseInt(req.query.limit))
        .then(schools => {
            res.send(schools);
        }).catch(err => {
            console.log(err.message);
        res.status(500).send({
            message: "Some error occurred while retrieving schools."
        });
    });
};

exports.delete = (req, res) => {
    return School.remove().then(() => {
        res.send([]);
    })
}
