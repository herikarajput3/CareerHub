const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
    candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
        lowercase: true
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    resumeUrl: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

module.exports = model('Application', applicationSchema);