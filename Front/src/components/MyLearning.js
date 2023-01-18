import { useEffect, useState } from "react";
import { ethers } from "ethers";
import studentLevelFactory from '../utils/contracts/StudentLevelFactory.json' ; 
import levelFactory from '../utils/contracts/LevelFactory.json' ; 
import LoadingSpinner from "./LoadingSpinner";

function MyLearning({std_id})
{
    const [connStudentLevel, setConnStudentLevel] = useState();
    const studentLevelContractAddress = process.env.REACT_APP_STUDENT_LEVEL_CONTRACT_ADDRESS ; 
    const studentLevelContractABI = studentLevelFactory.abi ; 
    const [studentLevels,setStudentLevels] = useState([]);

    const [connLevel, setConnlevel] = useState();
    const levelContractAddress = process.env.REACT_APP_LEVEL_CONTRACT_ADDRESS; 
    const levelContractABI = levelFactory.abi ; 


    const [isLoading, setIsLoading] = useState(false);

    function connectStudentLevel() {
      const { ethereum } = window;
        if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const studentLevelContract = new ethers.Contract(
          studentLevelContractAddress,
          studentLevelContractABI,
          signer
        );
  
        setConnStudentLevel(studentLevelContract); 
  
      } else {
        console.log("Ethereum object doesn't exist ");
      }
    }

    function connectLevel() {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const levelContract = new ethers.Contract(
          levelContractAddress,
          levelContractABI,
          signer
        );
  
        setConnlevel(levelContract); 
  
      } else {
        console.log("Ethereum object doesn't exist ");
      }
    }

    const getStudentLevelsId = async (conn) => 
    {
      try{
        let studentLevelContract = conn ;
        console.log(std_id)
        const getStudentsLevelId = await studentLevelContract.getStudentLevelsId(std_id);
        return [...new Set(getStudentsLevelId)] ;
      }catch(err)
      {
        console.log(err)
        return [];
      }
    }

  
      const getLevel = async (conn,index) => {
        try {
          let levelContract = conn ;
          const getlevel = await levelContract.getLevelById(index);
          return getlevel ;
        } catch (error) {
          console.log(error);
        }
      };
  
      const allStudentLevels = async (conn) => {
        setIsLoading(true);
        let stdLevelsIds =await getStudentLevelsId(connStudentLevel) ;
        for(let i=0 ; i <stdLevelsIds.length ; i++)
        {
          const [id,name,description,imgUrl,placesLeft,id_path] = await getLevel(conn,stdLevelsIds[i]) ;
          let level = [] ;
          level.push({"id": id, "name" : name, "description":description,"imgUrl":imgUrl,"placesLeft" :placesLeft,"id_path": id_path});
          setStudentLevels(studentLevels => [...studentLevels,level] );
        }
        setIsLoading(false);
      }
  
      useEffect(() => {
        connectLevel();
      },[]);


 
    useEffect(() => {
      connStudentLevel == undefined ? connectStudentLevel() : allStudentLevels(connLevel)
    },[connStudentLevel])


    useEffect(() => {
      connectStudentLevel();
    },[]);

  
    return (
        <div className="path">
            { isLoading ? <LoadingSpinner message={"my learnings are loading"}/> : "" }
            {studentLevels.map((levelC) => {
              return (
                levelC.map((level) => {
                  return(
                    <div key={level['id']} className="levelInsideDiv" style={{ backgroundImage:`url(${level['imgUrl']})`,backgroundRepeat:"no-repeat" }} >
                      <div> {level['name']} - {level['description']}</div> 
                    </div>
                  )
              }))
            })}
        </div>
    )
}

export default MyLearning ; 