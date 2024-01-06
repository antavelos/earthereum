import { useState } from "react";
import useEarthereumContract from "./useEarthereumContract";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import { BigNumberish } from "ethers";
import { Types } from "../types/Earthereum";

export type ClaimProps = {
  area: BigNumberish;
  zkInput: Types.ProofInput;
  zkProof: Types.ProofStruct;
  uri: string;
};

const useClaim = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { signer, owner }
  } = useWeb3Context() as IWeb3Context;
  const contract = useEarthereumContract(owner);

  const claim: (props: ClaimProps) => void = async ({area, zkInput, zkProof, uri}) => {
    if (!contract || !signer) {
      return;
    }

    setLoading(true);
    contract.claim(area, zkInput, zkProof, uri, signer)
    .then(() => {
      setLoading(false);
    })
    .catch((err: Error) => {
      console.error(err);
      setLoading(false);
    })
  };

  return { claim, loading, };
};

export default useClaim;