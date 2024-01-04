import { BaseContract, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import ABI from "../contracts/abi/Earthereum.json";
import { Earthereum } from "../types/Earthereum";

const address = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";


const useEarthContract = (caller?: JsonRpcSigner) => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => {
      const signer = caller || state.signer;

      if (!signer) {
        return;
      }

      return (new BaseContract(address, ABI, signer)) as Earthereum
    },
    [state.signer, caller]
  );
};

export default useEarthContract;
