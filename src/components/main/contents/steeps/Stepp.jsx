import React, { useState, useEffect } from 'react'

import User from './users/User';
import Company from './companies/Company';
import Insurance from './insurance/Insurance';
import Maturities from './maturities/Maturities'
import Policy from './policies/Policy';
import Messages from './messages/Messages'
import Finish from './finish/Finish'




import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    actionsContainer: {
        marginBottom: theme.spacing(3),
    },
    resetContainer: {
        padding: theme.spacing(4),
    },
    la: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


const Stepptwo = () => {


    const [pe, setPe] = useState(`<User/>`)
    const [paso, setPaso] = useState("false")
    const [mostrar, setMostrar] = useState(false)
    const [bar, setBar] = useState("0")
    const [dataTemp, setDataTemp] = useState([])
    const [tempSteep, setDataTempSteep] = useState(false)
    const [def, setDef] = useState(false)


    const [usuario, setUsuario] = useState(true)
    const [companies, setCompanies] = useState(false)
    const [type, setType] = useState(false)
    const [fdata, setFdata] = useState(false)
    const [nPoliza, setNpoliza] = useState(false)
    const [message, setMessage] = useState(false)
    const [fin, setFin] = useState(false)
    const [u, setU] = useState('0')



    useEffect(() => {

        getDataTemp()
        setInterval(() => {
            getDataTemp()

        }, 1000);
        setTimeout(() => {
            setMostrar(true)
        }, 1000);

    }, [])


    const getDataTemp = async (e) => {


        const result = await axios.get(`http://localhost:3500/temp`);
        console.log(result.data)

        setDataTemp(result.data)

        if (result.data === '' || result.data === "null") {
            alert("no tiene elementos")
            console.log(result.data)
        } else {
            console.log(result.data[0].steeps)
            setDataTempSteep(result.data[0].steeps)
            setDef(true)
            config()

        }



    }

    const config = (a) => {
        if (a === 'usuario' || tempSteep === 1) {
            // setU("")

            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(false)
            setNpoliza(false)
            setMessage(false)

            setUsuario(true)
            setBar(17)

        }
        if (a === 'companies' || tempSteep === 2) {
            setU("")

            setUsuario(false)
            setCompanies(true)
            setType(false)
            setFdata(false)
            setNpoliza(false)
            setMessage(false)

            setBar(33)


        }
        if (a === 'type' || tempSteep === 3) {
            setU("")

            setUsuario(false)
            setCompanies(false)
            setType(true)
            setFdata(false)
            setNpoliza(false)
            setMessage(false)

            setBar(40)


        }
        if (a === 'date' || tempSteep === 4) {
            setU("")
            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(true)
            setNpoliza(false)
            setMessage(false)

            setBar(61)


        }
        if (a === 'number' || tempSteep === 5) {
            setU("")
            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(false)
            setNpoliza(true)
            setMessage(false)
            setBar(69)

        }
        if (a === 'message' || tempSteep === 6) {
            setU("")
            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(false)
            setNpoliza(false)
            setMessage(true)
            setBar(100)

        }
        if (a === 'fin' || tempSteep === 7) {
            setU("")
            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(false)
            setNpoliza(false)
            setMessage(false)
            setFin(true)
            setBar(100)

        }

    }

    function getSteps() {
        return ['Cliente', 'Compañia', 'Detalle Poliza', 'Fecha', 'Numero de Poliza', 'Mensaje', 'Inserción terminada'];
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`;
            case 1:
                return 'An ad group contains one or more ads which target a shared set of keywords.';
            case 2:
                return `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`;
            case 3:

                return `${pe}`;
            default:
                return 'Unknown step';
        }
    }

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const salir = async () => {
        try {
            alert("S")
            const id = parseInt(2);
            const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
                id_person: 0, usernames: "", id_company: 0, name: "", id_policy_type: 0, name_policy: "", datail: "", numberreal: "", create: "06-03-1988", id_message: 0, type: "", message: "", steeps: 1, phone: "", fullname: ""
            })
            const x = resultP.status;
            // if (x === 200) {
            //     setSi(true)
            // }

        } catch (error) {
            console.log(error)
        }
        window.location.reload();
    }

    return (
        <div>

            <div className="row">

                <div className="col-1">

                </div>
                <div className="col-2">
                    <div className="card">



                        <div className="d-flex justify-content-center">


                            {
                                mostrar ? (
                                    <div className="container">

                                        <h5 class="card-title">Poliza</h5>
                                        <div id="donut" data-role="donut" data-value={bar} class="mx-auto"></div>

                                        <List component="nav" className={classes.root} aria-label="mailbox folders">
                                            <Divider light />
                                            <Divider light />
                                            <Divider light />



                                            <ListItem button>
                                                <ListItemText primary="Cliente" secondary={
                                                    ` id: ${dataTemp[0].id_person} -  Nombre: ${dataTemp[0].usernames} Nombre completo: ${dataTemp[0].fullname} Teléfono:${dataTemp[0].phone}`

                                                } />
                                            </ListItem>
                                            <Divider light />
                                            <Divider />
                                            <Divider />
                                            <Divider light />


                                            <Divider />
                                            <ListItem button divider>
                                                <ListItemText primary="Compañia" secondary={
                                                    `  id_compañia: ${dataTemp[0].id_company} - Nombre de la compañia:   ${dataTemp[0].name}`
                                                } />
                                            </ListItem>
                                            <Divider light />
                                            <Divider />
                                            <Divider />
                                            <Divider light />
                                            <ListItem button divider>
                                                <ListItemText primary="Descripcioón de la Poliza" secondary={
                                                    `Tipo de poliza: ${dataTemp[0].id_policy_type} - nombre de la poliza ${dataTemp[0].name_policy} - ${dataTemp[0].detail} `
                                                } />
                                            </ListItem>
                                            <Divider light />
                                            <Divider />
                                            <Divider />
                                            <Divider light />
                                            <Divider light />
                                            <ListItem button divider>
                                                <ListItemText primary="Numero de Poliza y fecha de Creación en el sistema" secondary={
                                                    `  Número de poliza Real: ${dataTemp[0].numerreal} - creado: ${dataTemp[0].create}
                                                    `
                                                } />
                                            </ListItem>
                                            <Divider light />
                                            <Divider />
                                            <Divider />
                                            <Divider light />
                                            <Divider light />
                                            <ListItem button divider>
                                                <ListItemText primary="Mensaje" secondary={
                                                    ` id_Mensaje: ${dataTemp[0].id_message} - typo de mensage: ${dataTemp[0].type} - ${dataTemp[0].message} 
                                                    `
                                                } />
                                            </ListItem>
                                            <ListItem button divider>
                                                <button class="btn btn-primary" onClick={getDataTemp}>Actualizar</button>
                                            </ListItem>
                                        </List>





                                    </div>





                                ) : ("")

                            }







                            {/* <button class="btn btn-primary" onClick={getDataTemp}>Actualizar</button> */}
                        </div>



                    </div>
                </div>
                <div className="col-9">

                    <div className="d-flex justify-content-center">





                        <div className={classes.root}>
                            <h1>Sistema Guiado de Creación </h1>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            {label === 'Cliente' ? (<User />) : ("")}
                                            {label === 'Compañia' ? (<Company />) : ("")}
                                            {label === 'Detalle Poliza' ? (<Insurance />) : ("")}
                                            {label === 'Fecha' ? (<Maturities />) : ("")}
                                            {label === 'Numero de Poliza' ? (<Policy />) : ("")}
                                            {label === 'Mensaje' ? (<Messages />) : ("")}
                                            {label === 'Inserción terminada' ? (<Finish />) : ("")}




                                            {/* 
                                        <Typography>

                                            {
                                                getStepContent(index)




                                            }</Typography> */}

                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer}>
                                    <Typography>All steps completed - you&apos;re finished</Typography>
                                    <Button onClick={handleReset} className={classes.button}>
                                        Reset
                                    </Button>
                                </Paper>
                            )}
                        </div>

                    </div>
                    <div class="d-grid gap-2">
                        {/* <button class="btn btn-outline-primary btn-sm" onClick={() => config()} type="submit">Confirmar Paso</button> */}
                        <button class="btn btn-outline-danger btn-sm" onClick={() => salir()} type="submit">Cortar Proceso</button>


                    </div>
                </div>

            </div>





        </div>
    )
}

export default Stepptwo
