const express = require('express');
const router = express.Router();
const orgController = require('./org-controller')
router.route('/')
    .get(orgController.getAllOrganisations)
    .post(orgController.addNewOrganisation)

router.route('/:_id')
    .get(orgController.getOrganisationById)
    .delete(orgController.deleteOrganisationById)
    .put(orgController.updateOrganisationById)

router.route('/:_id/employee')
    .get(orgController.getAllEmployeesFromOrganisation)
    .delete(orgController.deleteAllEmployeesFromOrganisation)

route.route('/:_id/employee/:empId')
    .get(orgController.getEmployeeFromOrganisation)
    .delete(orgController.removeEmployeeFromOrganisation)
    .put(orgController.addEmployeeInOrganisation)


module.exports = router;