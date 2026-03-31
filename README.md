# NFT Smart Contract (Sepolia)

ERC-721 NFT contract built with Hardhat and OpenZeppelin. Deploy to Sepolia, then mint NFTs by providing a metadata URI (e.g. an IPFS link to your uploaded image/metadata).

## Setup

```bash
npm install
cp .env.example .env   # fill in your keys
```

## Compile & Test

```bash
npm run compile
npm test
```

## Deploy to Sepolia

```bash
npm run deploy:sepolia
```

## Upload your NFT image & metadata

1. Upload your image to [Pinata](https://www.pinata.cloud/) or [NFT.Storage](https://nft.storage/) to get an IPFS CID.
2. Create a JSON metadata file:
   ```json
   {
     "name": "My NFT",
     "description": "My first NFT on Sepolia",
     "image": "ipfs://QmYourImageCID"
   }
   ```
3. Upload the JSON file to IPFS as well.

## Mint

```bash
NFT_CONTRACT_ADDRESS=0x... TOKEN_URI=ipfs://QmYourMetadataCID npm run mint:sepolia
```
