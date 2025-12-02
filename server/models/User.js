const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const commonSchema = {
    type: String,
    required: true
}

const userSchema = new Schema({
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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = model("User", userSchema)

