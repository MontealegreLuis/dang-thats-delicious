/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

exports.siteName = `Now That's Delicious!`;

exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

exports.moment = require('moment');
