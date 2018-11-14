
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const loggerHelper = require('./loggerHelper');
const employeeController = require('./controller/employee');
const organisationController = require('./controller/organisation');
const userController = require('./controller/user');

class ApplicationServer {
    constructor() {
        this.emsApp = express();
    }

    async start() {
        await this.init();
        console.log(`Server started..`)
    }

    async init() {
        this.setupMiddlewares();
        this.registerControllers();
        this.initializeLogger();
        this.connectToDB();
    }

    //setup all required middlewares
    setupMiddlewares() {
        this.emsApp.use(bodyParser.urlencoded({ extended: true }))
        this.emsApp.use(bodyParser.json());
        this.emsApp.use(cors({
            origin: (origin, callback) => {
                this.logger.debug(`Request origin: ${origin}`);
                if (!origin || config.get('ALLOWED_REQUEST_ORIGINS').indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Accessing this resource is not allowed due to CORS!!'));
                }
            }
        }))
    }

    //Register controllers
    registerControllers() {
        this.emsApp.use(config.get('EMPLOYEE_CONTROLLER_BASEPATH'), employeeController);
        this.emsApp.use(config.get('ORGANISATION_CONTROLLER_BASEPATH'), organisationController);
        this.emsApp.use(config.get('USER_CONTROLLER_BASEPATH'), userController);
    }

    //Initialize logger
    async initializeLogger() {
        try {
            const loggerHelperInstance = new loggerHelper();
            loggerHelperInstance.init();
            this.logger = global['logger'];
        }
        catch (error) {
            console.log(`Error occured while configuring logger.\n Error details ${error}`);
            throw error;
        }
    }

    //database connection
    async connectToDB() {
        try {
            const result = await mongoose.connect(config.get('DB_CONFIG'), { useNewUrlParser: true });
            result.connection.on('connected', () => {
                this.logger.info('Database connection established..');
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

const server = new ApplicationServer();
server.start();