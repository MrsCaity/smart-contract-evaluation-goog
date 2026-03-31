const hre = require("hardhat");

async function main() {
  const name = process.env.NFT_NAME || "MyNFT";
  const symbol = process.env.NFT_SYMBOL || "MNFT";

  console.log(`Deploying MyNFT ("${name}", "${symbol}") to ${hre.network.name}...`);

  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const nft = await MyNFT.deploy(name, symbol);
  await nft.waitForDeployment();

  const address = await nft.getAddress();
  console.log(`MyNFT deployed to: ${address}`);
  console.log(`Verify on Etherscan:`);
  console.log(`  npx hardhat verify --network sepolia ${address} "${name}" "${symbol}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
