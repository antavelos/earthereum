import { createContext, FC, ReactNode, useContext } from "react";
import useEarthBalance from "../hooks/useEarthBalance";
import useLandBalance from "../hooks/useLandBalance";

export interface IContractContext {
  getEarthBalance: () => void;
  getLandBalance: () => void;
  state: {
    earthBalance?: number;
    landBalance?: number;
  };
}

const ContractContext = createContext<IContractContext | null>(null);

type Props = {
  children: ReactNode;
};

const ContractContextProvider: FC<Props> = ({ children }) => {
  const {balance: earthBalance, getBalance: getEarthBalance} = useEarthBalance();
  const {balance: landBalance, getBalance: getLandBalance} = useLandBalance();

  return (
    <ContractContext.Provider
      value={{
        getEarthBalance,
        getLandBalance,
        state: {
          earthBalance,
          landBalance
        },
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;

export const useContractContext = () => useContext(ContractContext);