const express = require('express');
const router = express.Router();
const userController = require('./user-controller');
router.route('/external')
    .get(userController.getAllExternalUsers)
router.route('/external/:username')
    .get(userController.getUserByUsername)
router.post('/setup',userController.createAdminUser);
router.post('/authenticate',userController.authenticateUser);    
module.exports = router;