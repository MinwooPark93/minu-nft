const hre = require("hardhat");

async function main() {
  const MinuNFT = await hre.ethers.getContractFactory("MinuNFT");

  const minuNFT = await MinuNFT.deploy();

  await minuNFT.waitForDeployment();

  console.log(`MinuNFT deployed to ${minuNFT.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
