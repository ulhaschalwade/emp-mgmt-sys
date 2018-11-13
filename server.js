
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const loggerHelper = require('./loggerHelper');

const jsonWebToken = require('jsonwebtoken');

//routes
const employeeRoutes = require('./routes/employee/employee.js');
const organisationRoutes = require('./routes/organisation/organisation.js');
const userRoutes = require('./routes/user/user.js');


class ApplicationServer {
    constructor() {
        this.emsApp = express();
    }

    async start() {
        await this.init();
        this.emsApp.emit('expressServerStarted', "Express server started..");
        console.log(`Server started..`)
    }

    async init() {
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
                this.logger.debug(`Request origin: ${origin}`);
                if (!origin || config.get("ALLOWED_REQUEST_ORIGINS").indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Accessing this resource is not allowed due to CORS!!'));
                }
            }
        }))

    }

    setupRoutes() {
        //Register plugins/routes
        this.emsApp.use('/api/employee', employeeRoutes);
        this.emsApp.use('/api/organisation', organisationRoutes);
        this.emsApp.use('/api/user', userRoutes);
        this.emsApp.use(express.static('static'));
    }

    async initializeLogger() {
        try {
            let loggerHelperInstance = new loggerHelper();
            loggerHelperInstance.init();
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
            let result = await mongoose.connect(config.get("DB_CONFIG"), { useNewUrlParser: true });
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

    async shutdownServer() {
        try {
            await mongoose.connection.dropDatabase();
            process.exit();
        }
        catch (error) {
            this.logger.error(`Error occured while shuting down the server.\n Error details ${error}`);
            throw error;
        }
    }

}

let server = new ApplicationServer();
server.start();
server.emsApp.listen(config.get("PORT_NUMBER"), () => {
    server.logger.info(`Server is listing on port ${config.get("PORT_NUMBER")}`);
})
module.exports = server;