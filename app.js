const ethers = require('ethers');
const config = require('./config.json');

// Import the json file from build to get the abi
const erc_json = require('./build/ERC20.json');

// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"
//  - "goerli"
const provider = ethers.getDefaultProvider(config['network']);

// Make a wallet instance using private key and provider
const wallet = new ethers.Wallet(config['private_key'] , provider);

const address = config["ERC20"] 
const abi = erc_json.abi

const erc20 = new ethers.Contract( address , abi , wallet );

(async() => {
	console.log(String(await erc20.functions.balanceOf(wallet.address)))
})();
