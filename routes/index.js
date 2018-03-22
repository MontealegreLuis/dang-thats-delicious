/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */

const express = require('express');
const router = express.Router();
const {errorHandler} = require('../handlers/errors');
const storeController = require('../controllers/store-controller');
const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller');
const reviewController = require('../controllers/review-controller');

router.get('/', errorHandler(storeController.viewStores));
router.get('/stores', errorHandler(storeController.viewStores));
router.get('/stores/page/:page', errorHandler(storeController.viewStores));
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
router.get('/map', storeController.showMap);
router.get(
    '/hearts',
    authController.isLoggedIn,
    errorHandler(storeController.showHearts)
);
router.post(
    '/reviews/:id',
    authController.isLoggedIn,
    errorHandler(reviewController.reviewStore)
);
router.get('/top', errorHandler(storeController.topStores));

router.get('/api/search', errorHandler(storeController.searchStores));
router.get('/api/stores/near', errorHandler(storeController.mapStores));
router.post(
    '/api/stores/:id/heart',
    authController.isLoggedIn,
    errorHandler(storeController.heartStore)
);

module.exports = router;
