const express = require('express');
const router = express.Router();
const empController = require('./employee-controller');
router.route('/')
    .get(empController.getEmployees)
    .post(empController.addEmployee)
    .delete(empController.deleteAllEmployees)
    
router.route('/:_id')
    .get(empController.getEmployeeById)
    .put(empController.updateEmployeeById)
    .delete(empController.deleteEmployeeById)
module.exports = router;