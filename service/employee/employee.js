const EmployeeModel = require('../../schema/employee/employee');
class empServices {
    async getEmployees(req) {
        let employees = await EmployeeModel.find();
        return employees;
    }

    async deleteAllEmployees(req) {
        let employees = await EmployeeModel.deleteMany();
        return employees;
    }

    async addEmployee(req) {
        global['logger'].debug("Request for add employee received..");
        let employeeObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            contactNumber: req.body.contactNumber,
            designation: req.body.designation,
            department: req.body.department
        }
        let employeeRecord = await EmployeeModel.create(employeeObj);
        return employeeRecord;
    }

    async getEmployeeById(empId) {
        let employeeRecord = await EmployeeModel.findById(empId);
        return employeeRecord;
    }

    async updateEmployeeById(empId, employeeObj) {
        let employeeRecord = await EmployeeModel.findOneAndUpdate(empId,employeeObj);
        return employeeRecord;
    }

    async deleteEmployeeById(empId) {
        let employeeRecord = await EmployeeModel.findByIdAndRemove(empId);
        return employeeRecord;
    }
}
module.exports = new empServices();