/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

const express = require('express');
const router = express.Router();
const {errorHandler} = require('../handlers/errors');
const storeController = require('../controllers/store-controller');

router.get('/', errorHandler(storeController.viewStores));
router.get('/stores', errorHandler(storeController.viewStores));
router.get('/stores/add', storeController.addStore);
router.post('/stores/add', errorHandler(storeController.saveStore));
router.get('/stores/:id/edit', errorHandler(storeController.editStore));
router.post('/stores/:id/edit', errorHandler(storeController.updateStore));

module.exports = router;
