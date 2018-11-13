const empService = require('../../service/employee/employee');
class EmployeeController {
    async getEmployees(req, res) {
        try {
            global['logger'].debug('Request for get all employees received');
            let employees = await empService.getEmployees(req);
            res.json(employees);
        }
        catch (error) {
            res.json(error);
        }
    }

    async deleteAllEmployees(req, res) {
        try {
            global['logger'].debug('Request for delete all employees received');
            let employees = await empService.deleteAllEmployees(req);
            res.json(employees);
        }
        catch (error) {
            res.json(error);
        }
    }

    async addEmployee(req, res) {
        try {
            global['logger'].debug('request for add new employee received..');
            let employeeObj = await empService.addEmployee(req);
            res.json(employeeObj);
        }
        catch (error) {
            res.send(error);
        }
    }

    async getEmployeeById(req, res) {
        try {
            let employeeRecord = await empService.getEmployeeById(req.params.empId);
            res.json(employeeRecord);
        }
        catch (error) {
            res.send(error);
        }
    }

    async updateEmployeeById(req, res) {
        try {
            let employeeObj = {
            }
            for (let key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    employeeObj[key] = req.body[key];
                }
            }
            let employeeRecord = await empService.updateEmployeeById(req.params.empId, employeeObj)
            res.json(employeeRecord);
        }
        catch (error) {
            res.send(error);
        }
    }

    async deleteEmployeeById(req, res) {
        try {
            let employeeRecord = await empService.deleteEmployeeById(req.params.empId);
            res.json(employeeRecord);
        }
        catch (error) {
            res.send(error);
        }
    }
}
module.exports = new EmployeeController();