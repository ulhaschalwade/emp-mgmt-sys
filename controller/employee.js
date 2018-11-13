const empService = require('../service/employee');
class EmployeeController {
    async getEmployees(req, res) {
        try {
            global['logger'].info('Request for get all employees received');
            let employees = await empService.getEmployees(req);
            res.json(employees);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.json(error);
        }
    }

    async deleteAllEmployees(req, res) {
        try {
            global['logger'].info('Request for delete all employees received');
            let employees = await empService.deleteAllEmployees(req);
            res.json(employees);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.json(error);
        }
    }

    async addEmployee(req, res) {
        try {
            global['logger'].info('Request for add new employee received..');
            let employeeObj = await empService.addEmployee(req.body);
            res.json(employeeObj);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async getEmployeeById(req, res) {
        try {
            global['logger'].info('Request for get employee by id received..');
            let employeeRecord = await empService.getEmployeeById(req.params.empId);
            res.json(employeeRecord);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async updateEmployeeById(req, res) {
        try {
            global['logger'].info('Request for update employee received..');
            let employeeObj = {
            }
            for (let key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    employeeObj[key] = req.body[key];
                }
            }
            let employeeRecord = await empService.updateEmployeeById(req.params.empId, employeeObj);
            res.json(employeeRecord);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async deleteEmployeeById(req, res) {
        try {
            global['logger'].info('Request for delete employee received..');
            let employeeRecord = await empService.deleteEmployeeById(req.params.empId);
            res.json(employeeRecord);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }
}
module.exports = new EmployeeController();