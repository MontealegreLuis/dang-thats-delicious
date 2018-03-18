/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

const express = require('express');
const router = express.Router();
const {errorHandler} = require('../handlers/errors');
const storeController = require('../controllers/store-controller');

router.get('/', storeController.homePage);
router.get('/stores/add', storeController.addStore);
router.post('/stores/add', errorHandler(storeController.saveStore));

module.exports = router;
