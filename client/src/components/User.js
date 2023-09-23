import React from 'react'
import {useNavigate} from "react-router-dom"

const User = ({key, index, name}) => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>{
        navigate("/main/chat");
     }} className='user-container'>

        <div className="user-profile">
            A
        </div>

        <div className="user-name">
            {name}
        </div>
    </div>
  )
}

export default User