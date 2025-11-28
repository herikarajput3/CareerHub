const { Schema, model } = require("mongoose");

const commonSchema = {
    type: String,
    required: true
}

const userSchema = Schema({
    name: {
        ...commonSchema
    },
    email: {
        ...commonSchema,
        unique: true
    },
    password: {
        ...commonSchema,
        minlength: 6
    },
    role: {
        ...commonSchema,
        enum: ["candidate", "recruiter"],
    }
}, { timestamps: true })

module.exports = model("User", userSchema)

