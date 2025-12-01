const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const commonSchema = {
    type: String,
    required: true
}

const userSchema = Schema({
    name: {
        ...commonSchema,
        trim: true
    },
    email: {
        ...commonSchema,
        unique: true,
        trim: true
    },
    password: {
        ...commonSchema,
        minlength: 6
    }
},
    {
        discriminatorKey: 'role',
        timestamps: true
    }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = model("User", userSchema)

