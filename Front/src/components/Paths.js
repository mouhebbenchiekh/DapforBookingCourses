import { useEffect, useState } from "react";
import { ethers } from "ethers";
import pathFactory from '../utils/contracts/PathFactory.json' ; 
import { useNavigate ,Link} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";



function Paths({type})
{
    const [connPath, setConnPath] = useState();
    const pathContractAddress = process.env.REACT_APP_PATH_CONTRACT_ADDRESS; 

    const pathContractABI = pathFactory.abi ; 
    const [paths, setPaths] = useState([]);
    const [pathsLength,setPathsLength] = useState(0); 
    const [isLoading, setIsLoading] = useState(false);

  
    function connectPath() {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const pathContract = new ethers.Contract(
          pathContractAddress,
          pathContractABI,
          signer
        );
  
        setConnPath(pathContract); 
  
      } else {
        console.log("Ethereum object doesn't exist ");
      }
    }
  
  
  
    const getPathsLength = async (conn) => {
      try {
        let pathContract = conn ;
        const currentLength = await pathContract.getCurrentId();
        setPathsLength(currentLength);
      } catch (error) {
        console.log(error);
      }
    };

    const getPath = async (conn,index) => {
      try {
        let pathContract = conn ;
        const getPath = await pathContract.getPathById(index);
        return getPath ;
      } catch (error) {
        console.log(error);
      }
    };

    const allPaths = async (conn) => {
      setIsLoading(true);
      for(let i=0 ; i <pathsLength ; i++)
      {
        const [id,name,description,imgUrl] = await getPath(conn,i) ;
        let path = [] ;
        path.push({"id": id, "name" : name, "description":description,"imgUrl":imgUrl});
        setPaths(paths => [...paths,path] );
      }
      setIsLoading(false);
    }

    let navigate = useNavigate() ;
   
  
    useEffect(() => {
      connectPath();
    },[]);
  
  
  
    useEffect(() => {
      connPath!==undefined ?allPaths(connPath): connectPath();
    },[connPath,pathsLength]);

    useEffect(() => {
      connPath!==undefined ?getPathsLength(connPath): connectPath();
    },[pathsLength,connPath]);
  
    return (
      <>
        <div className="path">
            {isLoading ? <LoadingSpinner message={"path is loading"}/>: ""}
            {paths.map((pathContainer) => {
              return(
                pathContainer.map((path,index) => {
                  return(
                    <div key={path['id']} className="pathInsideDiv" style={{ backgroundImage:`url(${path['imgUrl']})`,backgroundRepeat:"no-repeat" }} onClick={() => {navigate(`${path['id']}/levels`)}}> {path['name']} - {path['description']} </div>
                  )
                })
              )
            })}
        </div> 
        {type==="admin" &&
            <Link to="createPath">
              <button className="btn">add new path</button>
            </Link>
        }
      </>
    )
}

export default Paths ; 