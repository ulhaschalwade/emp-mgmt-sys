const EmployeeModel = require('../../schema/employee/employee');
class empServices {
    async getEmployees() {
        global['logger'].debug('Request for get all employee received...');
        let employees = await EmployeeModel.find();
        return employees;
    }

    async deleteAllEmployees() {
        global['logger'].debug('Request for delete all employee received...');
        let employees = await EmployeeModel.deleteMany();
        return employees;
    }

    async addEmployee(employeeDetails) {
        global['logger'].debug("Request for add employee received..");
        let employeeObj = {
            firstName: employeeDetails.firstName,
            lastName: employeeDetails.lastName,
            emailId: employeeDetails.emailId,
            contactNumber: employeeDetails.contactNumber,
            designation: employeeDetails.designation,
            department: employeeDetails.department
        }
        let employeeRecord = await EmployeeModel.create(employeeObj);
        return employeeRecord;
    }

    async getEmployeeById(empId) {
        global['logger'].debug("Request for get employee received..");
        let employeeRecord = await EmployeeModel.findById(empId);
        return employeeRecord;
    }

    async updateEmployeeById(empId, employeeObj) {
        global['logger'].debug("Request for update employee received..");
        let employeeRecord = await EmployeeModel.findOneAndUpdate(empId,employeeObj);
        return employeeRecord;
    }

    async deleteEmployeeById(empId) {
        global['logger'].debug("Request for delete employee received..");
        let employeeRecord = await EmployeeModel.findByIdAndRemove(empId);
        return employeeRecord;
    }
}
module.exports = new empServices();