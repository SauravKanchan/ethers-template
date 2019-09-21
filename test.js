const fs = require('fs-extra');
const path = require('path');
const sourceFolderPath =  path.resolve(__dirname, 'build');
const buildFolderPath = "./build/"
const ethers = require('ethers');
const provider = ethers.getDefaultProvider('kovan');


//24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA
console.log('\nPlease wait loading wallet...');
const wallet = new ethers.Wallet("24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA", provider);
console.log(`Loaded wallet @ ${wallet.address}`);

let LBjson, lbInstance, LBContract;

(async() => {
  for (const contractFileName of fs.readdirSync(sourceFolderPath)) {
    LBjson = require(buildFolderPath + contractFileName);
    console.log(LBjson)
    console.log(`\nDeploying ${contractFileName}`);
    LBContract = new ethers.ContractFactory(
      LBjson.abi,
      LBjson.evm
      wallet
    );
    lbInstance =  await LBContract.deploy();
    console.log(`${contractFileName} deployed at ${lbInstance.address}`)
  }
})();
