import React, { useState, useEffect } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


const CreateFinish = () => {
    const [value, setValue] = useState('');
    const [dataTemp, setDataTemp] = useState('');
    const [men, setMen] = useState([]);

    const [menn, setMenn] = useState([]);
    const [typp, setTypp] = useState([]);
    const [personalized, setPersonalized] = useState('nc')
    const [si, setSi] = useState(false)
    const [pre, setPre] = useState(false)
    const [change, setChange] = useState(true)




    const [id_person, setId_person] = useState("")

    const [usernames, setUsernames] = useState("n")
    const [fullname, setFullname] = useState("n")
    const [email, setEmail] = useState("n@n")
    const [phone, setPhone] = useState("11")


    const [id_company, setId_company] = useState("")
    const [name, setName] = useState()
    const [id_policy_type, setId_policy] = useState("")
    const [name_policy, setName_policy] = useState("")
    const [datail, setDatail] = useState("")
    const [numberreal, setNumberreal] = useState("")
    const [create, setCreate] = useState("")

    const [id_message, setId_message] = useState('')
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');


    const [steeps, setSteeps] = useState(8)


    // const [id_persons,setId_perons]=useState("")  
    // const [usernamess, setNamess]=useState("")  
    // const [id_companyss,setId_companyss]=useState("")  
    // const  [names, setNames]=useState("")  
    // const  [id_policy_types, setId_policy_types]=useState("")  
    // const  [name_policys, setName_policys]=useState("")  
    // const  [datails, setDatails]=useState("")  
    // const  [numberreals, setNumberreals]=useState("")  
    // const  [creates, setCreates]=useState("")  
    // const  [id_messages, setId_messages]=useState("")  
    // const  [types, setTypes]=useState("")  
    // const  [messages, setMessages]=useState("")  
    // const  [steepss, setSteepss]=useState("")  
    // const  [phones, setPhones]=useState("")  
    // const  [fullnames,setFullnames]=useState("")  




    useEffect(() => {
        getDataTemp()

    }, [])



    //UPDATE public."temp" SET id_temp=2, id_person=0, usernames='', id_company=0, "name"='sancor', id_policy_type=0, name_policy='', datail=' ', numberreal='', "create"='06-03-1988', id_message=0, "type"='', message='', steeps=1, phone='', fullname='';




    const getDataTemp = async () => {
        const resultt = await axios.get(`http://localhost:3500/temp/2`);
        const re = resultt.data[0]

        // console.log(re)

        setId_person(re.id_person);
        setUsernames(re.usernames);
        setFullname(re.fullname);
        setPhone(re.phone);
        setId_company(re.id_company);
        setName(re.name);
        setId_policy(re.id_policy_type);
        setName_policy(re.name_policy);
        setDatail(re.datail);
        setNumberreal(re.numberreal);
        setCreate(re.create);
        setId_message(re.id_message);
        setType(re.type);
        setMessage(re.message);
        setSteeps(re.steeps)
        // console.log("************************desde temp*******************************************")
        console.log(id_person, usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps, phone, fullname)



    }


    const addCount = async () => {

        try {
            const d = new Date();
            const n = d.getMonth();
            const valor = parseInt(n) - 1;
            const po = await axios.get(`http://localhost:3500/policys/`);
            const resultante = po.data[0].id_policys




            const resultP = await axios.post(`http://localhost:3500/contador/`, {
                contador: valor,
                id_policys: resultante,
                contadorc: valor
            })

            const x = resultP.status;
            if (x === 200) {
                setSi(true)
                getDataTemp()
                console.log("contador ha insertado");
            }


        } catch (error) {
            console.log(error)
        }
    }


    const mismoU = async () => {

        try {
            alert("M")
            const id = parseInt(2);
            const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
                id_person, usernames, id_company: 0, name: "", id_policy_type: 0, name_policy: "", datail: "", numberreal: "", create: "06-03-1988", id_message: 0, type: "", message: "", steeps: 2, phone, fullname
            })

            const x = resultP.status;
            if (x === 200) {
                setSi(true)
                getDataTemp()
            }


        } catch (error) {
            console.log(error)
        }
    }

    const distintoU = async () => {

        try {
            alert("D")
            const id = parseInt(2);
            const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
                id_person: 0, usernames: "", id_company: 0, name: "", id_policy_type: 0, name_policy: "", datail: "", numberreal: "", create: "06-03-1988", id_message: 0, type: "", message: "", steeps: 1, phone: "", fullname: ""
            })
            //UPDATE public."temp" SET id_temp=2, id_person=0, usernames='', id_company=0, "name"='sancor', id_policy_type=0, name_policy='', datail='', numberreal='', "create"='06-03-1988', id_message=0, "type"='', message='', steeps=1, phone='', fullname='';

            const x = resultP.status;
            if (x === 200) {
                setSi(true)
                getDataTemp()
            }
        } catch (error) {
            console.log(error)
        }


    }

    const salir = async () => {
        try {
            // alert("S")
            addCount()
            const id = parseInt(2);
            const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
                id_person: 0, usernames: "", id_company: 0, name: "", id_policy_type: 0, name_policy: "", datail: "", numberreal: "", create: "06-03-1988", id_message: 0, type: "", message: "", steeps: 1, phone: "", fullname: ""
            })
            const x = resultP.status;
            if (x === 200) {
                setSi(true)
            }

        } catch (error) {
            console.log(error)
        }
        window.location.reload();
    }

    const update = async (e) => {
        // alert("hola")
        e.preventDefault();
        const resultP = await axios.post(`http://localhost:3500/policys/`, {
            id_person: 0, usernames: "", id_company: 0, name: "", id_policy_type: 0, name_policy: "", datail: "", numberreal: "", create: "06-03-1988", id_message: 0, type: "", message: "", steeps: 1, phone: "", fullname: ""
        })
        const x = resultP.status;
        if (x === 200) {
            setChange(false)
        }
    }

    // const insertTemp = async () => {


    //     try {
    //         const id = parseInt(2);
    //         const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
    //             id_person, usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps, phone, fullname
    //         })
    //         console.log(resultP.status)

    //     } catch (error) {
    //         console.log(error)

    //     }
    //     getDataTemp()
    // }


    return (
        <div>

            {
                change ? (
                    <div>

                        <h1>¿Usted desea insertar los cambios en la tabla poliza?</h1>

                        <button className="btn-outline-primary btn-lg" onClick={update}>si</button>
                        <br /><br />


                        <CircularProgress disableShrink fontSize="large" />

                    </div>


                ) : (
                    <div>
                        <h1>Se ha creado la Poliza  </h1>
                        <div className="btn btn-outline-danger" onClick={salir}><PersonAddDisabledIcon></PersonAddDisabledIcon>Finalizar</div>

                    </div>)
            }





            {




                si ? (<div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Perfecto!</h4>

                    <hr />

                </div>) : ("")
            }


            {/* <span>versión premium con mas opciones</span> */}
            <hr />
            {
                pre ? (
                    <div>
                        <label htmlFor="">Desea agregar una nueva Poliza con el mismo usuario ?</label><br />
                        <div className="btn btn-primary mr-1" onClick={mismoU}><PersonAddIcon></PersonAddIcon> Agregar con el mismo usuario</div>
                        <div className="btn btn-outline-primary mr-1" onClick={distintoU}><PersonAddIcon></PersonAddIcon> Crear con otro usuario</div>

                    </div>
                ) : ("")
            }

            {/* <div className="btn btn-outline-danger" onClick={salir}><PersonAddDisabledIcon></PersonAddDisabledIcon>Finalizar</div> */}


        </div>




    )
}

export default CreateFinish
