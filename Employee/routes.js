const express = require('express');
const router = express.Router();
const empController = require('./employee-controller');
const verifyToken = require('.././Authentication/authenticationMiddleware')
router.route('/')
    .get(verifyToken, empController.getEmployees)
    .post(verifyToken, empController.addEmployee)
    .delete(verifyToken, empController.deleteAllEmployees)

router.route('/:empId')
    .get(verifyToken, empController.getEmployeeById)
    .put(verifyToken, empController.updateEmployeeById)
    .delete(verifyToken, empController.deleteEmployeeById)
module.exports = router;