/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const md5 = require('md5');
const validator = require('validator');
const mongoErrorHandler = require('mongoose-mongodb-errors');
const localPassport = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [
            validator.isEmail,
            'Invalid email address'
        ],
        required: true
    },
    name: {
        type: String,
        required: 'Please enter your name',
        trim: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.virtual('gravatar').get(function () {
    const hash = md5(this.email);
    return `https://www.gravatar.com/avatar/${hash}?s=30`;
});

userSchema.plugin(localPassport, {usernameField: 'email'});
userSchema.plugin(mongoErrorHandler);

module.exports = mongoose.model('User', userSchema);
