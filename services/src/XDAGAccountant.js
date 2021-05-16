/**
 * 
 * XDAGAccountatnt
 * Listing the cross transfer on XDAG network, and mint eXDAG on Ethereum network.
 * 
 */

const web3 = require('web3');
const fs = require('fs');
const abiBridge = require('../abis/Bridge.json');
const EthTxSender = require('./EthTxSender');
const CustomError = require('./CustomError');
const utils = require('./utils');

module.exports = class Accountant {
    constructor(config, logger, Web3 = web3) {
        this.config = config;
        this.logger = logger;

        this.web3 = new Web3(config.host);

        this.mainBridgeContract = new this.web3.eth.Contract(abiBridge, this.config.bridgeAddress);
        this.transactionSender = new EthTxSender(this.web3, this.logger, this.config);

        this.lastBlockPath = `${config.storagePath || __dirname}/lastBlock.txt`;
    }

    async _fetchEvents() {
        
        return true;
    }

    async _parseEvent(evt) {
        this.logger.info('Processing event log:', evt);

        if (evt.event != 'Cross') {
            this.logger.warn('Invalid event type!');
            return null;
        }

        let result = {
            receiver: evt.receiver,
            amount: evt.amount,

            blockHash: evt.blockHash,
            transactionHash: evt.transactionHash,
            logIndex: evt.logIndex,
        };

        return result;
    }

    async run() {
        let retries = 3;
        const sleepAfterRetrie = 3000;
        while (retries > 0) {
            try {
                let ret = await this._fetchEvents(); // Get events from main chain.
                return ret;
            } catch (err) {
                console.log(err)
                this.logger.error(new Error('Exception Running Federator'), err);
                retries--;
                this.logger.debug(`Run ${3 - retries} retrie`);
                if (retries > 0) {
                    await utils.sleep(sleepAfterRetrie);
                } else {
                    process.exit();
                }
            }
        }
    }

    async _processEvents(events, toBlock) { // Process main chain events
        try {
            for (let evt of events) {

                if (evt.event != 'Cross') {
                    continue;
                }

                this.logger.info('Processing event:', evt);

                let result = await this._parseEvent(evt);
                this.logger.info('Got params: ', result);

                await this.bridge.acceptTransfer(result.receiver, result.amount, result.blockHash, result.blockHash, result.logIndex);
            }

            // save progress for next query
            this._saveProgress(this.lastBlockPath, toBlock);

            return true;
        } catch (err) {
            throw new CustomError(`Exception processing events`, err);
        }
    }

    _saveProgress(path, value) {
        if (value) {
            fs.writeFileSync(path, value);
        }
    }
}
