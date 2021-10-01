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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        //   minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));


const PoliciesT = (props) => {
    const [pon, setPoN] = useState({
        id_policy: 1,
        id_policy_typess: "",
        detail: "",
        active: "",
        id_person: "",
        id_company: "",
        create: "",
        numberreal: "",
        name: "",
        id_message: ""
    })

    const [pont, setPont] = useState({
        active: "true",
        detail_pt: "",
        id_policy_type: "",
        name_policy: ""
    })




    useEffect(() => {
        getData(id);
        console.log(pon)
    }, [])
    const id = props.id;
    const getData = async (id) => {
        const result = await axios.get(`http://localhost:3500/policys/${id}`);
        const x = result.data[0];
        const z = { ...x }
        setPoN(z)
        getDataT(pon.id_policy_typess)
    }

    const getDataT = async (id_policy_typess) => {
        const result = await axios.get(`http://localhost:3500/policysType/${id_policy_typess}`);
        const x = result.data[0];
        const z = { ...x }
        console.log(z, "+++++++")
        setPont(z)
    }








    const onchangePolicy = e => {
        e.preventDefault()
        console.log(e.target.value);
        setPoN({
            ...pon,
            [e.target.name]: e.target.value
        })
    }

    const onchangePolicyt = e => {
        e.preventDefault();
        console.log(e.target.value);
        setPont({
            ...pont,
            [e.target.name]: e.target.value
        })
    }



    const editPoliT = async (e) => {
        e.preventDefault();
        console.log(pont)

        const {
            active,
            detail_pt,
            id_policy_type,
            name_policy
        } = pont;

        const resultP = await axios.post(`http://localhost:3500/policysType/${id_policy_type}`, {
            active,
            detail_pt,
            id_policy_type,
            name_policy
        })
        if (resultP.status === 200) {
            alert(" Tipo de poliza actualizada")
        }

        const {
            id_policys,
            id_policy_typess,
            detail_p,
            active_p,
            id_person,
            id_company,
            create,
            numberreal,
            id_message
        } = pon
        const resultPP = await axios.post(`http://localhost:3500/policys/${id_policys}`, {
            id_policy_typess: id_policy_type, detail_p: detail_pt, active_p: active, id_person, id_company, create, numberreal, id_message
        })
        if (resultPP.status === 200) {
            alert(" Tipo de poliza actualizada")
        }
    }



    return (
        <div>
            <form onSubmit={editPoliT} >
                <div class="input-group mb-3">
                    <input name="id_policy_type" type="text" onChange={onchangePolicyt} value={pont.id_policy_type} class="form-control" placeholder="id_polici type" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <input name="name_policy" type="text" onChange={onchangePolicyt} defaultValue={pont.name_policy} class="form-control" placeholder="Nombre de la Poliza" aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />
                    <input name="detail_pt" type="text" onChange={onchangePolicyt} defaultValue={pont.detail_pt} placeholder="Descripción" aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />


                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Button</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default PoliciesT
