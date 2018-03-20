/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const passport = require('passport');

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
