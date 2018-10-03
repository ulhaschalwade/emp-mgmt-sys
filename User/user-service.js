const request = require('request')
const userModel = require('./schema')
const config = require('config');
const jwt = require('jsonwebtoken');
class userService {
    async getAllExternalUsers() {
        request.get({
            uri: "https://api.github.com/users",
            headers: { 'user-agent': 'node.js' }
        }, (error, response, body) => {
            if (error)
                throw error;
            return body;
        });
        // return new Promise((resolve, reject) => {
        //     return request.get({
        //         uri: "https://api.github.com/users",
        //         headers: { 'user-agent': 'node.js' }
        //     }, (error, response, body) => {
        //         if (error)
        //             throw error;
        //         resolve(body);
        //     })
        // })
        //     .then(result => {
        //         return result;
        //     })
    }

    async getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            return request.get({
                uri: `https://api.github.com/users/${username}`,
                headers: { 'user-agent': 'node.js' }
            }, (error, response, body) => {
                if (error)
                    throw error;
                resolve(body);
            })
        })

    }

    async createAdminUser() {
        let users = await userModel.find({ username: 'System', isAdmin: true });
        if (!users || users.length == 0) {
            let adminUser = {
                username: "System",
                password: "System",
                isAdmin: true
            }
            users = await userModel.create(adminUser);
        }
        const [result,...rest] = users;
        const { password, ...usersWithoutPassword } = result;
        return usersWithoutPassword;
    }

    async authenticateUser(username, password) {
        // find the user
        let user = await userModel.findOne({
            username: username
        });
        if (!user)
            throw new Error({ success: false, message: 'Authentication failed. User not found.' });
        else if (user) {
            // check if password matches
            if (user.password != password) {
                throw new Error({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, config.get('SECRET'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                return {
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                };
            }
        }
    }
}
module.exports = new userService();