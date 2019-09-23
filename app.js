const ethers = require('ethers');
const config = require('./config.json');

// Import the json file from build to get the abi
const erc_json = require('./build/ERC20.json'); //import the json of the contract which you want to interact

// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"
//  - "goerli"
const provider = ethers.getDefaultProvider(config['network']);

// Make a wallet instance using private key and provider
const wallet = new ethers.Wallet(config['private_key'] , provider);

const address = config["ERC20"];
const abi = erc_json.abi;

erc20 = new ethers.Contract( address , abi , wallet );

document.getElementById("send").onsubmit = async function(e) {
    e.preventDefault();
    let address = document.getElementById("address").value;
    document.getElementById("status").innerText = "Waiting for transaction...";
	let tx = await erc20.functions.transfer(address, "1000000000000000000");
    let tx_hash = tx.hash;
	let node = document.createElement("LI");
	let link = document.createElement("A");
	link.target = "_blank";
	link.href = `https://${config["network"]}.etherscan.io/tx/` + tx_hash;
	let textnode = document.createTextNode(tx_hash);
	link.appendChild(textnode);
	node.appendChild(link);
	document.getElementById("transactions").appendChild(node);
    document.getElementById("status").innerText = "Tranasaction confirmed";
    return false;
};