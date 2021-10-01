import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import ReactPaginate from "react-paginate";


import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { Filter } from '@material-ui/icons';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import axios from 'axios';



const Final = (props) => {

    const [poli, setPoli] = useState("")



    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const result = await axios.get(`http://localhost:3500/policyss/${props.id}`);
        const x = result.data[0];
        setPoli(x)
        // prueba()
    }



    return (
        <div>
            <div className="row">


                <div className="col-4">
                    <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="data:image/png;base64,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" class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title">Poliza</h4><br />
                                    <div className="rn">

                                        <h6>

                                            <p>Id poliza: <span>{poli.id_policys}</span></p>
                                            <p>Nombre: <span>{poli.name_policy}</span></p>
                                            <p>Detalle de la poliza: <span>{poli.detail_pt}</span></p>
                                            <p>Numero Real de Poliza: {poli.numberreal} </p>
                                            <p>Fecha de creación: {poli.create}</p>
                                        </h6>
                                    </div>


                                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="data:image/png;base64,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" class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title">Compañia</h4><br />
                                    <div className="rn">
                                        <h6>
                                            <p>Id Conpañia: <span>{poli.id_company}</span></p>
                                            <p>Nombre de la Compañia: <span>{poli.name}</span></p>

                                        </h6>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBCvHRUKZCJQl7-GrWtlk38DcTRp2atRTdtQ&usqp=CAU" class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title">Cliente</h4><br />
                                    <div className="rn">
                                        <h6>
                                            <span>Nombre de usuario: {poli.usernames}</span>
                                            <p> Nombre completo: {poli.fullname}</p>
                                            <p> Correo: {poli.email}</p>
                                            <p> Teléfono: {poli.phone}</p>
                                            <p> Dirección: {poli.address}</p>
                                            <p> Documento: {poli.passport}</p>

                                        </h6>

                                    </div>

                                    <p class="card-text"><small class="text-muted">Creado {poli.create}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Final

