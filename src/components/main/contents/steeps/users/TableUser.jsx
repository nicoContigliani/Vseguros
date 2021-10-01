import React,{useState,useEffect} from 'react'

const TableUser = (props) => {

const [filtv,setFiltv]=useState(true)

    useEffect(() => {
        console.log(props)
    }, [])




    return (
        <div>
            
              {
                filtv ? (
                    <div>
                        {/* {
                            props.map((item) =>
                                <ul key={item.id_person}>
                                    {item.usernames}
                                    {item.fullname}

                                    {item.email}
                                    {item.phone}
                                    {item.address}
                                </ul>
                            )

                        }  */}
                   
                    </div>
                  
                ) : ("nada")
            }



        </div>
    )
}

export default TableUser
