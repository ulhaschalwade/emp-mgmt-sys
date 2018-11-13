const userService = require('../service/user');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlerware/authentication');
const logger = global['logger'];

async function getAllUsers(req, res) {
    try {
        logger.info('Request for get all external users received');
        let users = await userService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.json(error);
    }
}

async function getUserByUsername(req, res) {
    try {
        logger.info('Request for get user by username received.');
        let user = await userService.getUserByUsername(req.params.username);
        res.json(user);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.json(error);
    }
}

async function addUser(req, res) {
    try {
        logger.info('Request for adding admin account received');
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
        logger.error(`Error occured...\n Error details ${error}`);
        res.status(400).send(error);
    }
}

async function authenticateUser(req, res) {
    try {
        logger.info('Request for authenticate user received');
        let result = await userService.authenticateUser(req.body.username, req.body.password);
        res.json(result);
    }
    catch (error) {
        logger.error(`Error occured...\n Error details ${error}`);
        res.send(error);
    }
}

//Routes
router.route('/gitUsers')
    .get(verifyToken, getAllUsers)
router.route('/gitUsers/:username')
    .get(verifyToken, getUserByUsername)
router.post('/addUser', addUser);
router.post('/authenticate', authenticateUser);

module.exports = router;