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
router.get('/:orgId/employees', orgController.getAllEmployeesFromOrganisation)

module.exports = router;