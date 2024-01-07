import { AddressLike, Contract, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import ABI from "../contracts/abi/Earthereum.json";
import { Earthereum } from "../types/Earthereum";

const address = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

const useEarthereumContract = (caller?: AddressLike) => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => {
      const signer = (caller || state.signer) as JsonRpcSigner;

      if (!signer) {
        return;
      }

      return (new Contract(address, ABI, signer)).connect(signer) as Earthereum
    },
    [state.signer, caller]
  );
};

export default useEarthereumContract;
