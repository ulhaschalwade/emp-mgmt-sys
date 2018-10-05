const express = require('express');
const router = express.Router();
const orgController = require('./org-controller')
const verifyToken = require('.././Authentication/authenticationMiddleware')
router.route('/')
    .get(verifyToken, orgController.getAllOrganisations)
    .post(verifyToken, orgController.addNewOrganisation)

router.route('/:orgId')
    .get(verifyToken, orgController.getOrganisationById)
    .delete(verifyToken, orgController.deleteOrganisationById)
    .put(verifyToken, orgController.updateOrganisationById)

router.route('/:orgId/employee')
    .get(verifyToken, orgController.getAllEmployeesFromOrganisation)
    .delete(verifyToken, orgController.deleteAllEmployeesFromOrganisation)

router.route('/:orgId/employee/:empId')
    .get(verifyToken, orgController.getEmployeeFromOrganisation)
    .delete(verifyToken, orgController.removeEmployeeFromOrganisation)
    .put(verifyToken, orgController.addEmployeeInOrganisation)


module.exports = router;