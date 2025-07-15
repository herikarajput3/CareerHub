const { Schema, default: mongoose, model } = require("mongoose");

commonSchema = {
    type: String,
    required: true
}

const userSchema = new Schema({
    fullName: {
        ...commonSchema
    },
    email: {
        ...commonSchema,
        // unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        ...commonSchema
    },
    role: {
        ...commonSchema,
        enum: ['candidate', 'recruiter'],
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // Resume URL
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: { type: String, default: "" },
        experience: { type: String },
        education: { type: String },
        location: { type: String },
    }

}, { timestamps: true });

module.exports = model('User', userSchema);