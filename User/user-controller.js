const userService = require('./user-service')
class userController {
    async getAllExternalUsers(req, res) {
        try {
            global['logger'].debug('Request for get all external users received');
            let users = await userService.getAllExternalUsers();
            res.json(users);
        }
        catch (error) {
            res.json(error);
        }
    }

    async getUserByUsername(req, res) {
        try {
            global['logger'].debug('Request for get user by username received.');
            let user = await userService.getUserByUsername(req.params.username);
            res.json(user);
        }
        catch (error) {
            res.json(error);
        }
    }

    async createAdminUser(req, res) {
        try {
            global['logger'].debug('Request for adding admin account received');
            let user = await userService.createAdminUser();
            res.json({success: true});
        }
        catch (error) {
            res.json(error);
        }
    }

    async authenticateUser(req, res) {
        try {
            global['logger'].debug('Request for authenticate user received');
            let result = await userService.authenticateUser(req.body.username, req.body.password);
            res.json(result);
        }
        catch (error) {
            res.send(error);
        }
    }
}
module.exports = new userController();