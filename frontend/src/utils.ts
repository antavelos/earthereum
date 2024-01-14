import { Buffer } from 'buffer'
import { sha256 } from 'ethers';
import { Feature, Polygon } from 'geojson';

export const splitHex = (s: string): Array<string> => {
  s = s.startsWith("0x") ? s.slice(2) : s;
  let s0 = s.slice(0, s.length/2);
  let s1 = s.slice(s.length/2);

  return [`0x${s0.padStart(64, "0")}`, `0x${s1.padStart(64, "0")}`];
}

export const toBuffer = (s: string): Buffer => {
  const bytes = s.split('')
   .map((el, ix, arr) => ix % 2 ? null : el + arr[ix + 1])
   .filter(el => el !== null)
   .map(x => parseInt(x!, 16));

   return Buffer.from(bytes);
}

export const hashCoordinates = (feature: Feature): string => {
  return sha256(Buffer.from(JSON.stringify((feature.geometry as Polygon).coordinates)));
}
