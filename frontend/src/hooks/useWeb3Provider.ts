import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

const OWNER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export interface IWeb3State {
  address?: string;
  signer?: JsonRpcSigner;
  owner?: JsonRpcSigner;
  provider?: BrowserProvider;
  isAuthenticated: boolean;
}

const useWeb3Provider = () => {
  const initialWeb3State = {
    // address: null,
    // signer: null,
    // owner: null,
    // provider: null,
    isAuthenticated: false,
  };

  const toast = useToast();
  const [state, setState] = useState<IWeb3State>(initialWeb3State);

  const connectWallet = useCallback(async () => {
    if (state.isAuthenticated) return;

    try {
      const { ethereum } = window;

      if (!ethereum) {
        return toast({
          status: "error",
          position: "top-right",
          title: "Error",
          description: "No ethereum wallet found",
        });
      }
      const provider = new ethers.BrowserProvider(ethereum);

      const accounts: string[] = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const owner = new JsonRpcSigner(provider, OWNER_ADDRESS);

        const signer = await provider.getSigner();

        setState({
          ...state,
          address: accounts[0],
          signer,
          owner,
          provider,
          isAuthenticated: true,
        });

        localStorage.setItem("isAuthenticated", "true");
      }
    } catch {}
  }, [state, toast]);

  const disconnect = () => {
    setState(initialWeb3State);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    if (window == null) return;

    if (localStorage.hasOwnProperty("isAuthenticated")) {
      connectWallet();
    }
  }, [connectWallet, state.isAuthenticated]);

  useEffect(() => {
    const { ethereum } = window;

    if (typeof ethereum === "undefined") return;

    ethereum.on("accountsChanged", (accounts: string[]) => {
      setState({ ...state, address: accounts[0] });
    });

    return () => {
      ethereum.removeAllListeners();
    };
  }, [state]);

  return {
    connectWallet,
    disconnect,
    state,
  };
};

export default useWeb3Provider;