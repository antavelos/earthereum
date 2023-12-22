import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Earthereum", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAll() {

    const [owner] = await ethers.getSigners();
    const verifier = await ethers.deployContract('Verifier');
    await verifier.waitForDeployment();

    const earth = await ethers.deployContract('Earth', [owner.address]);
    await earth.waitForDeployment();

    const earthereum = await ethers.deployContract('Earthereum');
    await earthereum.waitForDeployment();

    earthereum.initialize(verifier.getAddress(), earth.getAddress());

    return { earthereum, earth, verifier };
  }

  describe("Deployment", function () {
    it("Should fail to be re-initialized", async function () {
      const { earthereum, earth, verifier } = await loadFixture(deployAll);

      await expect(earthereum.initialize(verifier.getAddress(), earth.getAddress())).to.be.revertedWith(
        "already initialized"
      );
    });
    it("Should fail to be initialize by non-owner", async function () {
      const { earthereum, earth, verifier } = await loadFixture(deployAll);
      const [_, second] = await ethers.getSigners();

      await expect(earthereum.connect(second).initialize(verifier.getAddress(), earth.getAddress())).to.be.revertedWithCustomError(
        earthereum,
        "OwnableUnauthorizedAccount"
      );
    });

  });

  describe("Claims", function () {

    describe("Events", function () {
    });

    describe("Transfers", function () {
    });
  });
});
