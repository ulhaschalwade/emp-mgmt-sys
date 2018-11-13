const userService = require('../service/user');
class UserController {
    async getAllUsers(req, res) {
        try {
            global['logger'].info('Request for get all external users received');
            let users = await userService.getAllUsers();
            res.json(users);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.json(error);
        }
    }

    async getUserByUsername(req, res) {
        try {
            global['logger'].info('Request for get user by username received.');
            let user = await userService.getUserByUsername(req.params.username);
            res.json(user);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.json(error);
        }
    }

    async addUser(req, res) {
        try {
            global['logger'].info('Request for adding admin account received');
            let user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            }
            let result = await userService.addUser(user);
            res.json({ success: true });
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.status(400).send(error);
        }
    }

    async authenticateUser(req, res) {
        try {
            global['logger'].info('Request for authenticate user received');
            let result = await userService.authenticateUser(req.body.username, req.body.password);
            res.json(result);
        }
        catch (error) {
            global['logger'].error(`Error occured...\n Error details ${error}`);
            res.send(error);
        }
    }
}
module.exports = new UserController();