/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

exports.errorHandler = (fn) => {
    return function(request, response, next) {
        return fn(request, response, next).catch(next);
    };
};

exports.notFound = (request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
};

/**
 * MongoDB Validation Error Handler
 * Detect if there are mongodb validation errors that we can nicely show via flash messages
 */
exports.flashValidationErrors = (validation, request, response, next) => {
    if (!validation.errors) return next(validation);
    // validation errors look like
    const errorKeys = Object.keys(validation.errors);
    errorKeys.forEach(key => request.flash('danger', validation.errors[key].message));
    response.redirect('back');
};
