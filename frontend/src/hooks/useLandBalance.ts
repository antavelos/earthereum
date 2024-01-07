import { useEffect, useState } from "react";
import useEarthereumContract from "./useEarthereumContract";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";

const useLandBalance = () => {
  const contract = useEarthereumContract();
  const [balance, setBalance] = useState<number | undefined>();
  const {
    state: { isAuthenticated, address },
  } = useWeb3Context() as IWeb3Context;

  const getBalance = () => {
    if (!contract || !isAuthenticated || !address) {
      return
    };

    contract.balanceOf(address)
    .then(res => {
      setBalance(() => Number(res));
    })
    .catch(err => {
      console.error(err);
    });
  };
  useEffect(getBalance, [contract, address, isAuthenticated]);

  return {balance, getBalance};
};

export default useLandBalance;