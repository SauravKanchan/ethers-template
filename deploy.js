const startTimestamp = Date.now();
const ethers = require('ethers');
const config = require('./config.json');
const fs = require('fs-extra');

const provider = ethers.getDefaultProvider(config["network"]);

const wallet = new ethers.Wallet(config["private_key"], provider);
console.log(`Loaded wallet ${wallet.address}`);

let compiled = require(`./build/${process.argv[2]}.json`);

(async() => {
  console.log(`\nDeploying ${process.argv[2]} in ${config["network"]}...`);
  let contract = new ethers.ContractFactory(
    compiled.abi,
    compiled.bytecode,
    wallet
  );

  let instance =  await contract.deploy();
  console.log(`deployed at ${instance.address}`)
  config[`${process.argv[2]}`] = instance.address
  console.log("Waiting for deployment transaction to get confirmed")
  await instance.deployed()
  console.log("Deployment transaction confirmed")
  fs.outputJsonSync(
    'config.json',
    config
  );

})();
