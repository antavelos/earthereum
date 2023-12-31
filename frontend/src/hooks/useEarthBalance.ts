
import { useEffect, useState } from "react";
import useEarthContract from "./useEarthContract";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";

const useEarthBalance = () => {
  const contract = useEarthContract();
  const [balance, setBalance] = useState<Number | null>(null);
  const {
    state: { isAuthenticated, address },
  } = useWeb3Context() as IWeb3Context;

  useEffect(() => {
    if (!contract) return;

    const getBalance = async () => {
      if (!isAuthenticated || !address) {
        return;
      }

      try {
        const balance = await contract.balanceOf(address);

        setBalance(() => Number(balance));
      } catch(err){
        console.error(err);
      }
    };

    getBalance();

  }, [contract, address, isAuthenticated]);

  return balance;
};

export default useEarthBalance;