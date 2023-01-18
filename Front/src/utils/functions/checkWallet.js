import { ethers } from "ethers";


export default async function checkIfWalletIsConnected(setCurrentAccount,setCurrentAccountLanding)
{
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
          } else {
            console.log("We have the ethereum object", ethereum);
          }
    
          /*
           * Check if we're authorized to access the user's wallet
           */
          /*const accounts = await ethereum.request({ method: "eth_accounts" });
          console.log(accounts);*/
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
          const signer = provider.getSigner();
    
          if (signer !== undefined) {
            const account = await signer.getAddress();
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
            setCurrentAccountLanding(account);
          } else {
            console.log("No authorized account found");
          }
        } catch (error) {
          console.log(error);
        }
};    


