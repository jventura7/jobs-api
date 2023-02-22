const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Pease provide company name'],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'Pease provide position'],
        maxLength: 200
    },
    status: {
        type: String,
        enum: ['Interview', 'Declined', 'Pending'],
        default: 'Pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Job', JobSchema)