const { Schema } = require("mongoose");
const User = require("./User");

const recruiterSchema = new Schema({
    companyName: {
        type: String,
        trim: true,
        required: true,
    },
    companyWebsite: {
        type: String,
        trim: true,
    },
    companyLogo: {
        type: String,
    },
    companyDescription: {
        type: String,
        trim: true,
    },
    companyLocation: {
        type: String,
        trim: true,
    },
    companyPhone: {
        type: String,
        trim: true,
    },
    companyEmail: {
        type: String,
        trim: true,
    }
});

const Recruiter = User.discriminator("recruiter", recruiterSchema);

module.exports = Recruiter;