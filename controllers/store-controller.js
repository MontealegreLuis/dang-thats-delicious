/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (request, response) => {
    response.render('hello');
};

exports.addStore = (request, response) => {
    response.render('store-form', {title: 'Add a store'});
};

exports.saveStore = async (request, response) => {
    const store = new Store(request.body);
    await store.save();
    response.redirect('/');
};
