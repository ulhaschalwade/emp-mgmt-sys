const winston = require('winston');
const rotateFile = require('winston-daily-rotate-file');
const config = require('config')
const path = require('path');
const mkdirp = require('mkdirp');
const moment = require('moment');

class LoggerHelper {
    init() {
        this.setupWinstonBasics();
        this.ensureDirectory();
        let logger = this.setupWinstonTransports();
        logger.info(`Winstom logger initialised with log level for console : '${config.get("CONSOLE_LOG_LEVEL")}' and logfile level : '${config.get("LOG_LEVEL")}'`);
        this.setupGlobalLogger(logger);
    }

    setupWinstonBasics() {
        winston.addColors({
            debug: 'blue',
            info: 'cyan',
            warn: 'yellow',
            error: 'red'
        });
    }

    setupWinstonTransports() {
        return winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: config.get("CONSOLE_LOG_LEVEL"),
                    prettyPrint: true,
                    colorise: true,
                    silent: false,
                    timestamp: () => moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                    json: false
                }),
                new rotateFile({
                    level: config.get("LOG_LEVEL"),
                    prettyPrint: true,
                    silent: false,
                    colorize: true,
                    filename: path.join(__dirname, "./logs", config.get("LOG_FILENAME")),
                    timestamp: () => moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                    json: false,
                    maxFiles: 10,
                    datePattern: 'YYYY-MM-DD'
                })
            ],
            exitOnError: false
        });
    }

    ensureDirectory() {
        path.join(__dirname, './logs');
    }

    setupGlobalLogger(logger) {
        global['logger'] = logger;
        global['logger'].info("Logger is available at global['logger']");
    }

}

module.exports = LoggerHelper;
