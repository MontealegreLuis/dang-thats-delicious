/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.reviewStore = async (request, response) => {
    request.body.author = request.user._id;
    request.body.store = request.params.id;

    const review = new Review(request.body);
    await review.save();

    request.flash('success', 'Review saved!');
    response.redirect('back');
};
