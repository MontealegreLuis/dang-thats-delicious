/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(request, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');

        if (isPhoto) return next(null, true);

        return next({message: `File type ${file.mimetype} isn't allowed`}, false);
    }
};

exports.addStore = (request, response) => {
    response.render('add-store', {title: 'Add a store'});
};

exports.upload = multer(multerOptions).single('photo');
exports.resize = async (request, response, next) => {
    if (!request.file) return next();

    const extension = request.file.mimetype.split('/')[1];
    request.body.photo = `${uuid.v4()}.${extension}`;

    const photo = await jimp.read(request.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${request.body.photo}`);
    next();
};

exports.saveStore = async (request, response) => {
    request.body.author = request.user._id;
    const store = new Store(request.body);
    await store.save();
    response.redirect('/');
};

exports.viewStores = async (request, response) => {
    const stores = await Store.find();
    response.render('stores', {title: 'Stores', stores});
};

const confirmOwner = (store, author) => {
    if (!store.author.equals(author._id)) throw Error('You must own a store in order to edit it');
};

exports.editStore = async (request, response) => {
    const store = await Store.findById(request.params.id);

    confirmOwner(store, request.user);

    response.render('edit-store', {title: `Edit ${store.name}`, store});
};

exports.updateStore = async (request, response) => {
    request.body.location.type = 'Point'; // Otherwise geolocation queries won't work
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

exports.viewStore = async (request, response, next) => {
    const store = await Store.findOne({slug: request.params.slug});

    if (!store) return next();

    response.render('store', {store, title: store.name});
};

exports.viewStoresByTag = async (request, response) => {
    const currentTag = request.params.tag;
    const tagCriteria = currentTag || {$exists: true};

    const tagsPromise = await Store.tagsSummary();
    const storesPromise = await Store.find({tags: tagCriteria});
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

    response.render('tag', {tags, title: 'Tags', currentTag, stores});
};

exports.searchStores = async (request, response) => {
    const stores = await Store.find(
        {$text: {$search: request.query.q}},
        {score: {$meta: 'textScore'}}
    ).sort(
        {score: {$meta: 'textScore'}}
    ).limit(5);

    response.json(stores);
};
