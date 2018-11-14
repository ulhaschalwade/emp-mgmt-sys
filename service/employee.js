const EmployeeModel = require('../models/employee');
const logger = global['logger'];

class empServices {
    async getEmployees() {
        logger.debug('Request for get all employee received...');
        const employees = await EmployeeModel.find();
        return employees;
    }

    async deleteAllEmployees() {
        logger.debug('Request for delete all employee received...');
        const employees = await EmployeeModel.deleteMany();
        return employees;
    }

    async addEmployee(employeeDetails) {
        logger.debug('Request for add employee received..');
        let employeeObj = {
            firstName: employeeDetails.firstName,
            lastName: employeeDetails.lastName,
            emailId: employeeDetails.emailId,
            contactNumber: employeeDetails.contactNumber,
            designation: employeeDetails.designation,
            department: employeeDetails.department
        }
        const employeeRecord = await EmployeeModel.create(employeeObj);
        return employeeRecord;
    }

    async getEmployeeById(empId) {
        logger.debug('Request for get employee received..');
        const employeeRecord = await EmployeeModel.findById(empId);
        return employeeRecord;
    }

    async updateEmployeeById(empId, employeeObj) {
        logger.debug('Request for update employee received..');
        const employeeRecord = await EmployeeModel.findOneAndUpdate(empId,employeeObj);
        return employeeRecord;
    }

    async deleteEmployeeById(empId) {
        logger.debug('Request for delete employee received..');
        const employeeRecord = await EmployeeModel.findByIdAndRemove(empId);
        return employeeRecord;
    }
}

module.exports = new empServices();