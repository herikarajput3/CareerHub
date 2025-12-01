const { Schema } = require("mongoose");
const User = require("./User");

const candidateSchema = new Schema({
    bio: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    skills: [
        {
            type: String,
            trim: true
        },
    ],
    resumeUrl: {
        type: String,
    },
    resumeOriginalName: {
        type: String,
    },
    profilePhoto: {
        type: String,
        default: ""
    }
});

const Candidate = User.discriminator('candidate', candidateSchema);

module.exports = Candidate
