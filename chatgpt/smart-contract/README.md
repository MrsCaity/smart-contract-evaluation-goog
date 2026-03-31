# ChatGPT NFT Smart Contract (Sepolia)

This Hardhat project deploys an ERC-721 NFT contract to Sepolia and lets you mint NFTs from metadata you upload, usually through an IPFS URI.

## Files

- `contracts/SepoliaUploadNFT.sol`: the NFT contract
- `scripts/deploy.js`: deploys the contract to Sepolia
- `scripts/mint.js`: mints your uploaded NFT using a metadata URI
- `test/SepoliaUploadNFT.test.js`: basic contract tests

## Setup

```bash
npm install
cp .env.example .env
```

Fill in your `.env` values for Sepolia RPC, wallet key, and owner address.

## Compile and test

```bash
npm run compile
npm test
```

## Deploy to Sepolia

```bash
npm run deploy:sepolia
```

## Upload your NFT

1. Upload your image to IPFS using Pinata, NFT.Storage, or a similar service.
2. Create metadata JSON like this:

```json
{
  "name": "My Uploaded NFT",
  "description": "NFT minted on Sepolia",
  "image": "ipfs://YOUR_IMAGE_CID"
}
```

3. Upload that metadata JSON to IPFS.
4. Put the metadata URI into `TOKEN_URI`.

## Mint

Mint to the contract owner:

```bash
npm run mint:sepolia
```

Mint to another wallet:

```bash
MINT_TO=0xRecipientAddress npm run mint:sepolia
```
