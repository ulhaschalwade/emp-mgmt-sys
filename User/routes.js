const express = require('express');
const router = express.Router();
const userController = require('./user-controller');
const verifyToken = require('.././Authentication/authenticationMiddleware')
router.route('/external')
    .get(verifyToken, userController.getAllExternalUsers)
router.route('/external/:username')
    .get(verifyToken, userController.getUserByUsername)
router.post('/addUser', userController.addUser);
router.post('/authenticate', userController.authenticateUser);
module.exports = router;