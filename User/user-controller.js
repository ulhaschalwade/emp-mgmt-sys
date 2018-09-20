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
}
module.exports = new userController();