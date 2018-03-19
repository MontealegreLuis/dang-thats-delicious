/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

storeSchema.pre('save', function(next) {
    if (!this.isModified('name')) return next();

    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Store', storeSchema);