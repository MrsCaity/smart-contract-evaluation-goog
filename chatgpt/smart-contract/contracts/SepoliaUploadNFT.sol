// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SepoliaUploadNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(string memory collectionName, string memory collectionSymbol, address initialOwner)
        ERC721(collectionName, collectionSymbol)
        Ownable(initialOwner)
    {}

    function mintUploadedNFT(string memory metadataURI) external onlyOwner returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        _safeMint(owner(), tokenId);
        _setTokenURI(tokenId, metadataURI);
    }

    function mintTo(address to, string memory metadataURI) external onlyOwner returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }

    function setTokenURI(uint256 tokenId, string memory metadataURI) external onlyOwner {
        _setTokenURI(tokenId, metadataURI);
    }
}
