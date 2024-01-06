
import { useEffect, useState } from "react";
import useEarthContract from "./useEarthContract";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";

const useEarthBalance = () => {
  const contract = useEarthContract();
  const [balance, setBalance] = useState<Number | undefined>();
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
  }

  useEffect(getBalance, [contract, address, isAuthenticated]);

  return balance;
};

export default useEarthBalance;