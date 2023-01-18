
function Profile({account,firstName,lastName,email,type})
{
    return (
    <div className="profile">
        <p>Hello {firstName} {lastName} </p>
        <p>{type}</p>
        <p>{email}</p>
        <p>{account}</p>
    </div>    
    )
    
}

export default Profile ; 