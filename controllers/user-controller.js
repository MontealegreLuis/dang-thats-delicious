/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');

exports.showRegistrationForm = (request, response) => {
    response.render('register', {title: 'Register'});
};

exports.validateNewUser = (request, response, next) => {
    request.sanitizeBody('name');
    request.checkBody('name', 'Please enter your name').notEmpty();
    request.checkBody('email', 'That email is invalid').isEmail();
    request.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    request.checkBody('password', 'Password cannot be blank').notEmpty();
    request.checkBody('password-confirm', 'Confirmed password cannot be blank').notEmpty();
    request.checkBody('password-confirm', 'Your passwords do not match').equals(request.body.password);

    const errors = request.validationErrors();

    if (!errors) return next();

    request.flash('danger', errors.map(error => error.msg));
    response.render('register', {title: 'Register', body: request.body, flashes: request.flash()});
};

exports.registerUser = async (request, response, next) => {
    const user = new User({email: request.body.email, name: request.body.name});
    const register = promisify(User.register, User);
    await register(user, request.body.password);
    next();
};
