export default async function connectWallet(setCurrentAccount,setCurrentAccountLanding)
{
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Connected", [0]);
      setCurrentAccount(accounts[0]);
      setCurrentAccountLanding(accounts[0]);

    } catch (error) {
      console.log("error");
    }
  };