import { useNavigate} from 'react-router-dom' ; 


function NavBar(props) 
{
  
  let navigate = useNavigate();

  return(
    <div className="topnav">
        <div className='left'>
            <a key="paths" onClick={() => {navigate("paths")}}>paths</a>
            { props.type === "student" &&
            <a key="learning" onClick={() => {navigate("learning")}}>my learning</a>
            }
             { props.type === "admin" && (<>
            <a key="students" onClick={() => {navigate("students")}}>students </a>
            <a key="levels" onClick={() => {navigate("levels")}}>levels </a> </>)

            }
        </div>
        <div className='right'>
            <a key={props.firstName} onClick={() => {navigate("profile")}}>{props.firstName} profile</a>
            <a key="logout" onClick={() => {props.logout()}}>logout</a>

        </div>
    </div>
    
  );
}

export default NavBar ; 