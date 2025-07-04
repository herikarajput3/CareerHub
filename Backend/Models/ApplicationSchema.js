const { Schema, model } = require("mongoose");

const commonSchema = {
    type: String,
}

const applicationSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        ...commonSchema,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true })

module.exports = model('Application', applicationSchema)