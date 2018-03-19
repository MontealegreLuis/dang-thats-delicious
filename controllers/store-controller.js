/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (request, response) => {
    response.render('hello');
};

exports.addStore = (request, response) => {
    response.render('add-store', {title: 'Add a store'});
};

exports.saveStore = async (request, response) => {
    const store = new Store(request.body);
    await store.save();
    response.redirect('/');
};

exports.viewStores = async (request, response) => {
    const stores = await Store.find();
    response.render('stores', {title: 'Stores', stores});
};

exports.editStore = async (request, response) => {
    const store = await Store.findById(request.params.id);
    response.render('edit-store', {title: `Edit ${store.name}`, store});
};

exports.updateStore = async (request, response) => {
    const store = await Store.findOneAndUpdate({_id: request.params.id}, request.body, {
        new: true,
        runValidators: true
    }).exec();
    request.flash(
        'success',
        `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View store</a>`
    );
    response.redirect(`/stores/${store._id}/edit`);
};
