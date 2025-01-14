import { useState, useCallback } from "react";
import getWeb3 from "../getWeb3";
import NFTMarketplaceContract from "../contracts/NFTMarketplace.json";

export const useAuth = () => {
  const [error1, setError] = useState();
  const [state, setState] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });

  const Login = useCallback(async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      console.log("networkId: ", networkId);
      const deployedNetwork = NFTMarketplaceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        NFTMarketplaceContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setState({ ...state, web3, accounts, contract: instance });
      localStorage.setItem("userId", JSON.stringify(accounts[0]));
    } catch (error) {
      console.log(error);
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      setError("Failed to load web3, accounts, or contract.");
    }
  }, []);

  const Logout = useCallback(() => {
    localStorage.removeItem("userId");
    setState({ ...state, accounts: null });
    //disconnect();
  });

  return {
    web3: state.web3,
    contract: state.contract,
    accounts: state.accounts,
    Login,
    Logout,
  };
};
