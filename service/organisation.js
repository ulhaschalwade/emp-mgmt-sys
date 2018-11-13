const orgModel = require('../models/organisation');
const logger = global['logger'];
class OrganisationService {
    async getAllOrganisations() {
        logger.debug('Request for get all organisations received..');
        let organisations = await orgModel.find();
        return organisations;
    }

    async getOrganisationById(id) {
        logger.debug('Request for get organisation by id received..');
        let organisation = await orgModel.findById(id);
        return organisation;
    }

    async updateOrganisationById(id, updatedObj) {
        logger.debug('Request for update organisation by id received..');
        let updatedOrganisation = await orgModel.findByIdAndUpdate(id
            , updatedObj);
        return updatedOrganisation;
    }

    async deleteOrganisationById(id) {
        logger.debug('Request for delete organisation by id received..');
        let deletedOrganisation = await orgModel.findByIdAndRemove(id);
        return deletedOrganisation;
    }

    async addNewOrganisation(newObj) {
        logger.debug('Request for add new organisation received..');
        let newOrganisation = await orgModel.create(newObj);
        return newOrganisation;
    }

    async getAllEmployeesFromOrganisation(orgId) {
        try {
            logger.debug('Request for get all employees of organisation received..');
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
            logger.debug('Request for delete all employees of organisation received..');
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
            logger.debug('Request for get employee by id of an organisation received..');
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
            logger.debug('Request for remove employee by id of an organisation received..');
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
            logger.debug('Request for add new employee in organisation received..');
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