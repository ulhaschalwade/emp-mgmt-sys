const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const verifyToken = require('../middlerware/authentication');
router.route('/gitUsers')
    .get(verifyToken, userController.getAllUsers)
router.route('/gitUsers/:username')
    .get(verifyToken, userController.getUserByUsername)
router.post('/addUser', userController.addUser);
router.post('/authenticate', userController.authenticateUser);
module.exports = router;