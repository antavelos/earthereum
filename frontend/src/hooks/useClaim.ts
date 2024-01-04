import { useState } from "react";
import useEarthereumContract from "./useEarthereumContract";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";

type ClaimProps = {
  area: Number;
  inputs: Object;
  proof: Object;
  uri: String;
};

const useClaim = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { signer, owner }
  } = useWeb3Context() as IWeb3Context;
  const contract = useEarthereumContract(owner);

  const claim: (props: ClaimProps) => void = async ({area, inputs, proof, uri}) => {
    if (!contract) {
      return;
    }

    setLoading(true);

    contract.claim(area, inputs, proof, uri, signer)
    .then(() => {
      setLoading(false);
    })
    .catch((err: Error) => {
      console.error(err);
      setLoading(false);
    })
  };

  return { claim, loading };
};

export default useClaim;