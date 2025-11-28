const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

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
        type: String,
        enum: ["candidate", "recruiter"],
        required: true
    }

}, { timestamps: true })

userSchema.index({ username: 1 })

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
});

module.exports = model("User", userSchema)

