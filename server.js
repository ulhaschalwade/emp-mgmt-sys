
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Constants = require('./constants');
const LoggerHelper = require('./logger-helper');

//routes
const empPluginRoutes = require('./EmployeePlugin/routes');
const orgPluginRoutes = require('./OrganisationPlugin/routes');
const usersPluginRoutes = require('./UserPlugin/routes');


class TestServer {
    constructor() {
        this.emsApp = express();
    }

    start() {
        this.init();
    }

    init() {
        this.setupMiddlewares();
        this.setupRoutes();
        this.initializeLogger();
        this.connectToDB();
    }

    setupMiddlewares() {
        //middlewares
        this.emsApp.use(bodyParser.urlencoded({ extended: true }))
        this.emsApp.use(bodyParser.json());
        this.emsApp.use(cors({
            origin: (origin, callback) => {
                console.log(origin)
                if (Constants.ALLOWED_REQUEST_ORIGINS.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Accessing this resource is not allowed due to CORS!!'));
                }
            }
        }))
    }

    setupRoutes() {
        //Register plugins/routes
        this.emsApp.use('/api/employee', empPluginRoutes);
        this.emsApp.use('/api/organisation', orgPluginRoutes);
        this.emsApp.use('/api/user', usersPluginRoutes);
    }

    async initializeLogger() {
        try {
            let loggerHelper = new LoggerHelper();
            loggerHelper.init();
            this.logger = global['logger'];
        }
        catch (error) {
            console.log(`Error occured while configuring logger.\n Error details ${error}`);
            throw error;
        }
    }

    async connectToDB() {
        //database connection
        try {
            let result = await mongoose.connect(Constants.DB_CONFIG, { useNewUrlParser: true });
            result.connection.on('connected', () => {
                this.logger.info("Database connection established..");
            })
            result.connection.on('error', (error) => {
                this.logger.error(`Error occured while connecting to database.. \nError details: ${error}`);
            })
        }
        catch (error) {
            this.logger.error(`Error occured while connecting to database.\n Error details ${error}`);
            throw error;
        }
    }

}

let server = new TestServer();
server.start();
server.emsApp.listen(Constants.PORT_NUMBER, () => {
    server.logger.info(`Server is listing on port ${Constants.PORT_NUMBER}`);
})