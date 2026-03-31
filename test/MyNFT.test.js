const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  let nft, owner, other;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    nft = await MyNFT.deploy("TestNFT", "TNFT");
  });

  it("should set the correct name and symbol", async function () {
    expect(await nft.name()).to.equal("TestNFT");
    expect(await nft.symbol()).to.equal("TNFT");
  });

  it("should mint an NFT with the correct URI", async function () {
    const uri = "ipfs://QmTest123";
    await nft.safeMint(owner.address, uri);
    expect(await nft.tokenURI(0)).to.equal(uri);
    expect(await nft.ownerOf(0)).to.equal(owner.address);
  });

  it("should increment token IDs", async function () {
    await nft.safeMint(owner.address, "ipfs://a");
    await nft.safeMint(other.address, "ipfs://b");
    expect(await nft.ownerOf(0)).to.equal(owner.address);
    expect(await nft.ownerOf(1)).to.equal(other.address);
  });

  it("should reject minting from non-owner", async function () {
    await expect(
      nft.connect(other).safeMint(other.address, "ipfs://x")
    ).to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount");
  });
});
