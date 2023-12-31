import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const verifier = await ethers.deployContract('Verifier');
  await verifier.waitForDeployment();

  const earthereum = await ethers.deployContract('Earthereum');
  await earthereum.waitForDeployment();

  const earth = await ethers.deployContract('Earth', [earthereum.getAddress()]);
  await earth.waitForDeployment();


  await earthereum.initialize(verifier.getAddress(), earth.getAddress());
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
