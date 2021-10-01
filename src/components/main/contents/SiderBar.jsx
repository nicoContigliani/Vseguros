import React, { useEffect, useState } from 'react'



import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';





import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


const SiderBar = () => {




    const classes = useStyles();


    //configuración
    const [modoGuiado, setModoGuiado] = useState(false)
    const [dataTemp, setDataTemp] = useState([])
    const [def, setDef] = useState(false)

    const [bar, setBar] = useState("0")
    const [u, setU] = useState('0')
    const [tempSteep, setDataTempSteep] = useState(false)

    //seteo 
    const [usuario, setUsuario] = useState(true)
    const [companies, setCompanies] = useState(false)
    const [type, setType] = useState(false)
    const [fdata, setFdata] = useState(false)
    const [nPoliza, setNpoliza] = useState(false)
    const [message, setMessage] = useState(false)
    const [fin, setFin] = useState(false)
    const [a, setA] = useState("")
    const [dataPolicy, setDataPolicy] = useState([])
    const [datafiltradafechaPolicity, setDatafiltradafechaPolicity] = useState([])
    const [datafiltradafechaPolicityYesterday, setDatafiltradafechaPolicityYesterday] = useState([])
    const [datafiltradafechaPolicityAfter, setDatafiltradafechaPolicityAfter] = useState([])



    const [dHoy, setDhoy] = useState('')
    const [datafiltradafechaPolicityHoy, setDatafiltradafechaPolicityHoy] = useState("")



    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        // setInterval(() => {
        //     getDataTemp()
        // }, 100000);
        getDataPolicy()
        setInterval(() => {
            // getDataPolicy()
        }, 10000);

    }, [])



    const getDataPolicy = async (e) => {

        const result = await axios.get(`http://localhost:3500/policyss`);
        console.log(result.data)
        setDataPolicy(result.data)
        clock(result.data)
        clockAfter(result.data)
        clockYesterday(result.data)


        clockHoy(result.data)

    }
    const clock = (response) => {
        const s = response;
        const n = [];
        const nn = [...n];

        const sumardias = (fecha, dias) => {
            fecha.setDate(fecha.getDate() + dias)
            nn.push(fecha)
        }
        const d = new Date();
        //aca se setea cuantos días 
        const f = sumardias(d, +2);
        const diaNumeroHoy = new Date(nn).getDate();

        const resultado = s.filter((item) => {
            // const resultadofecha = new Date(item.create).getDate();

            if (new Date(item.create).getDate() === diaNumeroHoy) {
                return item;
            }
        }
        );
        console.log(resultado)
        setDatafiltradafechaPolicity(resultado)

    }



    const clockYesterday = (response) => {
        const s = response;
        const n = [];
        const nn = [...n];

        const sumardias = (fecha, dias) => {
            fecha.setDate(fecha.getDate() + dias)
            nn.push(fecha)
        }
        const d = new Date();
        //aca se setea cuantos días 
        const f = sumardias(d, +1);
        const diaNumeroHoy = new Date(nn).getDate();

        const resultado = s.filter((item) => {
            // const resultadofecha = new Date(item.create).getDate();

            if (new Date(item.create).getDate() === diaNumeroHoy) {
                return item;
            }
        }
        );
        console.log(resultado)
        setDatafiltradafechaPolicityYesterday(resultado)

    }


    const clockAfter = (response) => {
        const s = response;
        const n = [];
        const nn = [...n];

        const sumardias = (fecha, dias) => {
            fecha.setDate(fecha.getDate() + dias)
            nn.push(fecha)
        }
        const d = new Date();
        //aca se setea cuantos días 
        const f = sumardias(d, +3);
        const diaNumeroHoy = new Date(nn).getDate();

        const resultado = s.filter((item) => {
            // const resultadofecha = new Date(item.create).getDate();

            if (new Date(item.create).getDate() === diaNumeroHoy) {
                return item;
            }
        }
        );
        console.log(resultado)
        setDatafiltradafechaPolicityAfter(resultado)

    }



    const clockHoy = (response) => {
        const s = response;


        const hoy = new Date()
        const fecha = hoy.getDate() + '-' + hoy.getMonth() + '-' + hoy.getFullYear();
        setDhoy(fecha)



        console.log(s[0])



    }



    return (
        <div>
            <div className="container">
                <div className="btn btn-outline-primary">




                    <div className={classes.root}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Tres días Antes</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <div className="com-12">
                                        <div class="table-responsive-sm">
                                            <div className="ra">

                                                <table class="table table-danger table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#id poliza</th>
                                                            <td>Numero real de la poliza</td>
                                                            <td>Nombre completo del cliente</td>

                                                            <td>teléfono</td>
                                                            <td>Email</td>
                                                            <td>Detalle de la poliza</td>
                                                            <td>Fecha de Creación</td>



                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {

                                                            datafiltradafechaPolicityYesterday.map((item, index) =>



                                                                <tr key={item.id_policys}>

                                                                    <th scope="row"
                                                                    // onClick={(() => filtrarr(item.id_policys))}
                                                                    >{item.id_policys}

                                                                        {/* <SearchIcon type="button" onClick={handleClickOpen} /> */}
                                                                    </th>
                                                                    <td>{item.numberreal}</td>
                                                                    <td>{item.usernames} {item.fullname}</td>
                                                                    <td>{item.phone}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.detail_p}</td>
                                                                    <td>{item.create}</td>

                                                                    {/* <td>
                                                                    <th>
                                                                        <td>
                                                                            <button className="btn-primary btn-sm" onClick={(() => paraEditar(item.id_policys))}>Editar</button>

                                                                        </td>

                                                                    </th>

                                                                </td> */}
                                                                </tr>
                                                            )
                                                        }



                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}>Mensajes De hoy</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>





                                   


                                    <div className="com-12">
                                        <div class="table-responsive-sm">
                                            <div className="ra">

                                                <table class="table table-secundary table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#id poliza</th>
                                                            <td>Numero real de la poliza</td>
                                                            <td>Nombre completo del cliente</td>

                                                            <td>teléfono</td>
                                                            <td>Email</td>
                                                            <td>Detalle de la poliza</td>
                                                            <td>Fecha de Creación</td>



                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {

                                                            datafiltradafechaPolicity.map((item, index) =>



                                                                <tr key={item.id_policys}>

                                                                    <th scope="row"
                                                                    // onClick={(() => filtrarr(item.id_policys))}
                                                                    >{item.id_policys}

                                                                        {/* <SearchIcon type="button" onClick={handleClickOpen} /> */}
                                                                    </th>
                                                                    <td>{item.numberreal}</td>
                                                                    <td>{item.usernames} {item.fullname}</td>
                                                                    <td>{item.phone}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.detail_p}</td>
                                                                    <td>{item.create}</td>

                                                                    {/* <td>
                                                                    <th>
                                                                        <td>
                                                                            <button className="btn-primary btn-sm" onClick={(() => paraEditar(item.id_policys))}>Editar</button>

                                                                        </td>

                                                                    </th>

                                                                </td> */}
                                                                </tr>
                                                            )
                                                        }



                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className={classes.heading}>Mensajes Próximos</Typography>

                            </AccordionSummary>
                            <Typography>

                                <div className="com-12">
                                    <div class="table-responsive-sm">
                                        <div className="ra">

                                            <table class="table table-info table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#id poliza</th>
                                                        <td>Numero real de la poliza</td>
                                                        <td>Nombre completo del cliente</td>

                                                        <td>teléfono</td>
                                                        <td>Email</td>
                                                        <td>Detalle de la poliza</td>
                                                        <td>Fecha de Creación</td>



                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        datafiltradafechaPolicityAfter.map((item, index) =>



                                                            <tr key={item.id_policys}>

                                                                <th scope="row"
                                                                // onClick={(() => filtrarr(item.id_policys))}
                                                                >{item.id_policys}

                                                                    {/* <SearchIcon type="button" onClick={handleClickOpen} /> */}
                                                                </th>
                                                                <td>{item.numberreal}</td>
                                                                <td>{item.usernames} {item.fullname}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.detail_p}</td>
                                                                <td>{item.create}</td>

                                                                {/* <td>
                                                                    <th>
                                                                        <td>
                                                                            <button className="btn-primary btn-sm" onClick={(() => paraEditar(item.id_policys))}>Editar</button>

                                                                        </td>

                                                                    </th>

                                                                </td> */}
                                                            </tr>
                                                        )
                                                    }



                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Typography>
                        </Accordion>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default SiderBar
