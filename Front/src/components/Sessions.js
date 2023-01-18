import { useEffect, useState } from "react";
import { ethers } from "ethers";
import sessionFactory from '../utils/contracts/SessionFactory.json' ; 
import { useParams,Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";


function Sessions({type})
{
    const [connSession, setConnSession] = useState();
    const sessionContractAddress = process.env.REACT_APP_SESSION_CONTRACT_ADDRESS ; 

    const sessionContractABI = sessionFactory.abi ; 
    const [sessions, setSessions] = useState([]);
    const [sessionsLength,setSessionsLength] = useState(0); 
    const [levelSessions, setLevelSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
  
    const getSessionsLength = async (conn) => {
      try {
        let sessionContract = conn ;
        const currentLength = await sessionContract.getCurrentId();
        setSessionsLength(currentLength);
      } catch (error) {
        console.log(error);
      }
    };

    const getSession = async (conn,index) => {
      try {
        let sessionContract = conn ;
        const getSession = await sessionContract.getSessionById(index);
        return getSession ;
      } catch (error) {
        console.log(error);
      }
    };

    const allSessions = async (conn) => {
      setIsLoading(true);
      for(let i=0 ; i <sessionsLength ; i++)
      {
        const [id,name,date,levelId] = await getSession(conn,i) ;
        let session = [] ;
        const response_date = new Date(date*1000);
        console.log(response_date)

        session.push({"id": id,"name": name, "date" : response_date.toString(),"levelId": levelId});
        setSessions(sessions => [...sessions,session] );
      }
      setIsLoading(false); 
    }

    let params = useParams();

    function getSessionsByLevelId(params)
    {
      let lvlSessions = []; 
      let levelId = params.levelId ; 
      console.log(levelId)
      sessions.map((sessionC) => {
        sessionC.map( (session) => {
          if(session.levelId == levelId)
          {
            console.log(session)
            lvlSessions.push(session);
          }
        })
      })
      setLevelSessions(lvlSessions); 
    }

    useEffect(() => {
      connectSession();
    },[]);
  
  
  
    useEffect(() => {
      connSession!==undefined ?allSessions(connSession): connectSession();
    },[connSession,sessionsLength]);

    useEffect(() => {
        getSessionsByLevelId(params);
    },[sessions]);

    useEffect(() => {
      connSession!==undefined ?getSessionsLength(connSession): connectSession();
    },[sessionsLength,connSession]);
  
    return (
      <>
        <div className="path">
            { isLoading ? <LoadingSpinner message={"Sessions are loading"}/> : "" }
            {levelSessions.map((session) => {
              return(
                <div key={session['id']} className="levelInsideDiv"> {session['name']} - {session['date']} </div>
              )
            })}
        </div>
        {type==="admin" &&
         <Link to="createSession" state={{levelId : params.levelId}}>
           <button className="btn">add new session</button>
         </Link>
        }
      </>
        
    )
}

export default Sessions ; 