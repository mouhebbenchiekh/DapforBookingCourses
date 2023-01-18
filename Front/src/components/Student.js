import FormCreateStudentAccount from "./FormCreateStudentAccount";
import NavBar from "./NavBar";
import checkIfWalletIsConnected from "../utils/functions/checkWallet";
import connectWallet from "../utils/functions/checkWallet";
import studentFactory from '../utils/contracts/StudentFactory.json';
import { useEffect, useState,useLayoutEffect } from "react";
import { ethers } from "ethers";
import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate} from 'react-router-dom' ; 


function Student({setFirstNameLanding,setLastNameLanding,setCurrentAccountLanding,
setEmailLanding,setIdLanding,setType})
{   
    const [currentAccount, setCurrentAccount] = useState("");
    const [connStudent, setConnStudent] = useState();
    const studentContractAddress = process.env.REACT_APP_STUDENT_CONTRACT_ADDRESS
    const studentContractABI = studentFactory.abi ; 
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const [totalStudentsNumber,setTotalStudentsNumber] = useState(0);




    function connectStudent() 
    {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const studentContract = new ethers.Contract(
            studentContractAddress,
            studentContractABI,
            signer
        );

        setConnStudent(studentContract);
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
  setConnStudent();
  setIsLoggedIn(false);
}

const getStudentByAcc = async (connStudent) => 
  {
    try {
      let studentContract = connStudent ;
      const [id,first,last,acc,mail]= await studentContract.getStudentByAccount(currentAccount);
      setFirstName(first);
      setFirstNameLanding(first);
      setLastNameLanding(last);
      setEmailLanding(mail);
      setIdLanding(id);
      setType("student");
      setIsLoggedIn(true);

    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    }
  }

  useEffect(() => {
    currentAccount!=="" ?getStudentByAcc(connStudent): connectStudent();
  },[currentAccount])


    const studentsNumber = async (conn) => {
        try {
          let studentContract = conn ;
          let currentLength = await studentContract.getStudentsLength();
          setTotalStudentsNumber(currentLength.toNumber());
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
    connStudent!==undefined ?studentsNumber(connStudent): connectStudent();
    },[connStudent,totalStudentsNumber]);





    useLayoutEffect(() => {
        checkIfWalletIsConnected(setCurrentAccount,setCurrentAccountLanding);
    }, []);

    useEffect(() => {
        connectStudent();
      },[]);

      return (
            <div className="App">
            <div>
              { !isLoggedIn &&(
                <FormCreateStudentAccount setCurrentAccount={setCurrentAccount} currentAccount={currentAccount} setIsLoggedIn={setIsLoggedIn} connection={connStudent} studentsNumber={studentsNumber} />)
              }
              {
                isLoggedIn && (
                  <div>
                    <NavBar firstName={firstName} type={"student"} logout={logout}/>
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

export default Student ; 