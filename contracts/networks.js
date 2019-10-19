const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
let secrets;
if (fs.existsSync('secrets.json')) {
 secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
}

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
      ropsten: {
          provider: () => new HDWalletProvider(secrets.mnemonic, 'https://ropsten.infura.io/v3/' + secrets.infuraProjectId),
          network_id: 3,       // Ropsten's id
          gas: 5500000,        // Ropsten has a lower block limit than mainnet
          confirmations: 2,    // # of confs to wait between deployments. (default: 0)
          timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
          skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },
  },
};
