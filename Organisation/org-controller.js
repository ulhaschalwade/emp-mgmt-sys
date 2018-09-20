const orgService = require('./org-service')

class orgController {

    async getAllOrganisations(req, res) {
        try {
            let organisations = await orgService.getAllOrganisations();
            res.json(organisations);
        }
        catch (error) {
            res.send(error);
        }
    }

    async getOrganisationById(req, res) {
        try {
            let organisation = await orgService.getOrganisationById(req.params._id);
            res.json(organisation);
        }
        catch (error) {
            res.send(error);
        }
    }

    async updateOrganisationById(req, res) {
        try {
            let updatedObj = {
            }
            for (let key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    updatedObj[key] = req.body[key];
                }
            }
            let updatedOrganisation = await orgService.updateOrganisationById(req.params._id, updatedObj);
            res.json(updatedOrganisation);
        }
        catch (error) {
            res.send(error);
        }
    }

    async deleteOrganisationById(req, res) {
        try {
            let deletedOrganisation = await orgService.deleteOrganisationById(req.params._id);
            res.json(deletedOrganisation);
        }
        catch (error) {
            res.send(error);
        }
    }
    
    async addNewOrganisation(req, res) {
        try {
            let newOrgObj = {
                name: req.body.name,
                country: req.body.country
            }
            let newOrganisation = await orgService.addNewOrganisation(newOrgObj);
            res.json(newOrganisation);
        }
        catch (error) {
            res.send(error);
        }
    }

    async getAllEmployeesFromOrganisation(req, res) {
        try {
            let employees = await orgService.getAllEmployeesFromOrganisation(req.params._id);
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async deleteAllEmployeesFromOrganisation(req, res) {
        try {
            let employees = await orgService.deleteAllEmployeesFromOrganisation(req.params._id);
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async getEmployeeFromOrganisation(req, res) {
        try {
            let employees = await orgService.getEmployeeFromOrganisation(req.params._id, req.params.empId);
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async removeEmployeeFromOrganisation(req, res) {
        try {
            let employees = await orgService.getAllEmployeesFromOrganisation(req.params._id, req.params.empId);
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async addEmployeeInOrganisation(req, res) {
        try {
            let employees = await orgService.getAllEmployeesFromOrganisation(req.params._id, req.params.empId);
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }
}
module.exports = new orgController();