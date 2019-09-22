const ethers = require('ethers');

// Import the json file from build to get the abi
const erc_json = require('./build/ERC20.json');

// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"
//  - "goerli"
const provider = ethers.getDefaultProvider('kovan');

// Make a wallet instance using private key and provider
const wallet = new ethers.Wallet("24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA", provider);

const address = "0x685c96893211bdAE3f73D41af778A818D1b26875"
const abi = erc_json.abi

const erc20 = new ethers.Contract( address , abi , wallet );

(async() => {
	console.log(String(await erc20.functions.balanceOf(wallet.address)))
})();
