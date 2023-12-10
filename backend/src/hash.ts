import { sha256 } from "ethers";

const toBuffer = (s: string): Buffer => {
  const bytes = s.split('')
   .map((el, ix, arr) => ix % 2 ? null : el + arr[ix + 1])
   .filter(el => el !== null)
   .map(x => parseInt(x!, 16));

   return Buffer.from(bytes);
}

const splitHex = (s: string): Array<string> => {
  s = s.startsWith("0x") ? s.slice(2) : s;
  let s0 = s.slice(0, s.length/2);
  let s1 = s.slice(s.length/2);

  return [`0x${s0.padStart(64, "0")}`, `0x${s1.padStart(64, "0")}`];
}

const getHash = (secret: string, coordinatesHash: string): string => {
  const bs = toBuffer(secret);
  const bc = toBuffer(coordinatesHash);

  const full = Buffer.concat([bs, bc]);
  return sha256(full);
}

// console.log(buf., buf.length);
const secret = "5ea7ed75ef5ebcba09429b7a5f0fe42ac488f5809b5a868e2fd26be156f0ae57";
const coordinatesHash = "06e615290e8d9ba08c6e958a1bc41647bcddb3c8a78a9c9b685d2490e0bf2ae7";
const hash = getHash(secret, coordinatesHash);

console.log([...splitHex(secret), ...splitHex(coordinatesHash), ...splitHex(hash)]);
