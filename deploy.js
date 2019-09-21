const startTimestamp = Date.now();
const ethers = require('ethers');
const provider = ethers.getDefaultProvider('kovan');

//24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA

console.log('\nPlease wait loading wallet...');
const wallet = new ethers.Wallet("24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA", provider);
console.log(`Loaded wallet @ ${wallet.address}`);

const LBjson = require('./build/ERC20.json');
let lbInstance;

(async() => {
  console.log('\nDeploying Lend and Borrow Contract...');
  const LBContract = new ethers.ContractFactory(
    LBjson.abi,
    LBjson.evm.bytecode.object,
    wallet
  );
  lbInstance =  await LBContract.deploy();
  console.log(`deployed at ${lbInstance.address}`)
})();
