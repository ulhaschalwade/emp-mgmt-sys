const express = require('express');
const router = express.Router();
const authController = require('./authentication-controller');
router.route('/login')
    .post(authController.login)

module.exports = router;