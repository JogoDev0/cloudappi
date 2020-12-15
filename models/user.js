const mongoose = require('mongoose');
const validator = require('validator');
const addressSchema = require('../models/address');

const User = mongoose.model('User', {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    birthDate: {
        type: Date,
        required: true
    },
    address: addressSchema
})

module.exports = User