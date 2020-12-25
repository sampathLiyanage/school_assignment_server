const mongoose = require('mongoose');

const SchoolSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'required'],
        maxlength: [100, 'maximum length is 100']
    },
    address: {
        type: String,
        trim: true,
        maxlength: [1000, 'maximum length is 1000']
    },
    noOfStudents: {
        type: Number,
        validate : {
            validator : Number.isInteger,
            message   : 'should be an integer value'
        }
    }
}, {
    timestamps: true,
    versionKey: false
});
SchoolSchema.index({name: 'text', address: 'text'});
module.exports = mongoose.model('School', SchoolSchema);