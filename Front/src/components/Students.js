import { useEffect, useState } from "react";
import { ethers } from "ethers";
import studentFactory from '../utils/contracts/StudentFactory.json' ; 
import studentLevelFactory from '../utils/contracts/StudentLevelFactory.json' ; 

import { useNavigate ,useParams} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";


function Students()
{

    const [connStudent, setConnStudent] = useState();
    const studentContractAddress = process.env.REACT_APP_STUDENT_CONTRACT_ADDRESS ; 
    const studentContractABI = studentFactory.abi ; 

    const [students, setStudents] = useState([]);
    const [studentsLength,setStudentsLength] = useState(0); 
    const [isLoading, setIsLoading] = useState(false);

    const [connStudentLevel, setConnStudentLevel] = useState();
    const studentLevelContractAddress = process.env.REACT_APP_STUDENT_LEVEL_CONTRACT_ADDRESS ; 
    const studentLevelContractABI = studentLevelFactory.abi ; 

    let params = useParams() ; 
    let levelId = params.levelId ; 

    function connectStudent() {
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
  
      } else {
        console.log("Ethereum object doesn't exist ");
      }
    }

    function connectStudentLevel() {
      const { ethereum } = window;
      if (ethereum) {
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
  
  
  
    const getStudentsLength = async (conn) => {
      try {
        let studentContract = conn ;
        const currentLength = await studentContract.getStudentsLength();
        setStudentsLength(currentLength.toNumber());
      } catch (error) {
        console.log(error);
      }
    };

    const getStudent = async (conn,index) => {
      try {
        let studentContract = conn ;
        const getStudent = await studentContract.getStudentById(index);
        return getStudent ;
      } catch (error) {
        console.log(error);
      }
    };

    const allStudents = async (conn) => {
      setIsLoading(true);
      for(let i=0 ; i <studentsLength ; i++)
      {
        const [id,firstName,lastName,account,email] = await getStudent(conn,i) ;
        let student = [] ;
        if (levelId)
        {
          let studentsLevelId = await getLevelStudentsId(connStudentLevel);
          console.log(studentsLevelId);
          for (let j=0 ; j < studentsLevelId.length ; j++)
          {
            if(studentsLevelId[j] == id )
            {
              student.push({"id": id, "firstName" : firstName,"lastName" : lastName, "account" : account,"email" : email });
              setStudents(students => [...students,student] );
    
            }
          }  
        }
        else 
        {
          student.push({"id": id, "firstName" : firstName,"lastName" : lastName, "account" : account,"email" : email });
          setStudents(students => [...students,student] );
        }
      }
      setIsLoading(false);
    }

    const getLevelStudentsId = async (conn) => 
    {
      try{
        let studentLevelContract = conn ;
        const getStudentsLevelId = await studentLevelContract.getLevelStudentsId(levelId);
        return [...new Set(getStudentsLevelId)] ;
        ;
      }catch(err)
      {
        console.log(err)
        return [];
      }
    }

    let navigate = useNavigate() ;
   
  
    useEffect(() => {
      connectStudent();
    },[]);

    useEffect(() => {
      connectStudentLevel();
    },[]);
  
  
  
    useEffect(() => {
      studentsLength!==0 ?allStudents(connStudent): connectStudent() ; connectStudentLevel();
    },[studentsLength]);

    useEffect(() => {
        connStudent!==undefined ?getStudentsLength(connStudent): connectStudent(); connectStudentLevel();
    },[studentsLength,connStudent]);

 
  
    return (
      <>
        {isLoading ? <LoadingSpinner message={"students are loading"}/>: ""}
        <table id="tableLayout">
            <thead>
            <tr>
                <th>id</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>account</th>
                <th>email</th>
            </tr>
            </thead>
            <tbody>
            {students.map((stdContainer) => {
              return(
                stdContainer.map((student,index) => {
                  return(
                    <tr key={student['id']}>
                        <td>{student['id']}</td>
                        <td>{student['firstName']}</td>
                        <td>{student['lastName']}</td>
                        <td>{student['account'].slice(2,9)}</td>
                        <td>{student['email']}</td>
                    </tr>
                  )
                })
              )
            })}
            </tbody>
        </table> 

      </>
    )

}

export default Students ;
