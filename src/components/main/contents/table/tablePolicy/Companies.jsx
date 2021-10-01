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

const Companies = (props) => {

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

    const [comp, setComp] = useState({
        id_company: "",
        detail_c: "",
        active: "",
        id_company_detail: "",
        name: ""
    })

    const [coomp, setCoomp] = useState({
        id_company: "",
        detail_c: "",
        active: "",
        id_company_detail: "",
        name: ""
    })

    const [compp, setCompp] = useState([])



    useEffect(() => {

        getDataCC()
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
        getDataC(pon.id_company)
    }

    const getDataT = async (id_policy_typess) => {
        const result = await axios.get(`http://localhost:3500/policysType/${id_policy_typess}`);
        const x = result.data[0];
        const z = { ...x }
        // console.log(z, "+++++++")
        setPont(z)
    }
    const getDataC = async (id_company) => {
        const result = await axios.get(`http://localhost:3500/companies/${id_company}`);
        const x = result.data[0];
        const z = { ...x }
        // console.log(z, "+++++++")
        setComp(z)
    }


    const getDataCC = async () => {
        const result = await axios.get(`http://localhost:3500/companies/`);
        const x = result.data;
        console.log("********************", x, "*************************")
        setCompp(x)
    }

    const companiesss = async () => {
        const result = await axios.get(`http://localhost:3500/companies/`);
        setCompp(result.data)
        const x = result.data;
        // setCo({
        //     name: x.name,
        //     detail_c: x.detail_c,
        //     id_company_detail: x.id_company_detail
        // })

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


    const onchangeCompanies = e => {
        e.preventDefault();
        console.log(e.target.value);
        setComp({
            ...comp,
            [e.target.name]: e.target.value
        })
    }

    const onchangeCompaniess = e => {
        e.preventDefault();
        console.log(e.target.value);
        setCoomp({
            ...coomp,
            [e.target.name]: e.target.value
        })
    }





    const editarCompani = async (e) => {
        e.preventDefault();
        console.log(pont)

        const {
            id_company,
            detail_c,
            active,
            id_company_detail,
            name
        } = comp

        const resultP = await axios.post(`http://localhost:3500/companies/${id_company}`, {
            id_company,
            detail_c,
            active,
            id_company_detail,
            name
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
            create,
            numberreal,
            id_message
        } = pon
        const resultPP = await axios.post(`http://localhost:3500/policys/${id_policys}`, {
            id_policy_typess, detail_p, active_p, id_person, id_company: id_company, create, numberreal, id_message
        })
        if (resultPP.status === 200) {
            alert(" Tipo de poliza actualizada")
        }
    }



    const catchCompany = async (e) => {
        e.preventDefault()
        console.log(coomp.id_company)
        const n = coomp.id_company;

        const x = compp.filter(item => item.id_company === parseInt(n));
        const y = x[0]

        const {
            id_company: id_company,
            detail_c: detail_c,
            active: active,
            id_company_detail: id_company_detail,
            name: name
        } = y


        const resultP = await axios.post(`http://localhost:3500/companies/${id_company}`, {
            id_company,
            detail_c,
            active,
            id_company_detail,
            name
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
            create,
            numberreal,
            id_message
        } = pon
        const resultPP = await axios.post(`http://localhost:3500/policys/${id_policys}`, {
            id_policy_typess, detail_p, active_p, id_person, id_company: id_company, create, numberreal, id_message
        })
        if (resultPP.status === 200) {
            alert(" Tipo de poliza actualizada")
        }



        setCoomp({
            ...coomp,
            id_company: y.id_company,
            detail_c: y.detail_c,
            active: y.active,
            id_company_detail: y.id_company_detail,
            name: y.name
        })


    }


    return (
        <div>
            <form onSubmit={editarCompani} >

                <div class="input-group mb-3">
                    <input name="id_company" type="text" defaultValue={comp.id_company} class="form-control" placeholder="id_Compañia" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <input name="name" type="text" onChange={onchangeCompanies} defaultValue={comp.name} class="form-control" placeholder="Nombre de la compañia" aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />


                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Button</button>
                    </div>
                </div>

            </form>
            <hr />


            <div class="input-group mb-3">


                <form onSubmit={catchCompany}>

                    <select class="form-select" aria-label="Default select example"
                        onChange={onchangeCompaniess} name="id_company"
                    ><option>compañias </option>
                        {
                            compp.map((item, index) =>
                                <option key={index} value={item.id_company} > id -companía {item.id_company} --{item.name}</option>

                            )
                        }
                    </select>
                    <br />
                    <div className="rb">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="submit">Seleccionar</button>
                        </div>

                    </div>

                </form>




            </div>
        </div>
    )
}

export default Companies

