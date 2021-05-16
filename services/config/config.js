require('dotenv').config({ path: '../.env' }) // Fetch vars from ../.env

module.exports = {
    bridgeAddress: "0x0bcc600A785Af561664B522Dcb50188Cc757e819",
    host: "https://kovan.infura.io/v3/7851ca7a578b4e08a349409689b246af",
    fromBlock: 21472092,
    fromXDAGBlock: 21472092,

    networkName: "kovan",
    runEvery: 1, // In minutes,
    confirmations: 0, // Number of blocks before processing it, if working with ganache set as 0
    privateKey: process.env.KOVAN_KEY,
    storagePath: './db'
}