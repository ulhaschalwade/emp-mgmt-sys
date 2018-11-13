const empService = require('../service/employee');
const logger = global['logger'];
class EmployeeController {
    async getEmployees(req, res) {
        try {
            logger.info('Request for get all employees received');
            let employees = await empService.getEmployees(req);
            res.json(employees);
        }
        catch (error) {
            logger.error(`Error occured...\n Error details ${error}`);
            res.json(error);
        }
    }

    async deleteAllEmployees(req, res) {
        try {
            logger.info('Request for delete all employees received');
            let employees = await empService.deleteAllEmployees(req);
            res.json(employees);
        }
        catch (error) {
            logger.error(`Error occured...\n Error details ${error}`);
            res.json(error);
        }
    }

    async addEmployee(req, res) {
        try {
            logger.info('Request for add new employee received..');
            let employeeObj = await empService.addEmployee(req.body);
            res.json(employeeObj);
        }
        catch (error) {
            logger.error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async getEmployeeById(req, res) {
        try {
            logger.info('Request for get employee by id received..');
            let employeeRecord = await empService.getEmployeeById(req.params.empId);
            res.json(employeeRecord);
        }
        catch (error) {
            logger.error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async updateEmployeeById(req, res) {
        try {
            logger.info('Request for update employee received..');
            let employeeRecord = await empService.updateEmployeeById(req.params.empId, req.body);
            res.json(employeeRecord);
        }
        catch (error) {
            logger.error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }

    async deleteEmployeeById(req, res) {
        try {
            logger.info('Request for delete employee received..');
            let employeeRecord = await empService.deleteEmployeeById(req.params.empId);
            res.json(employeeRecord);
        }
        catch (error) {
            logger.error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }
}
module.exports = new EmployeeController();