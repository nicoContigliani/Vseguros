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



const Policies = (props) => {

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



    useEffect(() => {
        getData(id);
        console.log(pon)
    }, [])
    const id = props.id;
    console.log(id)

    const getData = async (id) => {
        const result = await axios.get(`http://localhost:3500/policys/${id}`);
        const x = result.data[0];
        const z = { ...x }
        setPoN(z)

    }




    const editPolici = async (e) => {
        e.preventDefault()
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
        try {

            const resultP = await axios.post(`http://localhost:3500/policys/${id_policys}`, {
                id_policy_typess, detail_p, active_p: "True", id_person, id_company, create, numberreal, id_message
            })
            if (resultP.status === 200) {
                alert("poliza actualizada")
            }


        } catch (error) {

        }
    }


    const onchangePolicy = e => {
        e.preventDefault()
        console.log(e.target.value);
        setPoN({
            ...pon,
            [e.target.name]: e.target.value
        })
    }





    return (
        <div>
            <form onSubmit={editPolici}>
                <div class="input-group mb-3">


                    <input type="text"
                        name="id_policys"
                        onChange={onchangePolicy}
                        defaultValue={pon.id_policys}
                        class="form-control"
                        minlength="1" required
                    />
                    <input type="text"
                        name="create"
                        type="date"
                        onChange={onchangePolicy}
                        defaultValue={pon.create}
                        class="form-control"
                        minlength="1" required
                    />
                    <input type="text"
                        name="numberreal"
                        onChange={onchangePolicy}
                        defaultValue={pon.numberreal}
                        class="form-control"
                        minlength="1" required

                    />

                    <br />



                    <div class="form-check mb-3 ml-2">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label mr-2 " for="flexCheckDefault" minlength="1" required>
                            Activo
                        </label>
                    </div>

                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Button</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Policies
