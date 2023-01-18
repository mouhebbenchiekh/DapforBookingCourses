import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState,useLayoutEffect } from "react";
import { ethers } from "ethers";
import levelFactory from '../utils/contracts/LevelFactory.json' ; 
import {useNavigate,useLocation} from 'react-router-dom' ; 


function FormCreateLevel()
{
    const [isLoading, setIsLoading] = useState(false);
    const [connLevel, setConnlevel] = useState();
    const levelContractAddress = process.env.REACT_APP_LEVEL_CONTRACT_ADDRESS ; 
    const levelContractABI = levelFactory.abi ; 

    const navigate = useNavigate();
    const location = useLocation(); 
    console.log(location.state.pathId)

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
  

    async function handleCreateLevel(event)
    {
      setIsLoading(true) ;
      event.preventDefault();
      let levelName = event.target.elements.levelName.value ;
      let description = event.target.elements.description.value ;
      let imageUrl = event.target.elements.imageUrl.value ;
      let placesLeft = event.target.elements.placesLeft.value ;

        
      let levelContract = connLevel ;
      const createLevelTxn = await levelContract.createLevel(levelName,description,imageUrl,placesLeft,location.state.pathId)
      const level = await createLevelTxn.wait();
      const eventLevel = level.events.find(event => event.event === 'levelCreated');
      const [id, name,desc,imgUrl,nbLeft,pathId] = eventLevel.args;
      setIsLoading(false);
      navigate(-1);
      console.log(`created level with id ${id} pathName ${name} and description ${desc} with imgUrl ${imgUrl} `);

    }

     
    useEffect(() => {
        connectLevel();
      },[]);

    
    return(
      <> 
     {isLoading && <LoadingSpinner message={"level is being created"} /> }
     <br></br>
        <form  onSubmit={handleCreateLevel} className="formLayout" >
          <label htmlFor="levelName" >levelName
            <input type="text" id="levelName" />
          </label>
          <label htmlFor="description" >Description
            <input type="text" id="description" />
          </label>
          <label htmlFor="imageUrl" >imageUrl
            <input type="text" id="imageUrl" />
          </label>
          <label htmlFor="placesLeft" >placesLeft
            <input type="number" id="placesLeft" />
          </label>

  
          <input type="submit" value="create new path" className='btn'/>
        </form>
      </>
      )
  
}

export default FormCreateLevel ; 