import { Contract } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import ABI from "../contracts/abi/Earthereum.json";

const address = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

const useEarthereumContract = () => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => state.signer && new Contract(address, ABI, state.signer),
    [state.signer]
  );
};

export default useEarthereumContract;
