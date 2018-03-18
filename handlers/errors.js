/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

exports.errorHandler = (fn) => {
    return function(request, response, next) {
        return fn(request, response, next).catch(next);
    };
};
