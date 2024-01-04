import { BaseContract, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import ABI from "../contracts/abi/Earth.json";
import { Earth } from "../types/Earth";

const address = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

const useEarthContract = (caller?: JsonRpcSigner) => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => {
      const signer = caller || state.signer;

      if (!signer) {
        return;
      }

      return (new BaseContract(address, ABI, signer)) as Earth
    },
    [state.signer, caller]
  );
};

export default useEarthContract;
