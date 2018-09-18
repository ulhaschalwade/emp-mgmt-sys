const orgModel = require('./schema');
const EmployeeModel = require('../EmployeePlugin/schema');
class orgServices {
    async getAllOrganisations() {
        let organisations = await orgModel.find();
        return organisations;
    }

    async getOrganisationById(id) {
        let organisation = await orgModel.findById(id);
        return organisation;
    }

    async updateOrganisationById(id, updatedObj) {
        let updatedOrganisation = await orgModel.findByIdAndUpdate(id
            , updatedObj);
        return updatedOrganisation;
    }

    async deleteOrganisationById(id) {
        let deletedOrganisation = await orgModel.findByIdAndRemove(id);
        return deletedOrganisation;
    }

    async addNewOrganisation(newObj) {
        let newOrganisation = await orgModel.create(newObj);
        return newOrganisation;
    }

    async getAllEmployeesFromOrganisation(orgId) {
        try {
            let employees = await orgModel.findById(orgId)
                .populate('Employee')
                .exec()
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async deleteAllEmployeesFromOrganisation(orgId) {
        try {
            let employees = await orgService.deleteAllEmployeesFromOrganisation(req.params._id);
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async getEmployeeFromOrganisation(orgId, empId) {
        try {
            let employees = await orgModel.findById(orgId)
                .populate('Employee', {}, {}, { _id: empId })
                .exec()
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async removeEmployeeFromOrganisation(orgId, empId) {
        try {
            let employees = await orgModel.
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }

    async addEmployeeInOrganisation(orgId, empId) {
        try {
            let employees = await orgService.getAllEmployeesFromOrganisation(req.params._id, req.params.empId);
            res.json(employees);
        }
        catch (error) {
            res.send(error);
        }
    }
}
module.exports = new orgServices();