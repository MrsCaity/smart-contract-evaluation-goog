const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SepoliaUploadNFT", function () {
  let nft;
  let owner;
  let other;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("SepoliaUploadNFT");
    nft = await Contract.deploy("Test NFT", "TNFT", owner.address);
  });

  it("sets the collection name and symbol", async function () {
    expect(await nft.name()).to.equal("Test NFT");
    expect(await nft.symbol()).to.equal("TNFT");
  });

  it("mints the uploaded NFT to the owner", async function () {
    const uri = "ipfs://example-owner";
    await nft.mintUploadedNFT(uri);

    expect(await nft.ownerOf(0)).to.equal(owner.address);
    expect(await nft.tokenURI(0)).to.equal(uri);
  });

  it("mints to a specific recipient", async function () {
    const uri = "ipfs://example-recipient";
    await nft.mintTo(other.address, uri);

    expect(await nft.ownerOf(0)).to.equal(other.address);
    expect(await nft.tokenURI(0)).to.equal(uri);
  });

  it("lets the owner update token metadata", async function () {
    await nft.mintUploadedNFT("ipfs://before");
    await nft.setTokenURI(0, "ipfs://after");

    expect(await nft.tokenURI(0)).to.equal("ipfs://after");
  });

  it("rejects minting from a non-owner", async function () {
    await expect(nft.connect(other).mintUploadedNFT("ipfs://x")).to.be.revertedWithCustomError(
      nft,
      "OwnableUnauthorizedAccount"
    );
  });
}
