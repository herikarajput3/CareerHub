const { Schema, model } = require("mongoose");

const commonSchema = {
    type: String,
    required: true
}

const jobSchema = new Schema({
    title: {
        ...commonSchema
    },
    description: {
        ...commonSchema
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    location: {
        ...commonSchema
    },
    jobType: {
        ...commonSchema
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }]
}, {timestamps: true})

module.exports = model('Job', jobSchema);