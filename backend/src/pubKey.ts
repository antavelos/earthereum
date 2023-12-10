import Wallet from 'ethereumjs-wallet';
import { readFileSync } from 'fs';


const getPublicKey = (privateKey: string): Buffer => {

  // Get a wallet instance from a private key
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');

  const wallet = Wallet.fromPrivateKey(privateKeyBuffer);

  return wallet.getPublicKey();
}

const inputFile = process.argv[2]
const outputFile = process.argv[3]

if (inputFile === undefined || outputFile === undefined) {
  throw Error("input and output files are required");
}

const data: Buffer = readFileSync(inputFile);

const jsonData: Array<object> = JSON.parse(data.toString());

const updatedJsonData = jsonData.map(item => {
  console.log(getPublicKey(item.privateKey.slice(2)));
  const updated = {
    ...item,
    publicKey: getPublicKey(item.privateKey.slice(2)),
  };

  return updated;
})


// writeFileSync(outputFile, JSON.stringify(updatedJsonData));