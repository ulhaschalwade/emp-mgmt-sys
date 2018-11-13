const orgService = require('../../service/organisation/organisation');

class OrganisationController {

    async getAllOrganisations(req, res) {
        try {
            global['logger'].info('Request for get all organisations received');
            let organisations = await orgService.getAllOrganisations();
            res.json(organisations);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async getOrganisationById(req, res) {
        try {
            global['logger'].info('Request for get organisation by id received');
            let organisation = await orgService.getOrganisationById(req.params.orgId);
            res.json(organisation);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async updateOrganisationById(req, res) {
        try {
            global['logger'].info('Request for update organisation by id received');
            let updatedOrganisation = await orgService.updateOrganisationById(req.params.orgId, req.body);
            res.json(updatedOrganisation);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async deleteOrganisationById(req, res) {
        try {
            global['logger'].info('Request for delete organisation by id received');
            let deletedOrganisation = await orgService.deleteOrganisationById(req.params.orgId);
            res.json(deletedOrganisation);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }
    
    async addNewOrganisation(req, res) {
        try {
            global['logger'].info('Request for add new organisation received');
            let newOrgObj = {
                name: req.body.name,
                country: req.body.country
            }
            let newOrganisation = await orgService.addNewOrganisation(newOrgObj);
            res.json(newOrganisation);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async getAllEmployeesFromOrganisation(req, res) {
        try {
            global['logger'].info('Request for get all employees of organisation received');
            let employees = await orgService.getAllEmployeesFromOrganisation(req.params.orgId);
            res.json(employees);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async deleteAllEmployeesFromOrganisation(req, res) {
        try {
            global['logger'].info('Request for delete all employees of organisation received');
            let employees = await orgService.deleteAllEmployeesFromOrganisation(req.params.orgId);
            res.json(employees);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async getEmployeeFromOrganisation(req, res) {
        try {
            global['logger'].info('Request to get employee by id from organisation received');
            let employees = await orgService.getEmployeeFromOrganisation(req.params.orgId, req.params.empId);
            res.json(employees);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async removeEmployeeFromOrganisation(req, res) {
        try {
            global['logger'].info('Request to remove employee by id from organisation received');
            let employees = await orgService.getAllEmployeesFromOrganisation(req.params.orgId, req.params.empId);
            res.json(employees);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async addEmployeeInOrganisation(req, res) {
        try {
            global['logger'].info('Request to add existing employee in organisation received');
            let employees = await orgService.getAllEmployeesFromOrganisation(req.params.orgId, req.params.empId);
            res.json(employees);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }
}
module.exports = new OrganisationController();