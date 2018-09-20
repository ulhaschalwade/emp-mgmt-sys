const express = require('express');
const router = express.Router();
const orgController = require('./org-controller')
router.route('/')
    .get(orgController.getAllOrganisations)
    .post(orgController.addNewOrganisation)

router.route('/:orgId')
    .get(orgController.getOrganisationById)
    .delete(orgController.deleteOrganisationById)
    .put(orgController.updateOrganisationById)

router.route('/:orgId/employee')
    .get(orgController.getAllEmployeesFromOrganisation)
    .delete(orgController.deleteAllEmployeesFromOrganisation)

router.route('/:orgId/employee/:empId')
    .get(orgController.getEmployeeFromOrganisation)
    .delete(orgController.removeEmployeeFromOrganisation)
    .put(orgController.addEmployeeInOrganisation)


module.exports = router;