import NavBar from "./NavBar";
import checkIfWalletIsConnected from "../utils/functions/checkWallet";
import connectWallet from "../utils/functions/checkWallet";
import adminFactory from '../utils/contracts/AdminFactory.json';
import { useEffect, useState,useLayoutEffect } from "react";
import { ethers } from "ethers";

import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate} from 'react-router-dom' ; 


function Admin({setFirstNameLanding,setLastNameLanding,setCurrentAccountLanding,
    setEmailLanding,setIdLanding,setType})
    {   
        const [currentAccount, setCurrentAccount] = useState("");
        const [connAdmin, setconnAdmin] = useState();
        const adminContractAddress = process.env.REACT_APP_ADMIN_CONTRACT_ADDRESS;
        const adminContractABI = adminFactory.abi ; 
        const [isLoggedIn,setIsLoggedIn] = useState(false);
    
        const [totalAdminsNumber,setTotalAdminsNumber] = useState(0);
    
    
    
    
        function connectAdmin() 
        {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const adminContract = new ethers.Contract(
                adminContractAddress,
                adminContractABI,
                signer
            );
    
            setconnAdmin(adminContract);
            } 
            else 
            {
                console.log("Ethereum object doesn't exist ");
            }
        }
    
    
    const [firstName,setFirstName] = useState("");
    
    function logout()
    {
      setCurrentAccount("");
      setCurrentAccountLanding("");
      setconnAdmin();
      setIsLoggedIn(false);
    }
    
    const getAdminByAcc = async (connAdmin) => 
      {
        try {
          let adminContract = connAdmin ;
          const [id,first,last,acc,mail]= await adminContract.getAdminByAccount(currentAccount);
          setFirstName(first);
          setFirstNameLanding(first);
          setLastNameLanding(last);
          setEmailLanding(mail);
          setIdLanding(id);
          setType("admin");
          setIsLoggedIn(true);
    
        } catch (error) {
          setIsLoggedIn(false);
          console.log(error);
        }
      }
    
      useEffect(() => {
        currentAccount!=="" ?getAdminByAcc(connAdmin): connectAdmin();
      },[currentAccount])
    
    
        const adminsNumber = async (conn) => {
            try {
              let adminContract = conn ;
              let currentLength = await adminContract.getAdminsLength();
              setTotalAdminsNumber(currentLength.toNumber());
            } catch (error) {
              console.log(error);
            }
          };
    
        useEffect(() => {
        connAdmin!==undefined ?adminsNumber(connAdmin): connectAdmin();
        },[connAdmin,totalAdminsNumber]);
    
    
    
    
    
        useLayoutEffect(() => {
            checkIfWalletIsConnected(setCurrentAccount,setCurrentAccountLanding);
        }, []);
    
        useEffect(() => {
            connectAdmin();
          },[]);
          
    
          return (
                <div className="App">
                <div>
                  { !isLoggedIn && (
                    <div>
                      <h1>This interface is for admins</h1>
                      <h2>If you are using an admin account, then switch to your admin your admin wallet</h2>
                    </div>
                    )
                  }
                  {
                    isLoggedIn && (
                      <div>
                        <NavBar firstName={firstName} type="admin" logout={logout}/>
                        <Outlet/>
                      </div>
                    )
                  }
                  {!currentAccount && (
                  <button className ="btn" onClick={() => connectWallet(setCurrentAccount,setCurrentAccountLanding)}>
                    connect Wallet
                  </button>
                  )}
                </div>
                </div>
          );
    }

export default Admin ;