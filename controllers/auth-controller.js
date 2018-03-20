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
