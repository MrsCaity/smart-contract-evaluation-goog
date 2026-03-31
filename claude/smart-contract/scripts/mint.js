const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Set NFT_CONTRACT_ADDRESS env var to the deployed contract address");
  }

  const tokenURI = process.env.TOKEN_URI;
  if (!tokenURI) {
    throw new Error("Set TOKEN_URI env var to the metadata URI (e.g. ipfs://Qm...)");
  }

  const [signer] = await hre.ethers.getSigners();
  const recipient = process.env.MINT_TO || signer.address;

  const nft = await hre.ethers.getContractAt("MyNFT", contractAddress);

  console.log(`Minting NFT to ${recipient} with URI: ${tokenURI}`);
  const tx = await nft.safeMint(recipient, tokenURI);
  const receipt = await tx.wait();

  console.log(`Minted! TX hash: ${receipt.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
