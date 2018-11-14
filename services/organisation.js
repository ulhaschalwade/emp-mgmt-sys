const orgModel = require('../models/organisation');
const logger = global['logger'];

class OrganisationService {
    async getAllOrganisations() {
        logger.debug('Request for get all organisations received..');
        const organisations = await orgModel.find();
        return organisations;
    }

    async getOrganisationById(id) {
        logger.debug('Request for get organisation by id received..');
        const organisation = await orgModel.findById(id);
        return organisation;
    }

    async updateOrganisationById(id, updatedObj) {
        logger.debug('Request for update organisation by id received..');
        const updatedOrganisation = await orgModel.findByIdAndUpdate(id
            , updatedObj);
        return updatedOrganisation;
    }

    async deleteOrganisationById(id) {
        logger.debug('Request for delete organisation by id received..');
        const deletedOrganisation = await orgModel.findByIdAndRemove(id);
        return deletedOrganisation;
    }

    async addNewOrganisation(newObj) {
        logger.debug('Request for add new organisation received..');
        const newOrganisation = await orgModel.create(newObj);
        return newOrganisation;
    }

    async getAllEmployeesFromOrganisation(orgId) {
        logger.debug('Request for get all employees of organisation received..');
        const employees = await orgModel.findById(orgId)
            .populate('Employee', ['firstName', 'lastName'])
            .exec()
        return employees;
    }

    async deleteAllEmployeesFromOrganisation(orgId) {
        logger.debug('Request for delete all employees of organisation received..');
        const result = orgModel.findById(orgId)
            .populate('Employee')
            .exec((error, employees) => {
                if (error)
                    throw error;
                employees = [];
                employees.save();
            })
        return result;
    }

    async getEmployeeFromOrganisation(orgId, empId) {
        logger.debug('Request for get employee by id of an organisation received..');
        const employee = await orgModel.findById(orgId)
            .populate('Employee', ['firstName', 'lastName'], null, { _id: empId })
            .exec()
        return employee;
    }

    async removeEmployeeFromOrganisation(orgId, empId) {
        logger.debug('Request for remove employee by id of an organisation received..');
        const result = orgModel.findById(orgId)
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

    async addEmployeeInOrganisation(orgId, empId) {
        logger.debug('Request for add new employee in organisation received..');
        const result = orgModel.findById(orgId)
            .populate('Employee')
            .exec((error, employees) => {
                if (error)
                    throw error;
                employees.push(empId);
                employees.save();
            })
        return result;
    }
}

module.exports = new OrganisationService();