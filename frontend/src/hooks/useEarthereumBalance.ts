
import { useEffect, useState } from "react";
import useEarthereumContract from "./useEarthereumContract";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";

const useEarthereumBalance = () => {
  const contract = useEarthereumContract();
  const [balance, setBalance] = useState<Number | undefined>();
  const {
    state: { isAuthenticated, address },
  } = useWeb3Context() as IWeb3Context;

  useEffect(() => {
    if (!contract || !isAuthenticated || !address) return;

    const getBalance = async () => {
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

export default useEarthereumBalance;