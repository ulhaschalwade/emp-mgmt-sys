const empService = require('../services/employee');
const logger = global['logger'];
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlerware/authentication');

//Routes
router.route('/')
    .get(verifyToken, getEmployees)
    .post(verifyToken, addEmployee)
    .delete(verifyToken, deleteAllEmployees)

router.route('/:empId')
    .get(verifyToken, getEmployeeById)
    .put(verifyToken, updateEmployeeById)
    .delete(verifyToken, deleteEmployeeById)

async function getEmployees(req, res) {
    try {
        logger.info('Request for get all employees received');
        const employees = await empService.getEmployees(req);
        res.json(employees);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.json(error);
    }
}

async function deleteAllEmployees(req, res) {
    try {
        logger.info('Request for delete all employees received');
        const employees = await empService.deleteAllEmployees(req);
        res.json(employees);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.json(error);
    }
}

async function addEmployee(req, res) {
    try {
        logger.info('Request for add new employee received..');
        const employeeObj = await empService.addEmployee(req.body);
        res.json(employeeObj);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function getEmployeeById(req, res) {
    try {
        logger.info('Request for get employee by id received..');
        const employeeRecord = await empService.getEmployeeById(req.params.empId);
        res.json(employeeRecord);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function updateEmployeeById(req, res) {
    try {
        logger.info('Request for update employee received..');
        const employeeRecord = await empService.updateEmployeeById(req.params.empId, req.body);
        res.json(employeeRecord);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function deleteEmployeeById(req, res) {
    try {
        logger.info('Request for delete employee received..');
        const employeeRecord = await empService.deleteEmployeeById(req.params.empId);
        res.json(employeeRecord);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}
    
module.exports = router;