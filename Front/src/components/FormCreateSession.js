import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState,useLayoutEffect } from "react";
import { ethers } from "ethers";
import sessionFactory from '../utils/contracts/SessionFactory.json' ; 
import {useNavigate,useLocation} from 'react-router-dom' ; 


function FormCreateSession()
{
    const [isLoading, setIsLoading] = useState(false);
    const [connSession, setConnSession] = useState();
    const sessionContractAddress = process.env.REACT_APP_SESSION_CONTRACT_ADDRESS ; 
    const sessionContractABI = sessionFactory.abi ; 

    const navigate = useNavigate();
    const location = useLocation(); 

    function connectSession() {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const sessionContract = new ethers.Contract(
            sessionContractAddress,
            sessionContractABI,
            signer
          );
    
          setConnSession(sessionContract); 
    
        } else {
          console.log("Ethereum object doesn't exist ");
        }
      }
  
  

    async function handleCreateSession(event)
    {
      setIsLoading(true) ;
      event.preventDefault();
      let name = event.target.elements.name.value ;
      let date = event.target.elements.date.value ;

      console.log(location.state)
      console.log(date)
        
      let sessionContract = connSession ;
      const dat = new Date(date);
      const createSessTxn = await sessionContract.createSession(name,dat.getTime()/1000,location.state.levelId);
  
      const session = await createSessTxn.wait(); 
      const eventSession = session.events.find(event => event.event ==='sessionCreated');
      const [id_sess,nameSession,dateSession,level_id_fk] = eventSession.args ;
      const response_date = new Date(date*1000)
      setIsLoading(false);
      navigate(-1);

    }

     
    useEffect(() => {
        connectSession();
      },[]);

    
    return(
      <> 
     {isLoading && <LoadingSpinner message={"session is being created"} /> }
     <br></br>
        <form  onSubmit={handleCreateSession} className="formLayout" >
          <label htmlFor="name" >session name
            <input type="text" id="name" />
          </label>
          <label htmlFor="date" >date
            <input type="datetime-local" id="date" />
          </label>
          <input type="submit" value="create new session" className='btn'/>
        </form>
      </>
      )
  
}

export default FormCreateSession ; 