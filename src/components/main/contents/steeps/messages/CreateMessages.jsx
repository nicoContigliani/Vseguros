import axios from 'axios';
import React, { useState, useEffect } from 'react'

const CreateMessages = () => {
    const [value, setValue] = useState('');
    const [dataTemp, setDataTemp] = useState('');
    const [men, setMen] = useState([]);
    const [emergente, setEmergente] = useState(false)



    const [menn, setMenn] = useState([]);
    const [typp, setTypp] = useState([]);
    const [personalized, setPersonalized] = useState('nc')
    const [si, setSi] = useState(false)


    const [type, setType] = useState('send');
    const [message, setMessage] = useState('mensaje editable versión premium');
    const [id_message, setId_message] = useState('')



    const [id_person, setId_person] = useState()
    const [usernames, setUsernames] = useState()
    const [id_company, setId_company] = useState("")
    const [name, setName] = useState()
    const [id_policy_type, setId_policy] = useState("")
    const [name_policy, setName_policy] = useState("")
    const [datail, setDatail] = useState("")
    const [numberreal, setNumberreal] = useState("")
    const [create, setCreate] = useState("")
    // const [id_message, setId_message] = useState(1)
    // const [type, setType] = useState("algo")
    // const [message, setMessage] = useState("en caso de que no llegue a mensaje")
    const [phone, setPhone] = useState([])
    const [fullname, setFullname] = useState([])
    const [steeps, setSteeps] = useState(8)

    const [pre, setPre] = useState(true)



    useEffect(() => {
        // getData()
        getDataTemp()
        setInterval(() => {
            getData()
        }, 5000);
    }, [])


    const getDataTemp = async () => {
        const resultt = await axios.get(`http://localhost:3500/temp/2`);
        const re = resultt.data[0]
        console.log(re)

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
        setCreate(re.create)
        setSteeps(re.steeps)

    }

    const getData = async () => {


        const result = await axios.get(`http://localhost:3500/message`);
        console.log(result.data)
        // console.log(result.data[0].id_message)
        const x = result.data[0].id_message;
        const y = parseInt(x) + 1;
        setId_message(y)
        setMen(result.data)
        // setId_message(x + 1)
        // console.log(id_message)

        // console.log(men[0].id_message)
        // console.log(result.data[0])
        //  setId_message(men[0].id_message)


        // if (result.data === '' || result.data === "null") {
        //     alert("no tiene elementos")
        // } else {
        //     // alert(result.data[0].id_person)

        // }


    }
    const SelectMensaje = async (e) => {
        e.preventDefault()
        console.log(menn, typp)
        /////////aca va el re envio a temp
        // const enviar = await axios.post(`http://localhost:3500/message`);
        // const x = enviar.status;
        // if (x === 200) {
        //     setSi(true)
        // }

        insert()

        insert()

    }


    const crearMens = (e) => {
        e.preventDefault()
        console.log(menn, typp);
        // setType(typp);
        // setMessage(menn)
        insertM();
    }


    const insertM = async () => {

        const resultP = await axios.post(`http://localhost:3500/message/`, {
            type, message, personalized: personalized
        })
        insert()

        insert()
    }


    const insert = async () => {
        const id = 2;
        const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
            id_person, usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message: "1", type, message: "enviado", steeps: 7, phone, fullname
        })
        console.log(resultP.status)
        const x = resultP.status;
        if (x === 200) {
            setEmergente(true)
        }
    }



    return (
        <div>

            {/* < h1 > ¡Hola, reacciona con el almacenamiento local ! </ h1 > */}


            {

                pre ? (


                    <div>
                        <h1>Mensajes</h1>
                        <h5>El mensaje que envia es: ¡Su poliza esta pronto a Vencer!</h5>


                        <br />
                        <span>precione el botón para confirmar <br /> </span>
                        <div className="btn btn-primary" onClick={insert}>si </div>
                    </div>







                ) : (




                    <div className="row">

                        {
                            si ? (<div class="alert alert-success" role="alert">
                                <h4 class="alert-heading">Se Seleccionado  el mensaje con Exito!</h4>

                                <hr />

                            </div>) : ("")
                        }
                        <div className="col-6">
                            <h4>Mensaje
                            </h4>
                            <form onSubmit={SelectMensaje}>
                                <select class="form-select" aria-label="Default select example"
                                    onChange={(event) => setMenn(event.target.value)}
                                ><option>Mensajes </option>
                                    {
                                        men.map((item, index) =>
                                            <option key={index} value={item.message} > {item.message} </option>

                                        )
                                    }
                                </select>


                                <select class="form-select" aria-label="Default select example"
                                    onChange={(event) => setTypp(event.target.value)}
                                ><option>Tipo </option>
                                    {
                                        men.map((item, index) =>
                                            <option key={index} value={item.type} > {item.type}</option>

                                        )
                                    }
                                </select>


                                <div class="d-grid gap-2">
                                    <button type="submit" className=" btn btn-primary sm-block">Seleccionar</button>
                                </div>
                            </form>

                        </div>
                        <div className="col-6">

                            <h4>Crear Mensaje</h4>
                            <form onSubmit={crearMens}>

                                {/* <label >Compañia</label> */}
                                <input name="message" type="text" class="form-control" placeholder="crear Mensaje" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <input name="type" type="text" class="form-control" placeholder="crear el Tipo " aria-label="Recipient's username" aria-describedby="basic-addon2"
                                    onChange={(e) => setType(e.target.value)}
                                />


                                <button type="submit" class="btn btn-primary btn-sm">Crear</button>
                            </form><br /><br />
                        </div>
                    </div>
                )
            }


            {
                emergente ? (

                    <div class="alert alert-primary btn-outline-secondary alert-dismissible fade show" role="alert">
                        <strong>Mensaje de la poliza virtual  ingresados</strong> presione siguiente para pasar a la próxima pantalla.

                    </div>

                ) : ("")
            }
        </div >
    )
}

export default CreateMessages
