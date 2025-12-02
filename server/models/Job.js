const { Schema, model } = require("mongoose");

const commonSchema = {
    type: String,
    required: true,
    trim: true
}

const jobSchema = new Schema({
    title: {
        ...commonSchema,
    },
    description: {
        ...commonSchema
    },
    location: {
        ...commonSchema
    },
    jobType: {
        type: String,
        enum: ['full time', 'part time', 'internship', 'contract', 'remote', 'freelance'],
        lowercase: true,
        required: true
    },
    salary: {
        ...commonSchema
    },
    skillsRequired: [{
        ...commonSchema
    }],
    jobLevel: {
        type: String,
        enum: ['entry level', 'mid level', 'senior level'],
        lowercase: true,
        required: true
    },
    experience: {
        ...commonSchema
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
);

module.exports = model("Job", jobSchema);