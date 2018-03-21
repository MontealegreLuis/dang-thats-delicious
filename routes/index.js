/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

const express = require('express');
const router = express.Router();
const {errorHandler} = require('../handlers/errors');
const storeController = require('../controllers/store-controller');
const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller');

router.get('/', errorHandler(storeController.viewStores));
router.get('/stores', errorHandler(storeController.viewStores));
router.get(
    '/stores/add',
    authController.isLoggedIn,
    storeController.addStore
);
router.post(
    '/stores/add',
    authController.isLoggedIn,
    storeController.upload,
    errorHandler(storeController.resize),
    errorHandler(storeController.saveStore)
);
router.get(
    '/stores/:id/edit',
    authController.isLoggedIn,
    errorHandler(storeController.editStore)
);
router.post(
    '/stores/:id/edit',
    authController.isLoggedIn,
    storeController.upload,
    errorHandler(storeController.resize),
    errorHandler(storeController.updateStore)
);
router.get('/stores/:slug', errorHandler(storeController.viewStore));
router.get('/tags', errorHandler(storeController.viewStoresByTag));
router.get('/tags/:tag', errorHandler(storeController.viewStoresByTag));

router.get('/register', userController.showRegistrationForm);
router.post(
    '/register',
    userController.validateNewUser,
    errorHandler(userController.registerUser),
    authController.login
);
router.get('/login', userController.showLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get(
    '/account',
    authController.isLoggedIn,
    userController.account
);
router.post(
    '/account',
    authController.isLoggedIn,
    errorHandler(userController.updateAccount)
);
router.post('/account/forgot', errorHandler(authController.forgotPassword));
router.get('/account/reset/:token', errorHandler(authController.showResetForm));
router.post(
    '/account/reset/:token',
    authController.confirmPasswords,
    errorHandler(authController.updatePassword)
);

router.get('/api/search', errorHandler(storeController.searchStores));

router.get('/api/stores/near', errorHandler(storeController.mapStores));
router.get('/map', storeController.showMap);

module.exports = router;
