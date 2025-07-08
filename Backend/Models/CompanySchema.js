const { Schema, model } = require("mongoose");

const commonSchema = {
    type: String,
}

const companySchema = new Schema({
    name: {
        ...commonSchema,
        required: true,
        unique: true
    },
    description: {
        ...commonSchema
    },
    website: {
        ...commonSchema
    },
    location: {
        ...commonSchema
    },
    logo: {
        ...commonSchema
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Company', companySchema);