import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateCompany = () => {

    const [emergente, setEmergente] = useState(false)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [companiesss, setCompaniesss] = useState({
        id_company: "1",
        name: "guanicodeSistemas",
        active: "1",
        detail:"algo",
        id_company_detail: "2",
        idcompany_detail: "a"
    })

    const {
        id_company,
        name,
        active,
        detail,
        id_company_detail,
        idCompany_detaill

    } = companiesss;




    const [cre, setCre] = useState("false");
    const [se, setSe] = useState("false");
    const [filtv, setFiltv] = useState("false")
    const [getD, setGetD] = useState([])
    const [filt, setFilt] = useState([])
    const [me, setMe] = useState("false")

    const [temp, setTemp] = useState([])
    const [comp, setComp] = useState([])
    const [cathCompanyC, setCathCompanyC] = useState("")





    const [datosTemp, setDatosTemp] = useState({
        id_company: "1",
        name: "contigliani",
        id_policy_type: "1",
        name_policy: "",
        datail: "algo",
        numberreal: "",
        create: "1988-06-03",
        id_message: "1",
        type: "",
        message: "",
        steeps: 2

    })
    const getDataTemp = async () => {
        const resultt = await axios.get(`http://localhost:3500/temp/2`);
        const re = resultt.data[0]
        setTemp(re)


        console.log("***************************************************************************")
        console.log(re)
        console.log("***************************************************************************")



    }






    const datosTempUrl = async () => {

    }


    useEffect(() => {
        getDataTemp()
        getDataCompany()
    }, [])




    const getDataCompany = async () => {
        const resultt = await axios.get(`http://localhost:3500/companies/`);
        setComp(resultt.data)
    }



    const onchangeCompany = (e) => {
        e.preventDefault()
        setCompaniesss({
            ...companiesss,
            [e.target.name]: e.target.value
        })
    }


    const createCompany = async (e) => {
        e.preventDefault();
        console.log("elemento: ", name);
        // alert(`elemento:${name}`);


        try {
            const resultCreateCompanyDetail = await axios.post(`http://localhost:3500/companyDetail/`, {

                detail_cd: "algo", active, id_maturities: 1, name

            })
            if (resultCreateCompanyDetail.status === 200) {
                try {
                    const resultCreateCompany = await axios.post(`http://localhost:3500/companies/`, {
                        detail_c: detail,
                        active,
                        id_company_detail,
                        name
                    })
                    if (resultCreateCompany.status === 200) {
                        alert('companies ')
                        getDataCompany()
                        const resultt = await axios.get(`http://localhost:3500/companies/`);
                        // setComp(resultt.data)
                        console.log(resultt.data)
                        const {
                            id_person,
                            usernames,
                            id_company,
                            names,
                            id_policy_type,
                            name_policy,
                            datail,
                            numberreal,
                            create,
                            id_message,
                            type,
                            message,
                            steeps,
                            phone,
                            fullname
                        } = temp;


                        const id_companys = resultt.data[0].id_company
                        const namess = resultt.data[0].name



                        const id = 2;
                        const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
                            id_person, usernames, id_company: id_companys, name: namess, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps: "3", phone, fullname
                        })
                        if (resultP.status === 200) {
                            setEmergente(true)
                        }


                    }


                } catch (error) {
                    console.log(error)

                }

            }


        } catch (error) {
            alert(error)
        }

    }

    const changeCompany = (e) => {
        setCathCompanyC({
            ...cathCompanyC,
            [e.target.name]: e.target.value
        })
    }
    const catchCompany = (e) => {
        e.preventDefault();
        alert(cathCompanyC)
    }



    const cathCompanyCC = async (id) => {
        alert(id)
        const ida = parseInt(id)
        const finddd = comp.find(item => item.id_company === ida)
        console.log("**********find*************")
        console.log(finddd)
        console.log("**********find*************")

        console.log(finddd.id_company);
        console.log(finddd.name);
        console.log(temp)


        const {
            id_person,
            usernames,
            id_company,
            names,
            id_policy_type,
            name_policy,
            datail,
            numberreal,
            create,
            id_message,
            type,
            message,
            steeps,
            phone,
            fullname
        } = temp;
        try {
            const id = 2;
            const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
                id_person, usernames, id_company: finddd.id_company, name: finddd.name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps: "3", phone, fullname
            })


            console.log(resultP.status)
            if (resultP.status === 200) {
                setEmergente(true)
            }

        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div>


            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">

                    <div>
                        <div className="row">



                            <div className="col-6">

                                <h4>Crear Compañia</h4>
                                <form onSubmit={createCompany}>

                                    <input name="name" minlength="1" required type="text" class="form-control" aria-label="C" aria-describedby="basic-addon2"
                                        onChange={onchangeCompany}
                                        value={companiesss.name}

                                    />


                                    {
                                        se ? (
                                            <button type="submit" class="btn btn-primary btn-sm">Crear</button>

                                        ) : ("")
                                    }
                                </form><br /><br />
                            </div>
                            <div className="col-6">
                                <h4>Seleccione Compañia
                                </h4>
                                <form onSubmit={catchCompany}>

                                    <select class="form-select" aria-label="Default select example"
                                        // onChange={(e) => setCompp(e.target.value)}
                                        // onChange={(e) => alert(e.target.value)}
                                        onChange={(e) => cathCompanyCC(e.target.value)}


                                    ><option>compañias </option>
                                        {
                                            comp.map((item, index) =>
                                                <option key={index} value={item.id_company} > id -companía {item.id_company} --{item.name}</option>

                                            )
                                        }
                                    </select>



                                    <div class="d-grid gap-2">
                                        {

                                            se ? (""
                                                // <button type="submit" className=" btn btn-primary sm-block">Seleccionar</button>

                                            ) : ("")
                                        }
                                    </div>
                                </form>

                            </div>
                            {
                                emergente ? (

                                    <div class="alert alert-primary btn-outline-secondary alert-dismissible fade show" role="alert">
                                        <strong>Compañia seleccionada</strong> presione siguiente para pasar a la próxima pantalla.

                                    </div>

                                ) : ("")
                            }


                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default CreateCompany
