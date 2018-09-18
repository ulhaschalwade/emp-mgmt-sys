const request = require('request')
class userService {
    async getAllExternalUsers() {
        return new Promise((resolve, reject) => {
            return request.get({
                uri: "https://api.github.com/users",
                headers: { 'user-agent': 'node.js' }
            }, (error, response, body) => {
                if (error)
                    throw error;
                resolve(body);
            })
        })
            .then(result => {
                return result;
            })
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
}
module.exports = new userService();