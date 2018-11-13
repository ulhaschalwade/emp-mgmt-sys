const orgModel = require('../../schema/organisation/organisation');
class OrganisationService {
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
                .populate('Employee', ['firstName', 'lastName'])
                .exec()
            return employees;
        }
        catch (error) {
            res.send(error);
        }
    }

    async deleteAllEmployeesFromOrganisation(orgId) {
        try {
            let result = orgModel.findById(orgId)
                .populate('Employee')
                .exec((error, employees) => {
                    if (error)
                        throw error;
                    employees = [];
                    employees.save();
                })
            return result;
        }
        catch (error) {
            res.send(error);
        }
    }

    async getEmployeeFromOrganisation(orgId, empId) {
        try {
            let employee = await orgModel.findById(orgId)
                .populate('Employee', ['firstName', 'lastName'], null, { _id: empId })
                .exec()
            return employee;
        }
        catch (error) {
            res.send(error);
        }
    }

    async removeEmployeeFromOrganisation(orgId, empId) {
        try {
            let result = orgModel.findById(orgId)
                .populate('Employee')
                .exec((error, employees) => {
                    if (error)
                        throw error;
                    if (employees.indexOf(empId) !== -1) {
                        employees.splice(employees.indexOf(empId), 1);
                        employees.save();
                    }
                })
            return result;
        }
        catch (error) {
            res.send(error);
        }
    }

    async addEmployeeInOrganisation(orgId, empId) {
        try {
            let result = orgModel.findById(orgId)
                .populate('Employee')
                .exec((error, employees) => {
                    if (error)
                        throw error;
                    employees.push(empId);
                    employees.save();
                })
            return result;
        }
        catch (error) {
            res.send(error);
        }
    }
}
module.exports = new OrganisationService();