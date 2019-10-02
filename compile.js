const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const sourceFolderPath = path.resolve(__dirname, "contracts");
const buildFolderPath = path.resolve(__dirname, "build");

const getContractSource = contractFileName => {
    const contractPath = path.resolve(__dirname, "contracts", contractFileName);
    return fs.readFileSync(contractPath, "utf8");
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
    language: "Solidity",
    sources,
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
};

console.info("\nCompiling contracts...");
const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.info("Done");

let shouldBuild = true;

if (output.errors) {
    console.error(output.errors);
    // throw "\nError in compilation please check the contract\n";
    for (error of output.errors) {
        if (error.severity === "error") {
            shouldBuild = false;
            throw "Error found";
        }
    }
}

if (shouldBuild) {
    console.log("\nBuilding please wait...");

    fs.removeSync(buildFolderPath);
    fs.ensureDirSync(buildFolderPath);

    for (let contractFile in output.contracts) {
        if ({}.hasOwnProperty.call(output.contracts, contractFile)) {
            let OutputFile = output.contracts[contractFile];
            for (let key in OutputFile) {
                if ({}.hasOwnProperty.call(OutputFile, key)) {
                    fs.outputJsonSync(
                        path.resolve(buildFolderPath, `${key}.json`),
                        {
                            abi: OutputFile[key].abi,
                            bytecode: OutputFile[key].evm.bytecode.object
                        },
                        {
                            spaces: 2,
                            EOL: "\n"
                        }
                    );
                }
            }
        }
    }
    console.info("Build finished successfully!\n");
} else {
    console.error("\nBuild failed\n");
}