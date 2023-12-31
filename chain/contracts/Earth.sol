// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

// TODO: remove
import "hardhat/console.sol";

contract Earth is ERC20, ERC20Pausable, Ownable, ERC20Permit {
    uint256 public constant MAX_TOKENS = 10000000000000;

    constructor(address initialOwner)
        ERC20("Earth", "EARTH")
        Ownable(initialOwner)
        ERC20Permit("Earth")
    {
        _mint(msg.sender, MAX_TOKENS * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
