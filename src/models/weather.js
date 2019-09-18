const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        temperature: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        icon: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Weather', weatherSchema);