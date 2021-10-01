import React,{useState,useEffect} from 'react'
import UserCreate from './UserCreate'






const User = () => {

   const [create,useCreate]=useState(true)

    return (
        <div>
{/* <h4>Usuarios</h4> */}
            {
                create ? (<UserCreate/>):("")
            }
        </div>
    )
}

export default User
