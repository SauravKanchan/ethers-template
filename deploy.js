const startTimestamp = Date.now();
const ethers = require('ethers');
const provider = ethers.getDefaultProvider('kovan');

console.log('\nPlease wait loading wallet...');
const wallet = new ethers.Wallet(process.argv[3], provider);
console.log(`Loaded wallet ${wallet.address}`);

let compiled = require(`./build/${process.argv[2]}.json`);

(async() => {
  console.log(`\nDeploying ${process.argv[2]}...`);
  let contract = new ethers.ContractFactory(
    compiled.abi,
    compiled.evm.bytecode.object,
    wallet
  );

  let instance =  await contract.deploy();
  console.log(`deployed at ${instance.address}`)

})();
