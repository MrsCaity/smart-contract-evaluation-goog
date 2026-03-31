const hre = require("hardhat");

async function main() {
  const collectionName = process.env.NFT_NAME || "My Sepolia NFT";
  const collectionSymbol = process.env.NFT_SYMBOL || "MSNFT";
  const initialOwner = process.env.INITIAL_OWNER;

  if (!initialOwner) {
    throw new Error("Set INITIAL_OWNER to the wallet that should own the contract");
  }

  console.log(
    `Deploying SepoliaUploadNFT ("${collectionName}", "${collectionSymbol}") to ${hre.network.name}...`
  );

  const Contract = await hre.ethers.getContractFactory("SepoliaUploadNFT");
  const nft = await Contract.deploy(collectionName, collectionSymbol, initialOwner);
  await nft.waitForDeployment();

  const address = await nft.getAddress();
  console.log(`SepoliaUploadNFT deployed to: ${address}`);
  console.log("Verify on Etherscan:");
  console.log(
    `  npx hardhat verify --network sepolia ${address} "${collectionName}" "${collectionSymbol}" "${initialOwner}"`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
