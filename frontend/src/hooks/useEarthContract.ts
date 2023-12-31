import { Contract } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import ABI from "../contracts/abi/Earth.json";

const address = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

const useEarthContract = () => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => state.signer && new Contract(address, ABI, state.signer),
    [state.signer]
  );
};

export default useEarthContract;
