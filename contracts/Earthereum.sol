// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "./Verifier.sol";
import "./Land.sol";

// TODO: remove it
import "hardhat/console.sol";

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

    function mint(address, uint256) public {}
}

contract Earthereum is Land {
    using Math for int64;

    error VerificationFailure(address account);
    error NotInitialized();
    error AlreadyInitialized();

    IVerifier private verifier;
    IEarth private earth;
    bool private initialized;

    event LandClaimed(address);

    modifier requireInitialized() {
        if (!initialized) {
            revert NotInitialized();
        }
        _;
    }

    constructor() Land(msg.sender) {}

    function initialize(
        address _verifier,
        address _earthToken
    ) external onlyOwner {
        if (initialized) {
            revert AlreadyInitialized();
        }

        verifier = IVerifier(_verifier);
        earth = IEarth(_earthToken);

        initialized = true;
    }

    function claim(
        uint256 areaInKm2,
        uint[4] calldata zkInput,
        Types.Proof calldata zkProof,
        string calldata uri,
        address claimer
    )
        external
        onlyOwner
        requireInitialized
    {
        if (!verifier.verifyTx(zkProof, zkInput)) {
            revert VerificationFailure(msg.sender);
        }

        uint256 tokens = areaInKm2;

        earth.mint(claimer, tokens);

        safeMint(claimer, uri);

        emit LandClaimed(claimer);
    }

    function putForSale(uint256 tokenId) external {}

    function putForRent(uint256 tokenId) external {}

    function buy(uint256 tokenId) external {}

    function rent(uint256 tokenId) external {}
}
