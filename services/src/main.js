const log4js = require('log4js');

// Configurations
const config = require('../config/config.js');
const logConfig = require('../config/log-config.json');
log4js.configure(logConfig);

const Scheduler = require('./Scheduler');

// Accountants
const XDAGAccountant = require('./XDAGAccountant');
const EthAccountant = require('./EthAccountant');

const logger = log4js.getLogger('Main');

const ethAccountant = new EthAccountant(config, log4js.getLogger('ETH-ACCOUNTANT'));
const xdagAccountant = new XDAGAccountant({
    ...config,
    storagePath: `${config.storagePath}/xdag-fed`
}, log4js.getLogger('XDAG-ACCOUNTANT'));

let pollingInterval = config.runEvery * 1000 * 5; // Minutes
let scheduler = new Scheduler(pollingInterval, logger, { run: () => run() });

scheduler.start().catch((err) => {
    logger.error('Unhandled Error on start()', err);
});

async function run() {
    try {
        await ethAccountant.run();
        await xdagAccountant.run();
    } catch(err) {
        logger.error('Unhandled Error on run()', err);
        process.exit();
    }
}

async function exitHandler() {
    process.exit();
}

// catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

// export so we can test it
module.exports = { scheduler };
