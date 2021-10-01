import React, { useEffect, useState } from 'react'

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
import Policies from './Policies';
import PoliciesT from './PoliciesT';
import Companies from './Companies';
import Usuario from './Usuario';
import Final from './Final';



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



const TablePolicy = () => {


    const [pageNumber, setPageNumber] = useState(0);
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };



    const [poli, setPoli] = useState([])
    const [politt, setPolitt] = useState("")

    const [editar, setEditar] = useState(true)
    const [ids, setIds] = useState()
    const [busqueda, setBusqueda] = useState("")
    const [filtro, setFiltro] = useState("")
    const [n, setN] = useState("")

    const [idTablaS, setIdTablaS] = useState("")


    const [editars, setEditars] = useState('')


    //
    const [pre, setPre] = useState(false)

    const [pol, setPol] = useState('')
    const [poliss, setPoliSS] = useState([])
    const [filt, setFilt] = useState([])

    //get policy Type
    const [polT, setPolT] = useState('')

    const [comp, setComp] = useState('')
    const [compp, setCompp] = useState('')
    const [coomp, setCoomp] = useState([])
    const [mens, setMens] = useState('')
    const [menss, setMenss] = useState('')
    const [mensss, setMensss] = useState('')



    const [user, setUser] = useState('')



    const [idSSS, setIdsss] = useState("");



    //poliza 
    const [id_policy, setId_Policy] = useState()
    const [id_policy_typess, setId_policy_typess] = useState('')
    const [detail, setDetauk] = useState('')
    const [active, setActive] = useState('true')
    const [id_person, setId_person] = useState('')
    const [id_company, setId_company] = useState('')
    const [create, setCreate] = useState('')
    const [numberreal, setNumberreal] = useState('')
    const [name, setName] = useState('')


    const [po, setPo] = useState({
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




    //poliza detalles
    // const [name_policy, setName_policy] = useState('')
    // const [detail_pt, setDetail_pt] = useState('')


    const [poD, setPoD] = useState({
        name_policy: "",
        detail_pt: ""
    })



    //companies
    // const [name, setName] = useState([]);
    // const [detail_c, setDetail_c] = useState("full")
    // const [id_company_detail, setId_company_detail] = useState('full');

    const [co, setCo] = useState({
        name: "",
        detail_c: "full",
        id_company_detail: "full"
    })



    //menssaje
    const [id_message, setId_message] = useState(1)



    //user
    // const [usernames, setUsernames] = useState("");
    // const [fullname, setFullname] = useState("");
    // const [passport, setPassport] = useState("")
    // const [email, setEmail] = useState("")
    // const [phone, setPhone] = useState("")
    // const [address, setAddress] = useState("")
    // const [id_agents, setId_agents] = useState('1')
    // const [id_clients, setId_clients] = useState('1')
    // const [password, setPassword] = useState('password')

    const [person, setPerson] = useState({
        usernames: "",
        fullname: "",
        passport: "",
        email: "",
        phone: "",
        address: "",
        id_agents: 1,
        id_clients: 1,
        password: "password"
    })

    const [idss, setIdss] = useState(ids)
    const [IDDs, setIDDs] = useState("")


    useEffect(() => {
        getData()
        companiesss()
        mensagesss()

    }, [])
    const getData = async () => {
        const result = await axios.get(`http://localhost:3500/policyss/`);
        const x = result.data;
        setPoli(result.data)
        // setPo({
        //     ...po,
        //     id_policy: x.id_policy,
        //     id_policy_typess: x.id_policy_type,
        //     detail: x.detail,
        //     active: x.active,
        //     id_person: x.id_person,
        //     id_company: x.id_company,
        //     create: x.create,
        //     numberreal: x.numberreal,
        //     name: x.name
        // })

    }



    const companiesss = async () => {
        const result = await axios.get(`http://localhost:3500/companies/`);
        setCoomp(result.data)
        const x = result.data;
        setCo({
            name: x.name,
            detail_c: x.detail_c,
            id_company_detail: x.id_company_detail
        })

    }

    const mensagesss = async () => {
        const result = await axios.get(`http://localhost:3500/message/`);
        setMenss(result.data)
    }

    const catchCompanyMensaje = () => { }



    const filtrarr = (id) => {
        setIDDs(id)
        console.log(id)
        const x = poli.filter(item => item.id_policys === id)
        setPolitt(x[0])
        mostrar()
    }

    const filts = (e) => {
        e.preventDefault();
        const x = poli.filter(item => item.id_policys === IDDs)
        setPolitt(x[0])
    }


    const filtrar = (e) => {
        e.preventDefault()
        // getData()
        console.log(poli)
        if (poli === '' || poli === 'Null') {
            alert('las busquedas no pueden ser sin contenido')
        } else {

            const fi = poli.filter(item => item.id_policys === parseInt(busqueda)
                || item.name_policy === busqueda
                || item.id_person === parseInt(busqueda)
                || item.usernanes === busqueda
                || item.fullname === busqueda
                || item.id_company === parseInt(busqueda)
                || item.email === busqueda


            )
            console.log(fi)
            setPoli(fi)
        }

    }




    const mostrar = () => {
        console.log(politt)
    }



    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xl');


    const traerIDTablaModal = (e) => {
        e.defaultPrevent()
        alert(idTablaS)


    }



    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value);
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };






    const paraEditar = async (id) => {
        alert(id)
        setIdsss(id)

        const result = await axios.get(`http://localhost:3500/policys/${id}`)
        const x = result.data[0];


        console.log("*************")
        console.log(x)


        setEditars(x)
        setEditar(false)
        getDataPolicysType(x.id_policy_typess)
        getDataCompany(x.id_company)


        getDataMessage(x.id_message)
        getDataPolicys(x.id_policys)
        getDataSS(x.id_policys)
        getDataUser(x.id_person)



        setId_Policy(x.id_policy)
        setId_policy_typess(x.id_policy_typess)
        setDetauk(x.detail_p)
        setActive(x.active_p)
        setId_person(x.id_person)
        setId_company(x.id_company)
        setCreate(x.create)
        setNumberreal(x.numberreal)


    }



    //getData

    const getDataPolicys = async (id) => {
        const resultt = await axios.get(`http://localhost:3500/policys/${id}`);
        // setId_policy(resultt.data[0].id_policy_type + 1);
        const x = resultt.data[0]
        setPol({
            id_policys: x.id_policys,
            id_policy_typess: x.id_policy_typess,
            detail_p: x.detail_p,
            active_p: x.active_p,
            id_person: x.id_person,
            id_company: x.id_company,
            create: x.create,
            numberreal: x.numberreal,
            id_message: x.id_menssage
        })

    }

    const getDataPolicysType = async (id) => {
        const resultt = await axios.get(`http://localhost:3500/policysType/${id}`);
        // setId_policy(resultt.data[0].id_policy_type + 1);
        const x = resultt.data[0]
        setPolT({
            id_policy_type: x.id_policy_type,
            name_policy: x.name_policy,
            detail_pt: x.detail_pt,
            active: null
        })


    }

    const getDataCompany = async (id) => {
        const resultt = await axios.get(`http://localhost:3500/companies/${id}`);
        // setComp(resultt.data)
        const x = resultt.data[0]
        console.log(x)

        setComp(x)
        setCo({

            name: x.name,
            detail: x.detalil,
            id_company_detail: x.id_company_detail
        })



        // setName(x.name)
        // setDetail_c(x.detail_c)
        // setId_company_detail(x.id_company_detail)

    }

    const getDataMessage = async (id) => {
        const resultt = await axios.get(`http://localhost:3500/message/${id}`);
        // console.log(result.data)
        // const x = result.data[0].id_message;
        // const y = parseInt(x) + 1;

        const x = resultt.data[0]


        setMens(x)
    }


    const getDataUser = async (id) => {
        const enviar = await axios.get(`http://localhost:3500/user/${id}`);
        const x = enviar.data[0]
        console.log(x)
        setUser(x)
        setPerson({
            usernames: x.usernames,
            fullname: x.fullname,
            passport: x.passport,
            email: x.email,
            phone: x.phone,
            address: x.address,
            id_agents: 1,
            id_clients: 1,
            password: "password"
        })

    }




    const [value, setValue] = React.useState('1');

    const handleChanges = (event, newValue) => {
        setValue(newValue);
        const n = parseInt(newValue);
        if (n === 5) {
            getDataSS()
            console.log(pol.id_policys)
        }
    };







    const ediPolici = (e) => {
        e.preventDefault()
        alert("si")
        updatePolicy()
    }

    const updatePolicy = async () => {
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
        } = pol
        console.log(pol, "++++++++++++++++++++++++")

        // try {
        //     const resultP = await axios.post(`http://localhost:3500/policys/${id_policy}`, {
        //         id_policy_typess, detail_p, active_p: "True", id_person, id_company, create, numberreal, id_message
        //     })
        // } catch (error) {

        // }


    }


    const getDataSS = async () => {

        const n = parseInt(id_policy)
        try {
            //             const result = await axios.get(`http://localhost:3500/policyss/`);
            //             const r = result.data;
            //             const fil = r.fil(item => item.id_person === id_person)
            // alert(fil)

            console.log("+++++++++++++++++++++++++++++++++", poli, "++++++++++++++++++++++++++++++++")

            const fil = poli.filter(item => item.id_policy === n)
            setFilt(fil)

            console.log(fil)




            // setPoliSS(r)

        } catch (error) {
            console.log(error)
        }


    }



    const editPoliT = (e) => {
        e.preventDefault()

        updatePolicyT()
    }

    const updatePolicyT = async () => {

        // const resultP = await axios.post(`http://localhost:3500/policysType/${id_policy_typess}`, {
        //     name_policy, active: "True"
        // })
        updatePolicy()
    }

    const catchCompany = (e) => {
        e.preventDefault()
        catchCompanyFilter()
    }
    const catchCompanyFilter = () => {
        const ids = parseInt(compp)

        const fi = coomp.filter(item => item.id_company === ids)
        console.log(fi[0])
        alert(fi[0].name)
        setId_company(fi[0].id_company)
        setName(fi[0].name)
        // setDetail_c(fi[0].detail_c)
        updateCompani()
    }


    const editarCompani = (e) => {
        e.preventDefault()
        updateCompani()
    }

    const updateCompani = async () => {

        // const resultP = await axios.post(`http://localhost:3500/companies/${id_company}`, {
        //     detail_c, active: "True", id_company_detail: 3, name
        // })
        // console.log(resultP.status)
        // alert(resultP.status)

        // updatePolicy()
    }




    // const editarUsuario = async (event) => {
    //     event.preventDefault()
    //     console.log(`${id_person}   usernames: ${usernames}, fullname: ${fullname}, email: ${email}, phone: ${phone}, address:${address}, password: ${password}, detail: ${detail}, active: ${active}, id_agents: ${id_agents}, id_clients: ${id_clients}, id_policy: ${id_policy}, passport: ${passport}
    // `)
    //     const id = id_person
    //     eInsertar(id)


    // }


    // const eInsertar = async (id) => {
    //     try {
    //         const enviar = await axios.post(`http://localhost:3500/user/${id}`, {
    //             usernames: usernames, fullname: fullname, email: email, phone: phone, address: address, password: password, detail: detail, active: active, id_agents: 1, id_clients: 1, id_policy: id_policy, passport: passport
    //         }
    //         );

    //         console.log("enviado")
    //         console.log(enviar.data)
    //         console.log(enviar.status)

    //         if (enviar.status === 200) {
    //             //    if (usernames==='undefined' && fullname==='undefined'&&  email==='undefined' && phone==='undefined' &&  address==='undefined' && password==='undefined' && detail==='undefined'&& active==='undefined'&& passport ==='undefined'
    //             //    ){
    //             //        alert("no hay nulos");
    //             //    }else{
    //             //        alert("si hay nulos");
    //             //    }
    //             alert("usuario modificado correctamente")
    //         }

    //         // window.location.reload();

    //     } catch (error) {
    //         console.log(error)

    //     }
    // }




    const onchangePolicy = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setPol({
            ...pol,
            [e.target.name]: e.target.value
        })
        console.log(pol)

    }







    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const displayPolicys =
        <div>





            <div>

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                    className="rb"
                >
                    <DialogTitle id="max-width-dialog-title" >Tabla Detalle de Polizas </DialogTitle>
                    <DialogContent className="rb" >
                        <DialogContentText  >


                            <div className="row">

                                <div className="col-4">
                                    <div class="card mb-3" >
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img src="data:image/png;base64,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" class="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <h4 class="card-title">Poliza</h4>
                                                    <h6>

                                                        <p>id poliza: <span>{politt.id_policys}</span></p>
                                                        <p>Nombre: <span>{politt.name_policy}</span></p>
                                                        <p>Detalle de la poliza: <span>{politt.detail_pt}</span></p>
                                                        <p>Numero Real de Poliza: {politt.numberreal} </p>
                                                        <p>Fecha de creación: {politt.create}</p>
                                                    </h6>






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
                                                    <h4 class="card-title">Compañia</h4>
                                                    <h6>
                                                        <p>Id Conpañia: <span>{politt.id_company}</span></p>
                                                        <p>Nombre de la Compañia: <span>{politt.name}</span></p>

                                                    </h6>



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
                                                    <h4 class="card-title">Cliente</h4>
                                                    <h6>
                                                        <span>Nombre de usuario: {politt.usernames}</span>
                                                        <p> Nombre completo: {politt.fullname}</p>
                                                        <p> Correo: {politt.email}</p>
                                                        <p> Teléfono: {politt.phone}</p>
                                                        <p> Dirección: {politt.address}</p>
                                                        <p> Documento: {politt.passport}</p>

                                                    </h6>

                                                    <p class="card-text"><small class="text-muted">Creado {politt.create}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
            {

                editar ? (
                    <div className="container">
                        <h5>Busqueda Tabla Poliza</h5>

                        <div>

                            <form onSubmit={filtrar}>

                                <div class="input-group mb-3">
                                    <input type="busqueda" onChange={(e) => setBusqueda(e.target.value)} class="form-control" minlength="1" placeholder="busqueda" aria-label="Recipient's username" aria-describedby="button-addon2" required />
                                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Filtrar</button>
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={getData}>Traer Todos</button>
                                </div>
                            </form>

                        </div>


                        <div className="row">
                            <div className="com-12">
                                <div class="table-responsive-sm">
                                    <div className="ra">

                                        <table class="table table-secondary table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#id poliza</th>
                                                    <td>Nombre de la poliza </td>
                                                    <td>Detalle de la poliza</td>
                                                    <td>Nombre completo del cliente</td>
                                                    <td>teléfono</td>
                                                    <td>Email</td>
                                                    <td>Nombre de la compañia aseguradora</td>
                                                    <td>Numero real de la poliza</td>
                                                    <td>Fecha de Creación</td>
                                                    <th scope="col">Acción</th>



                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    poli
                                                        .slice(pagesVisited, pagesVisited + usersPerPage)
                                                        .map((item, index) =>



                                                            <tr key={index}>

                                                                <th scope="row"
                                                                    onClick={(() => filtrarr(item.id_policys))}
                                                                >{item.id_policys}

                                                                    <SearchIcon type="button" onClick={handleClickOpen} />
                                                                </th>
                                                                <td>{item.name_policy}</td>
                                                                <td>{item.detail_pt}</td>
                                                                <td>{item.fullname}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.numberreal}</td>
                                                                <td>{item.create}</td>

                                                                <td>
                                                                    <th>
                                                                        <td>
                                                                            <button className="btn-primary btn-sm" onClick={(() => paraEditar(item.id_policys))}>Editar</button>

                                                                        </td>

                                                                    </th>

                                                                </td>
                                                            </tr>
                                                        )
                                                }



                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) :
                    (
                        <div>

                            <TabContext value={value}>
                                <AppBar position="static">
                                    <TabList onChange={handleChanges} aria-label="simple tabs example">
                                        <Tab label="Poliza" value="1" />
                                        <Tab label="Compañia" value="2" />
                                        <Tab label="Mensaje" value="3" />
                                        <Tab label="Usuario" value="4" />
                                        <Tab label="Poliza Final " value="5" />


                                    </TabList>
                                </AppBar>
                                <TabPanel value="1">

                                    <div className="rb">
                                        <h5>
                                            Referido a modificar Poliza

                                        </h5>

                                        <Policies id={idSSS} />





                                    </div>

                                    <hr />

                                    <div className="rb">

                                        <h5>
                                            Referido a modificar Caracteristicas de la Poliza

                                        </h5>
                                        <PoliciesT id={idSSS} />


                                    </div>
                                    <hr />


                                </TabPanel>
                                <TabPanel value="2">



                                    <div className="rb">

                                        <h5>
                                            Compañia

                                        </h5>
                                        <Companies id={idSSS} />

                                    </div>



                                </TabPanel>
                                <TabPanel value="3">
                                    <div className="rb">

                                        <h6>Mensajes</h6>




                                        {
                                            pre ?
                                                (
                                                    <div>

                                                        <div class="input-group mb-3">

                                                            <input type="text" value={mens.id_message} class="form-control" placeholder="Id Mensaje" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                            <input type="text" defaultValue={mens.type} class="form-control" placeholder="Tipo de Mensaje" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                            <input type="text" defaultValue={mens.message} class="form-control" placeholder="Mensaje" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                            <input type="text" defaultValue={mens.personalized} class="form-control" placeholder="Personalizacón" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                            <div class="input-group-append">
                                                                <button class="btn btn-outline-secondary" type="button">Button</button>
                                                            </div>
                                                        </div>

                                                        <div className="rb">
                                                            <form onSubmit={catchCompanyMensaje}>

                                                                <select class="form-select" aria-label="Default select example"
                                                                    onChange={(e) => setCompp(e.target.value)}
                                                                ><option>Mensajes </option>
                                                                    {
                                                                        menss.map((item, index) =>
                                                                            <option key={index} value={item.id_menssage} > id -companía {item.id_message} ---{item.type}---{item.message}</option>

                                                                        )
                                                                    }
                                                                </select>


                                                                <div class="d-grid gap-2">

                                                                    <button type="submit" className=" btn btn-primary sm-block">Seleccionar</button>

                                                                </div>
                                                            </form>
                                                        </div>


                                                    </div>

                                                ) : (
                                                    <div>
                                                        <h4>El mensaje que recivirá es: </h4>
                                                        <h6>¡Su poliza vence en dos días! </h6>


                                                    </div>
                                                )
                                        }

                                        <hr />
                                    </div>



                                </TabPanel>

                                <TabPanel value="4">
                                    <div className="rb">
                                        <h6>Usuario</h6>
                                        <Usuario id={idSSS} />

                                    </div>

                                    <br />



                                </TabPanel>
                                <TabPanel value="5">

                                    <div className="anim">

                                        <Final id={idSSS} />




                                    </div>
                                </TabPanel>



                            </TabContext>

                            <div>








                            </div>

                        </div>
                    )


            }

        </div>
        ;

    const pageCount = Math.ceil(poli.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };











    return (
        <div>

            <div className="App">
                {displayPolicys}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>

            {/* <div>





                <div>

                    <Dialog
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="max-width-dialog-title"
                        className="rb"
                    >
                        <DialogTitle id="max-width-dialog-title" >Tabla Detalle de Polizas </DialogTitle>
                        <DialogContent className="rb" >
                            <DialogContentText  >


                                <div className="row">

                                    <div className="col-4">
                                        <div class="card mb-3" >
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img src="data:image/png;base64,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" class="img-fluid rounded-start" alt="..." />
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h4 class="card-title">Poliza</h4>
                                                        <h6>

                                                            <p>id poliza: <span>{politt.id_policys}</span></p>
                                                            <p>Nombre: <span>{politt.name_policy}</span></p>
                                                            <p>Detalle de la poliza: <span>{politt.detail_pt}</span></p>
                                                            <p>Numero Real de Poliza: {politt.numberreal} </p>
                                                            <p>Fecha de creación: {politt.create}</p>
                                                        </h6>


                                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>




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
                                                        <h4 class="card-title">Compañia</h4>
                                                        <h6>
                                                            <p>Id Conpañia: <span>{politt.id_company}</span></p>
                                                            <p>Nombre de la Compañia: <span>{politt.name}</span></p>

                                                        </h6>



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
                                                        <h4 class="card-title">Cliente</h4>
                                                        <h6>
                                                            <span>Nombre de usuario: {politt.usernames}</span>
                                                            <p> Nombre completo: {politt.fullname}</p>
                                                            <p> Correo: {politt.email}</p>
                                                            <p> Teléfono: {politt.phone}</p>
                                                            <p> Dirección: {politt.address}</p>
                                                            <p> Documento: {politt.passport}</p>

                                                        </h6>

                                                        <p class="card-text"><small class="text-muted">Creado {politt.create}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
                {

                    editar ? (
                        <div className="container">
                            <h5>Busqueda Tabla Poliza</h5>

                            <div>

                                <form onSubmit={filtrar}>

                                    <div class="input-group mb-3">
                                        <input type="busqueda" onChange={(e) => setBusqueda(e.target.value)} class="form-control" minlength="1" placeholder="busqueda" aria-label="Recipient's username" aria-describedby="button-addon2" required />
                                        <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Filtrar</button>
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={getData}>Traer Todos</button>
                                    </div>
                                </form>

                            </div>


                            <div className="row">
                                <div className="com-12">
                                    <div class="table-responsive-sm">
                                        <div className="ra">

                                            <table class="table table-secondary table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#id poliza</th>
                                                        <td>Nombre de la poliza </td>
                                                        <td>Detalle de la poliza</td>
                                                        <td>Nombre completo del cliente</td>
                                                        <td>teléfono</td>
                                                        <td>Email</td>
                                                        <td>Nombre de la compañia aseguradora</td>
                                                        <td>Numero real de la poliza</td>
                                                        <td>Fecha de Creación</td>
                                                        <th scope="col">Acción</th>



                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        poli.map((item, index) =>



                                                            <tr key={index}>

                                                                <th scope="row"
                                                                    onClick={(() => filtrarr(item.id_policys))}
                                                                >{item.id_policys}

                                                                    <SearchIcon type="button" onClick={handleClickOpen} />
                                                                </th>
                                                                <td>{item.name_policy}</td>
                                                                <td>{item.detail_pt}</td>
                                                                <td>{item.fullname}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.numberreal}</td>
                                                                <td>{item.create}</td>

                                                                <td>
                                                                    <th>
                                                                        <td>
                                                                            <button className="btn-primary btn-sm" onClick={(() => paraEditar(item.id_policys))}>Editar</button>

                                                                        </td>

                                                                    </th>

                                                                </td>
                                                            </tr>
                                                        )
                                                    }



                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                        (
                            <div>

                                <TabContext value={value}>
                                    <AppBar position="static">
                                        <TabList onChange={handleChanges} aria-label="simple tabs example">
                                            <Tab label="Poliza" value="1" />
                                            <Tab label="Compañia" value="2" />
                                            <Tab label="Mensaje" value="3" />
                                            <Tab label="Usuario" value="4" />
                                            <Tab label="Poliza Final " value="5" />


                                        </TabList>
                                    </AppBar>
                                    <TabPanel value="1">

                                        <div className="rb">
                                            <h5>
                                                Referido a modificar Poliza

                                            </h5>

                                            <form onSubmit={ediPolici}>
                                                <div class="input-group mb-3">
                                                    <input type="text" value={editars.id_policys} class="form-control" placeholder="IdPoliza" onChange={(e) => setId_Policy(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />
                                                    <input type="date" defaultValue={editars.create} class="form-control" placeholder="Fecha de Creación" onChange={(e) => setCreate(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />
                                                    <input type="text" defaultValue={editars.numberreal} class="form-control" placeholder="Numero de Poliza Real" onChange={(e) => setNumberreal(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />

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

                                        <hr />

                                        <div className="rb">

                                            <h5>
                                                Referido a modificar Caracteristicas de la Poliza

                                            </h5>
                                            <form onSubmit={editPoliT} >
                                                <div class="input-group mb-3">
                                                    <input type="text" value={polT.id_policy_type} class="form-control" placeholder="id_polici type" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                    <input type="text" onChange={(e) => setName_policy(e.target.value)} defaultValue={polT.name_policy} class="form-control" placeholder="Nombre de la Poliza" aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />
                                                    <input type="text" onChange={(e) => setDetail_pt(e.target.value)} defaultValue={polT.detail_pt} placeholder="Descripción" aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />


                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary" type="submit">Button</button>
                                                    </div>
                                                </div>

                                            </form>


                                        </div>
                                        <hr />


                                    </TabPanel>
                                    <TabPanel value="2">



                                        <div className="rb">

                                            <h5>
                                                Compañia

                                            </h5>
                                            <form onSubmit={editarCompani} >

                                                <div class="input-group mb-3">
                                                    <input type="text" value={comp.id_company} class="form-control" placeholder="id_Compañia" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                    <input type="text" onChange={(e) => setName(e.target.value)} defaultValue={comp.name} class="form-control" placeholder="Nombre de la compañia" aria-label="Recipient's username" aria-describedby="basic-addon2" minlength="1" required />


                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary" type="submit">Button</button>
                                                    </div>
                                                </div>

                                            </form>

                                        </div>
                                        <hr />
                                        <div className="rb">
                                            <form onSubmit={catchCompany}>

                                                <select class="form-select" aria-label="Default select example"
                                                    onChange={(e) => setCompp(e.target.value)}
                                                ><option>compañias </option>
                                                    {
                                                        coomp.map((item, index) =>
                                                            <option key={index} value={item.id_company} > id -companía {item.id_company} --{item.name}</option>

                                                        )
                                                    }
                                                </select>


                                                <div class="d-grid gap-2">

                                                    <button type="submit" className=" btn btn-primary sm-block">Seleccionar</button>

                                                </div>
                                            </form>
                                        </div>
                                        <hr />


                                    </TabPanel>
                                    <TabPanel value="3">
                                        <div className="rb">

                                            <h6>Mensajes</h6>




                                            {
                                                pre ?
                                                    (
                                                        <div>

                                                            <div class="input-group mb-3">

                                                                <input type="text" value={mens.id_message} class="form-control" placeholder="Id Mensaje" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                                <input type="text" defaultValue={mens.type} class="form-control" placeholder="Tipo de Mensaje" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                                <input type="text" defaultValue={mens.message} class="form-control" placeholder="Mensaje" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                                <input type="text" defaultValue={mens.personalized} class="form-control" placeholder="Personalizacón" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                                <div class="input-group-append">
                                                                    <button class="btn btn-outline-secondary" type="button">Button</button>
                                                                </div>
                                                            </div>

                                                            <div className="rb">
                                                                <form onSubmit={catchCompanyMensaje}>

                                                                    <select class="form-select" aria-label="Default select example"
                                                                        onChange={(e) => setCompp(e.target.value)}
                                                                    ><option>Mensajes </option>
                                                                        {
                                                                            menss.map((item, index) =>
                                                                                <option key={index} value={item.id_menssage} > id -companía {item.id_message} ---{item.type}---{item.message}</option>

                                                                            )
                                                                        }
                                                                    </select>


                                                                    <div class="d-grid gap-2">

                                                                        <button type="submit" className=" btn btn-primary sm-block">Seleccionar</button>

                                                                    </div>
                                                                </form>
                                                            </div>


                                                        </div>

                                                    ) : (
                                                        <div>
                                                            <h4>Usted no posee una versión premium, su me mensaje predefinido es </h4>
                                                            <h6>¡Su poliza vence en dos días! </h6>

                                                            <p>si desea personalizar los mensajes comuniquese con el número 2612444106</p>

                                                        </div>
                                                    )
                                            }

                                            <hr />
                                        </div>



                                    </TabPanel>

                                    <TabPanel value="4">
                                        <div className="rb">
                                            <h6>Usuario</h6>
                                            <form onSubmit={editarUsuario}>

                                                <div class="input-group mb-3">
                                                    <input value={user.id_person} type="text" class="form-control" placeholder="id person" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                    <input defaultValue={user.usernames} onChange={event => setUsernames(event.target.value)}
                                                        type="text" class="form-control" placeholder="username" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                    <input defaultValue={user.fullname} onChange={(event) => setFullname(event.target.value)}
                                                        type="text" class="form-control" placeholder="Apellido" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                    <input defaultValue={user.passport} onChange={(event) => setPassport(event.target.value)}
                                                        type="text" class="form-control" placeholder="DNI" aria-label="Recipient's username" aria-describedby="basic-addon2" />


                                                </div>
                                                <div class="input-group mb-3">
                                                    <input defaultValue={user.email} type="text" class="form-control" onChange={(event) => setEmail(event.target.value)}
                                                        placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                    <input defaultValue={user.phone} type="text" class="form-control" onChange={(event) => setPhone(event.target.value)}
                                                        placeholder="Telefono" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                                    <input defaultValue={user.address} type="text" class="form-control" onChange={(event) => setAddress(event.target.value)}
                                                        placeholder="Dirección" aria-label="Recipient's username" aria-describedby="basic-addon2" />



                                                </div>
                                                <div class="input-group mb-3">


                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary" type="submit">Button</button>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>

                                        <br />



                                    </TabPanel>
                                    <TabPanel value="5">

                                        <div className="anim">



                                            <div className="row">

                                                <div className="col-4">
                                                    <h5>Polizas</h5>

                                                    "id_policys": {pol.id_policys},<br />
                                                    "name_policy":{pol.detail_p},<br />
                                                    "create": {pol.create},<br />
                                                    "numberreal": {pol.numberreal},<br />
                                                    "detail_p":  {pol.detail_p},<br />
                                                    "active_p": {pol.active_p},<br />
                                                </div>

                                                <div className="col-4">

                                                    <h5>Company y Mensaje</h5>


                                                    "id_company": {pol.id_company},<br />

                                                    "id_message": {pol.id_message},<br />
                                                </div>
                                                <div className="col-4">
                                                    <h5>Cliente</h5>

                                                    "id_person": {pol.id_person},<br />
                                                    "usernames": {user.usernames},<br />
                                                    "fullname": {user.fullname},<br />
                                                    "email": {user.email},<br />
                                                    "phone": {user.phone},<br />
                                                    "address": {user.address},<br />
                                                    "passport": {user.passport},
                                                </div>
                                            </div>







                                        </div>
                                    </TabPanel>



                                </TabContext>

                                <div>








                                </div>

                            </div>
                        )


                }

            </div> */}
        </div>
    )
}

export default TablePolicy
