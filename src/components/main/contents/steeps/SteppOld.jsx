import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import User from './users/User';
import Company from './companies/Company';
import Insurance from './insurance/Insurance';
import Maturities from './maturities/Maturities'
import Policy from './policies/Policy';
import Messages from './messages/Messages'
import Finish from './finish/Finish'



import PersonIcon from '@material-ui/icons/Person';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ReceiptIcon from '@material-ui/icons/Receipt';
import EventIcon from '@material-ui/icons/Event';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ProgressBar } from 'react-bootstrap';



import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



import { Message } from '@material-ui/icons';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));









function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const Stepp = (props) => {

    const [bar, setBar] = useState("0")
    const [role, setRole] = useState("")
    const [u, setU] = useState('0')
    const [modo, setModo] = useState('');

    const [usuario, setUsuario] = useState(true)
    const [companies, setCompanies] = useState(false)
    const [type, setType] = useState(false)
    const [fdata, setFdata] = useState(false)
    const [nPoliza, setNpoliza] = useState(false)
    const [message, setMessage] = useState(false)
    const [fin, setFin] = useState(false)

    const [tempSteep, setDataTempSteep] = useState(false)



    useEffect(() => {
        getDataTemp()
        handleToggle()
        config('ususario')
        setInterval(() => {
            getDataTemp()

        }, 3000);
        setTimeout(() => {

            setOpen(false)

        }, 1500);

    }, [])




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
            setBar('17')

        }
        if (a === 'companies' || tempSteep === 2) {
            setU("")

            setUsuario(false)
            setCompanies(true)
            setType(false)
            setFdata(false)
            setNpoliza(false)
            setMessage(false)

            setBar('33')




        }
        if (a === 'type' || tempSteep === 3) {
            setU("")

            setUsuario(false)
            setCompanies(false)
            setType(true)
            setFdata(false)
            setNpoliza(false)
            setMessage(false)

            setBar('40')


        }
        if (a === 'date' || tempSteep === 4) {
            setU("")
            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(true)
            setNpoliza(false)
            setMessage(false)

            setBar('61')


        }
        if (a === 'number' || tempSteep === 5) {
            setU("")
            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(false)
            setNpoliza(true)
            setMessage(false)

            setBar('69')

        }
        if (a === 'message' || tempSteep === 6) {
            setU("")
            setUsuario(false)
            setCompanies(false)
            setType(false)
            setFdata(false)
            setNpoliza(false)
            setMessage(true)

            setBar('100')

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

            setBar('100')

        }

    }


    const getDataTemp = async (e) => {


        const result = await axios.get(`http://localhost:3500/temp`);
        setDataTempSteep(result.data[0].steeps)
        console.log(result.data[0].steeps)


    }

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(true);
    };
    const handleToggle = () => {
        setOpen(!open);
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







    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>


            <div className="row">
                <div className="col-2">
                </div>
                <div className="col-10">
                <ProgressBar animated now={bar} label={` progreso  ${bar}%`} />

                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Cliente" {...a11yProps(0)} />
                            <Tab label="Compañia" {...a11yProps(1)} />
                            <Tab label="Descripcion Poliza" {...a11yProps(2)} />
                            <Tab label="Fecha Creación Poliza" {...a11yProps(3)} />
                            <Tab label="Número de Poliza" {...a11yProps(4)} />
                            <Tab label="Mensaje" {...a11yProps(5)} />
                            <Tab label="Fin de Creación" {...a11yProps(6)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>

                            {
                                usuario ? (<User />) : ("")
                            }

                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {
                                companies ? (<Company />) : ("")
                            }
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {
                                type ? (<Insurance />) : ("")
                            }
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            {
                                fdata ? (<Maturities />) : ("")
                            }
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            {
                                nPoliza ? (<Policy />) : ("")
                            }
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            {
                                message ? (<Messages />) : ("")
                            }
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            {
                                fin ? (<Finish />) : ("")
                            }
                        </TabPanel>
                    </Box>                  </div>
            </div>



        </div>
    )
}

export default Stepp
