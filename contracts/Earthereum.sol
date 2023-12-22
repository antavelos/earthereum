// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "./Verifier.sol";
import "./Land.sol";

library Types {
    using Pairing for *;

    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }
}

contract IVerifier {
    function verifyTx(
        Types.Proof memory,
        uint[4] memory
    ) public view returns (bool) {}
}

contract IEarth {
    function totalSupply() public view virtual returns (uint256) {}

    function balanceOf(address) public view virtual returns (uint256) {}

    function transfer(address, uint256) public virtual returns (bool) {}
}

contract Earthereum is Land {
    using Math for int64;

    IVerifier private verifier;
    IEarth private earth;
    bool private initialized;

    modifier isInitialized() {
        require(initialized, "not initialized");
        _;
    }

    constructor() Land(msg.sender) {}

    function initialize(
        address _verifier,
        address _earthToken
    ) external onlyOwner {
        require(!initialized, "already initialized");

        verifier = IVerifier(_verifier);
        earth = IEarth(_earthToken);

        initialized = true;
    }

    function claim(
        uint256 area,
        uint[4] calldata zkInput,
        Types.Proof calldata zkProof,
        string calldata uri
    ) external isInitialized {
        require(verifier.verifyTx(zkProof, zkInput), "verification failed");

        uint256 tokens = area;

        earth.transfer(msg.sender, tokens);
        safeMint(msg.sender, uri);
    }

    function putForSale(uint256 tokenId) external {}

    function putForRent(uint256 tokenId) external {}

    function buy(uint256 tokenId) external {}

    function rent(uint256 tokenId) external {}
}
