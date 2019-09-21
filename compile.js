const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const sourceFolderPath = path.resolve(__dirname, 'contracts');
const buildFolderPath = path.resolve(__dirname, 'build');

const getContractSource = contractFileName => {
  const contractPath = path.resolve(__dirname, 'contracts', contractFileName);
  const source = fs.readFileSync(contractPath, 'utf8');
  return source;
};

let sources = {};

fs.readdirSync(sourceFolderPath).forEach(contractFileName => {
  sources = {
    ...sources,
    [contractFileName]: {
      content: getContractSource(contractFileName)
    }
  }
});

const input = {
    language: 'Solidity',
    sources,
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

console.log('\nCompiling contracts...');
const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log('Done');

let shouldBuild = true;

if (output.errors) {
  console.error(output.errors);
  // throw '\nError in compilation please check the contract\n';
  for(error of output.errors) {
    if(error.severity === 'error') {
      shouldBuild = false;
      throw 'Error found';
      break;
    }
  }
}

if(shouldBuild) {
  console.log('\nBuilding please wait...');

  fs.removeSync(buildFolderPath);
  fs.ensureDirSync(buildFolderPath);

  for (let contractFile in output.contracts) {
    for(let key in output.contracts[contractFile]) {
      fs.outputJsonSync(
        path.resolve(buildFolderPath, `${key}.json`),
        output.contracts[contractFile][key]["abi"]
      );
    }
  }
  console.log('Build finished successfully!\n');
} else {
  console.log('\nBuild failed\n');
}

