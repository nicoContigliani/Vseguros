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

const Usuario = (props) => {
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



    const [coomp, setCoomp] = useState({
        id_company: "",
        detail_c: "",
        active: "",
        id_company_detail: "",
        name: ""
    })

    const [compp, setCompp] = useState([])


    const [person, setPerson] = useState({
        id_person: "",
        usernames: "",
        fullname: "",
        email: "",
        phone: "",
        address: "",
        password: "1",
        detail: "",
        active: "",
        id_agents: '',
        id_clients: '',
        id_policy: '',
        passport: ''
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
        getDataUser(z.id_person)
    }


    const getDataUser = async (id) => {
        try {
            const result = await axios.get(`http://localhost:3500/user/${id}`)
            const x = result.data[0];
            // console.log(x)
            setPerson(x)

        } catch (error) {
            console.log(error)
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


    const onchengeUser = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        })

    }




    const editarUsuario = async (e) => {
        e.preventDefault();
        console.log({ ...person }, "+++++++++++++++++++++");
        console.log(pon)

        const {
            id_person,
            usernames,
            fullname,
            email,
            phone,
            address,
            password,
            detail,
            active,
            id_agents,
            id_clients,
            id_policy,
            passport
        } = person

        const resultP = await axios.post(`http://localhost:3500/user/${id_person}`, {
            usernames, fullname, email, phone, address, password, detail, active: active, id_agents: 1, id_clients: 1, id_policy, passport
        })
        if (resultP.status === 200) {
            alert(" Usuario actualizado")
        }

        const {
            id_policys,
            id_policy_typess,
            detail_p,
            active_p,
            // id_person,
            create,
            numberreal,
            id_message,
            id_company
        } = pon
        const resultPP = await axios.post(`http://localhost:3500/policys/${id_policys}`, {
            id_policy_typess, detail_p, active_p, id_person, id_company: id_company, create, numberreal, id_message
        })
        if (resultPP.status === 200) {
            alert(" Tipo de poliza actualizada")
        }
    }







    return (
        <div>
            <div className="rb">



                <hr />
                <div className="rb">
             
                    <form
                        onSubmit={editarUsuario}
                    >

                        <div class="input-group mb-3">
                            <input name="id_person" defaultValue={person.id_person} onChange={onchengeUser} type="text" class="form-control" placeholder="id person" aria-label="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />


                            <input name="usernames"
                                type="text"
                                class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={onchengeUser}
                                defaultValue={person.usernames}
                                aria-describedby="basic-addon2"
                            />
                            <input name="fullname" type="text" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={onchengeUser}
                                defaultValue={person.fullname}
                                aria-describedby="basic-addon2"
                            />

                            <input name="passport" type="text" class="form-control" placeholder={person.passport} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={onchengeUser}
                                defaultValue={person.passport}
                                aria-describedby="basic-addon2"
                            />


                        </div>
                        <div class="input-group mb-3">
                            <input name="email" type="text" class="form-control" placeholder={person.email} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={onchengeUser}
                                defaultValue={person.email}
                                aria-describedby="basic-addon2"
                            />
                            <input name="phone" type="text" class="form-control" placeholder={person.phone} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={onchengeUser}
                                defaultValue={person.phone}
                                aria-describedby="basic-addon2"
                            />

                            <input name="address" type="text" class="form-control" placeholder={person.address} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={onchengeUser}
                                defaultValue={person.address}
                                aria-describedby="basic-addon2"
                            />


                        </div>
                        <div class="input-group mb-3">


                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="submit">Button</button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Usuario
