/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed login!',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
});

exports.logout = (request, response) => {
    request.logout();
    request.flash('success', "You've been logged out");
    response.redirect('/');
};

exports.isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) return next();

    request.flash('danger', 'You must be logged in to do that');
    response.redirect('/login');
};

exports.forgotPassword = async (request, response) => {
    const user = await User.findOne({email: request.body.email});
    if (!user) {
        request.flash('danger', 'There is no account associated to your email');
        return response.redirect('back');
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetURL = `http://${request.headers.host}/account/reset/${user.resetPasswordToken}`;
    await mail.send({
        user,
        subject: 'Password reset',
        resetURL,
        filename: 'password-reset'
    });
    request.flash('success', 'You have been emailed a password with a reset link');
    response.redirect('/login');
};

exports.showResetForm = async (request, response) => {
    console.log(request.params);
    const user = await User.findOne({
        resetPasswordToken: request.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    });
    if (!user) {
        request.flash('danger', 'Password reset is invalid or has expired');
        return response.redirect('/login');
    }
    response.render('reset-password', {title: 'Reset your password'});
};

exports.confirmPasswords = (request, response, next) => {
    if (request.body.password === request.body['confirm-password']) return next();

    request.flash('danger', 'Passwords do not match');
    response.redirect('back');
};

exports.updatePassword = async (request, response) => {
    const user = await User.findOne({
        resetPasswordToken: request.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    });
    if (!user) {
        request.flash('danger', 'Password reset is invalid or has expired');
        return response.redirect('/login');
    }
    const changePassword = promisify(user.setPassword, user);
    await changePassword(request.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    const login = promisify(request.login, request);
    await login(user);
    request.flash('success', 'Your password has been reset! You are now logged in!');
    response.redirect('/');
};
