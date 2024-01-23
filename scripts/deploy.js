const hre = require("hardhat");

async function main() {
  const deploy = await hre.ethers.deployContract("Escrow");

  await deploy.waitForDeployment();

  console.log(`The contract is deployed to ${deploy.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
