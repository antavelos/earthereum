
import { sha256 } from "ethers";
import { readFileSync, writeFileSync } from "fs";
import type { ZoKratesProvider, CompilationArtifacts, SetupKeypair, Proof } from "zokrates-js";

class Zokrates {
  private artifacts: CompilationArtifacts;
  private keypair: SetupKeypair;

  constructor(public provider: ZoKratesProvider, public source: string) {
    this.artifacts = provider.compile(source);

    // run setup
    this.keypair = provider.setup(this.artifacts.program);
  }

  generateProof(input: Array<Array<string>>): Proof {
    const { witness, output } = this.provider.computeWitness(this.artifacts, input);

    // generate proof
    return this.provider.generateProof(
      this.artifacts.program,
      witness,
      this.keypair.pk
    );
  }

  verifyProof(proof: Proof) {
    return this.provider.verify(this.keypair.vk, proof);
  }

  exportSol() {
    return this.provider.exportSolidityVerifier(this.keypair.vk);
  }
}

const toBuffer = (s: string): Buffer => {
  const bytes = s.split('')
   .map((el, ix, arr) => ix % 2 ? null : el + arr[ix + 1])
   .filter(el => el !== null)
   .map(x => parseInt(x!, 16));

   return Buffer.from(bytes);
}

const trimHex = (s: string): string => {
  return s.startsWith("0x") ? s.slice(2) : s;
}

const splitHex = (s: string): Array<string> => {
  s = trimHex(s);
  let s0 = s.slice(0, s.length/2);
  let s1 = s.slice(s.length/2);

  return [`0x${s0.padStart(64, "0")}`, `0x${s1.padStart(64, "0")}`];
}

const getHash = (secret: string, coordinatesHash: string): string => {
  const bs = toBuffer(trimHex(secret));
  const bc = toBuffer(trimHex(coordinatesHash));

  const full = Buffer.concat([bs, bc]);
  return sha256(full);
}

const splitHexStrToBigIntStr = (hexStr: string): string[] => {
  return splitHex(hexStr).map(BigInt).map(bi => bi.toString());
}

type Secret = {
  secret: string;
  coordinatesHash: string;
  proof?: Proof
};

(async () => {
  const { initialize } = await import("zokrates-js");

  const zkSource = process.argv[2];
  const secrets = process.argv[3];

  if (zkSource === undefined || secrets === undefined) {
    throw Error("zk source and secrets files are required");
  }

  const zkSourceData: Buffer = readFileSync(zkSource);
  const secretsData: Buffer = readFileSync(secrets);

  const secretsJson: Array<Secret> = JSON.parse(secretsData.toString());

  initialize().then(async (zokratesProvider) => {
    console.log("Analyzing source file...");
    const zk = new Zokrates(zokratesProvider, zkSourceData.toString());

    console.log("Exporting Solidity file...");
    const solidityVerifier = zk.exportSol();

    writeFileSync('./Verifier.sol', Buffer.from(solidityVerifier));

    const generateProof = (data: Secret): Secret => {
      console.log(`Generating proof for secret: ${data.secret}`);

      const hash = getHash(data.secret, data.coordinatesHash);

      const input = [data.secret, data.coordinatesHash, hash].map(splitHexStrToBigIntStr);

      data.proof = zk.generateProof(input);

      console.log(`Verifying proof: ${zk.verifyProof(data.proof)}`);
      return {...data};
    }

    const promises = secretsJson.slice(0, 1).map(data => new Promise((resolve, reject) => resolve(generateProof(data))));

    Promise.all(promises)
    .then(res => {
      console.log(JSON.stringify(res));
    })
  });
})();
