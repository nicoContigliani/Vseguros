import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { set } from 'react-hook-form';


const Pre = () => {
    const [me, setMe] = useState("")
    const [reM, setReM] = useState("")
    const [reE, setReE] = useState("")


    useEffect(() => {
        // getData()
        messagess();
        setTimeout(() => {
            setInterval(() => {
                setTimeout(() => {

                    email();
                }, 1000);
            }, 9000);
        }, 10000);
     

    }, [])
    const messagess = async () => {
        const result = await axios.get(`http://localhost:3500/whatsapp/connects`);
        console.log(result.data.status);
        if (result.data.status === 200) {
            setReM(true)
        }
    }
    const email = async () => {
        const result = await axios.post(`http://localhost:3500/send-emaill`);
        console.log(result.data.status)
        if (result.data.status === 200) {
            setReE(true)
        }
    }
    return (
        <div>
            <div class="center-block">

                <div className="box">

                    <br />


                    <div class="d-flex justify-content-center">
                        <div class="jumbotron">
                            <h1 class="title">Sistema Seguros   ncV0.0.3</h1><br />
                            <h6>
                                {/* <CircularProgress disableShrink fontSize="large" />
                                v0.0.1 
                                
                            <CircularProgress disableShrink fontSize="large" />
                                 */}
                            </h6>
                            <h5>
                                <p>Bienvenido al sistema de seguros</p>

                                <br />
                                <div data-role="cube"
                                    data-color="bg-cyan bd-darkCyan"
                                    data-flash-color="#aa00ff"></div>
                                <br /><br />

                            </h5>

                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default Pre
