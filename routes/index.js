/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store-controller');

router.get('/', storeController.homePage);

module.exports = router;
