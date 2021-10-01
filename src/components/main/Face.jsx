import React, { useEffect, useState } from 'react'
import Bodys from './contents/Bodys'
import Log from './log/Log'



const Face = () => {
const [logs,setLogs]=useState(false)  
useEffect(() => {
     
}, [])



    return (
        <div>
          {
          logs ? (<Log/>):(<Bodys/>)
          }


        </div>
    )
}

export default Face
