const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Set NFT_CONTRACT_ADDRESS to the deployed contract address");
  }

  const tokenURI = process.env.TOKEN_URI;
  if (!tokenURI) {
    throw new Error("Set TOKEN_URI to the metadata URI, for example ipfs://...");
  }

  const mintTo = process.env.MINT_TO;
  const nft = await hre.ethers.getContractAt("SepoliaUploadNFT", contractAddress);

  console.log(
    mintTo
      ? `Minting NFT to ${mintTo} with URI: ${tokenURI}`
      : `Minting NFT to contract owner with URI: ${tokenURI}`
  );

  const tx = mintTo ? await nft.mintTo(mintTo, tokenURI) : await nft.mintUploadedNFT(tokenURI);
  const receipt = await tx.wait();

  console.log(`Minted. TX hash: ${receipt.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
