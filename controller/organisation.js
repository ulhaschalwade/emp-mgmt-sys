const orgService = require('../services/organisation');
const logger = global['logger'];
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlerware/authentication');

//Routes
router.route('/')
    .get(verifyToken, getAllOrganisations)
    .post(verifyToken, addNewOrganisation)

router.route('/:orgId')
    .get(verifyToken, getOrganisationById)
    .delete(verifyToken, deleteOrganisationById)
    .put(verifyToken, updateOrganisationById)

router.route('/:orgId/employee')
    .get(verifyToken, getAllEmployeesFromOrganisation)
    .delete(verifyToken, deleteAllEmployeesFromOrganisation)

router.route('/:orgId/employee/:empId')
    .get(verifyToken, getEmployeeFromOrganisation)
    .delete(verifyToken, removeEmployeeFromOrganisation)
    .put(verifyToken, addEmployeeInOrganisation)  
 
async function getAllOrganisations(req, res) {
    try {
        logger.info('Request for get all organisations received');
        const organisations = await orgService.getAllOrganisations();
        res.json(organisations);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function getOrganisationById(req, res) {
    try {
        logger.info('Request for get organisation by id received');
        const organisation = await orgService.getOrganisationById(req.params.orgId);
        res.json(organisation);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function updateOrganisationById(req, res) {
    try {
        logger.info('Request for update organisation by id received');
        const updatedOrganisation = await orgService.updateOrganisationById(req.params.orgId, req.body);
        res.json(updatedOrganisation);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function deleteOrganisationById(req, res) {
    try {
        logger.info('Request for delete organisation by id received');
        const deletedOrganisation = await orgService.deleteOrganisationById(req.params.orgId);
        res.json(deletedOrganisation);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function addNewOrganisation(req, res) {
    try {
        logger.info('Request for add new organisation received');
        let newOrgObj = {
            name: req.body.name,
            country: req.body.country
        }
        const newOrganisation = await orgService.addNewOrganisation(newOrgObj);
        res.json(newOrganisation);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function getAllEmployeesFromOrganisation(req, res) {
    try {
        logger.info('Request for get all employees of organisation received');
        const employees = await orgService.getAllEmployeesFromOrganisation(req.params.orgId);
        res.json(employees);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function deleteAllEmployeesFromOrganisation(req, res) {
    try {
        logger.info('Request for delete all employees of organisation received');
        const employees = await orgService.deleteAllEmployeesFromOrganisation(req.params.orgId);
        res.json(employees);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function getEmployeeFromOrganisation(req, res) {
    try {
        logger.info('Request to get employee by id from organisation received');
        const employees = await orgService.getEmployeeFromOrganisation(req.params.orgId, req.params.empId);
        res.json(employees);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function removeEmployeeFromOrganisation(req, res) {
    try {
        logger.info('Request to remove employee by id from organisation received');
        const employees = await orgService.getAllEmployeesFromOrganisation(req.params.orgId, req.params.empId);
        res.json(employees);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

async function addEmployeeInOrganisation(req, res) {
    try {
        logger.info('Request to add existing employee in organisation received');
        const employees = await orgService.getAllEmployeesFromOrganisation(req.params.orgId, req.params.empId);
        res.json(employees);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}
   
module.exports = router;