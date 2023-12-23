import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumberish, ZeroAddress } from "ethers";
import { Types } from "../typechain-types/contracts/Earthereum.sol/Earthereum";

describe("Earthereum", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {

    const [owner, ...restAccounts] = await ethers.getSigners();
    const verifier = await ethers.deployContract('Verifier');
    await verifier.waitForDeployment();

    const earthereum = await ethers.deployContract('Earthereum');
    await earthereum.waitForDeployment();

    const earth = await ethers.deployContract('Earth', [earthereum.getAddress()]);
    await earth.waitForDeployment();

    return { earthereum, earth, verifier, owner, restAccounts };
  }

  async function deployWithInit() {
    const { earthereum, earth, verifier, owner, restAccounts } = await deploy();

    await earthereum.initialize(verifier.getAddress(), earth.getAddress());

    return { earthereum, earth, verifier, owner, restAccounts };
  }

  type ProofData = {
    proof: Types.ProofStruct
    inputs: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
  }

  type ClaimData = {
    areaInKm2: BigNumberish;
    proofData: ProofData;
    invalidProofData: ProofData;
    uri: string;
  };

  async function claimData(): Promise<ClaimData> {
    const proofData: ProofData = {
      proof: {
        a: {
          X: "0x1c75590a87a2caa5787ec13e37ebb12d05f8007ca894a91d837d91a9e7d512bf",
          Y: "0x2ea043fa1e4dfb370b7aa57aeb21b96262b03825bfca2e35e66f72d933fbc495"
        },
        b: {
          X: [
            "0x0a7ec7a1cc20f2ed80ab49314f2b43cf89064d5b77f9ad71cf89f55429b4f5fd",
            "0x2d6c7c60b96c775e7b7b9c043d6962b01db9908953f259461be71856e3abd7b4"
          ],
          Y: [
            "0x052c7e31b57445948f85985069edadbeb4f04cf65b96025700c2277da7790079",
            "0x24af8097544baeb07d1d3e68029412472aeabc58f3533b798390222965dad04e"
          ]
        },
        c: {
          X: "0x0078ad73f663ca7b591cc2d80751bd277d16e16598e96c0b011422e469af1bc9",
          Y: "0x1354a3471827fb41b0a0dd8b83ad166d5a4ab39704e01b65b13cbdaf4a3288bc"
        }
      },
      inputs: [
        "0x0000000000000000000000000000000095302392855beca0f40fe0d84f23bc21",
        "0x0000000000000000000000000000000007377fa59ea4c0a33f5fe8381a761bc5",
        "0x00000000000000000000000000000000ee4f02d978f1efa98507527aefa3f410",
        "0x000000000000000000000000000000005ccb6e5899594b2fbffb6bcb8640b8dd"
      ]
    };

    let invalidProofData = JSON.parse(JSON.stringify(proofData));;
    // invalidate it
    invalidProofData.inputs[0] = invalidProofData.inputs[1];

    const areaInKm2 = "16934942";
    const uri = "uri";

    return { areaInKm2, proofData, invalidProofData, uri };
  }

  describe("Deployment", function () {
    it("Should fail to be initialized by non-owner", async () => {
      const { earthereum, earth, verifier, restAccounts } = await loadFixture(deploy);

      const notOwner = restAccounts[0];

      await expect(earthereum.connect(notOwner).initialize(verifier.getAddress(), earth.getAddress())).to.be.revertedWithCustomError(
        earthereum,
        "OwnableUnauthorizedAccount"
      );
    });

    it("Should fail to be re-initialized", async () => {
      const { earthereum, earth, verifier } = await loadFixture(deployWithInit);

      await expect(earthereum.initialize(verifier.getAddress(), earth.getAddress())).to.be.revertedWithCustomError(
        earthereum,
        "AlreadyInitialized"
      );
    });
  });

  describe("Claims", function () {
    it("Should fail to claim land when called by non owner", async () => {
      const { earthereum, restAccounts } = await loadFixture(deployWithInit);
      const { areaInKm2, proofData, uri } = await loadFixture(claimData);
      const claimer = restAccounts[0];

      await expect(earthereum.connect(claimer).claim(areaInKm2, proofData.inputs, proofData.proof, uri, claimer)).to.be.revertedWithCustomError(
        earthereum,
        "OwnableUnauthorizedAccount"
      );
    });

    it("Should fail to claim land when contract is not initialized", async () => {
      const { earthereum, restAccounts } = await loadFixture(deploy);
      const { areaInKm2, proofData, uri } = await loadFixture(claimData);
      const claimer = restAccounts[0];

      await expect(earthereum.claim(areaInKm2, proofData.inputs, proofData.proof, uri, claimer)).to.be.revertedWithCustomError(
        earthereum,
        "NotInitialized"
      );
    });

    it("Should fail to claim land when proof is not verified", async () => {
      const { earthereum, restAccounts } = await loadFixture(deployWithInit);
      const { areaInKm2, invalidProofData, uri } = await loadFixture(claimData);
      const claimer = restAccounts[0];

      expect(await earthereum.claim(areaInKm2, invalidProofData.inputs, invalidProofData.proof, uri, claimer)).to.be.revertedWithCustomError(
        earthereum,
        "VerificationFailure"
      );
    });

    it("Should mint one LAND and mint <areaInKm2> EARTH tokens successful verification", async () => {
      const { earthereum, restAccounts, earth, verifier } = await loadFixture(deploy);
      const { areaInKm2, proofData, uri } = await loadFixture(claimData);
      const claimer = restAccounts[0];
      const expectedTotalSupply = 1;
      const firstNftId = 0;

      await earthereum.initialize(verifier.getAddress(), earth.getAddress());
      await earthereum.claim(areaInKm2, proofData.inputs, proofData.proof, uri, claimer);
      expect(await earthereum.totalSupply()).to.equal(
        expectedTotalSupply
      );

      expect(await earthereum.ownerOf(firstNftId)).to.equal(
        claimer.address
      );

      expect(await earth.balanceOf(claimer.address)).to.equal(
        areaInKm2
      );
    });

    describe("Events", function () {
      it("Should emit events upon land claiming", async () => {
        const { earthereum, earth, restAccounts } = await loadFixture(deployWithInit);
        const { areaInKm2, proofData, uri } = await loadFixture(claimData);
        const claimer = restAccounts[0];

        expect(await earthereum.claim(areaInKm2, proofData.inputs, proofData.proof, uri, claimer))
          .to.emit(earth, "Transfer").withArgs(ZeroAddress, claimer.address, areaInKm2)
          .to.emit(earthereum, "Transfer").withArgs(ZeroAddress, claimer.address, 0)
          .to.emit(earthereum, "LandClaimed").withArgs(claimer.address)
      });
    });

    describe("Transfers", function () {
    });
  });
});
