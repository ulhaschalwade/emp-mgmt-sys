const request = require('request');
const userModel = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const uuid = require('uuidv4');
const logger = global['logger'];

class UserService {
    async getAllUsers() {
        logger.debug('Request for get all git users received');
        return new Promise((resolve, reject) => {
            request.get({
                uri: 'https://api.github.com/users',
                headers: { 'user-agent': 'node.js' }
            }, (error, response, body) => {
                if (error)
                    throw error;
                resolve(body);
            });
        })
    }

    async getUserByUsername(username) {
        logger.debug('Request for get git user by username received');
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

    async addUser(user) {
        logger.debug('Request for add user received');
        let users = await userModel.find({ username: user.username });
        if (!users || users.length == 0) {
            users = await userModel.create(user);
            const [result, ...rest] = users;
            const { password, ...usersWithoutPassword } = result;
            return usersWithoutPassword;
        }
        else {
            throw Error(`User with the given username already exists...`);
        }

    }

    async authenticateUser(username, password) {
        logger.debug('Request for authenticate user received');
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
                    username: user.username,
                };
                const token = await jwt.sign(payload, config.get('SECRET'), {
                    expiresIn: 60 * 60 * 24
                });
                return {
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                }
            }
        }
    }
}

module.exports = new UserService();