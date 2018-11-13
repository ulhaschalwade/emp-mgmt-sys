const express = require('express');
const router = express.Router();
const userController = require('../../controller/user/user');
const verifyToken = require('../../authentication/authenticationMiddleware');
router.route('/external')
    .get(verifyToken, userController.getAllExternalUsers)
router.route('/external/:username')
    .get(verifyToken, userController.getUserByUsername)
router.post('/addUser', userController.addUser);
router.post('/authenticate', userController.authenticateUser);
module.exports = router;