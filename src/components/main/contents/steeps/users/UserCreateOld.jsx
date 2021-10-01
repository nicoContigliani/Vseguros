import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';



const UserCreate = () => {
    const [id_person, setId_person] = useState("")
    const [usernames, setUsernames] = useState("n")
    const [fullname, setFullname] = useState("n")
    const [email, setEmail] = useState("n@n")
    const [phone, setPhone] = useState("11")
    const [address, setAddress] = useState("n")
    const [password, setPassword] = useState("1")
    const [detail, setDetail] = useState("n")
    const [active, setActive] = useState("1")
    const [id_agents, setId_agents] = useState("1")
    const [id_clients, setId_clients] = useState("1")
    const [id_policy, setId_Policy] = useState("1")
    const [passport, setPassport] = useState("1")

    const [cre, setCre] = useState(false)
    const [si, setSi] = useState(false)
    const [busqueda, setBusqueda] = useState("nico")
    const [getD, setGetD] = useState('')
    const [filt, setFilt] = useState([])
    const [filtv, setfiltv] = useState(false)




    // const [id_person, setId_peron] = useState()
    // const [usernames, setUsernames] = useState()
    const [id_company, setId_company] = useState()
    const [name, setName] = useState()
    const [id_policy_type, setId_policy] = useState()
    const [name_policy, setName_policy] = useState()
    const [datail, setDatail] = useState()
    const [numberreal, setNumberreal] = useState()
    const [create, setCreate] = useState()
    const [id_message, setId_message] = useState()
    const [type, setType] = useState()
    const [message, setMessage] = useState()
    const [steeps, setSteeps] = useState(2) // para cuando inserte pase al siguiente paso 




    useEffect(async () => {

        getDataUser()

    }, [])
    console.log(id_person)

    const getDataUser = async () => {
        const resultU = await axios.get(`http://localhost:3500/user/`);
        const resMasUno = (resultU.data);

        setGetD(resultU.data)
        const vID = (resMasUno.reverse())
        setId_person(vID[0].id_person)
    }




    const crearUsuairo = async (e) => {
        e.preventDefault()
        try {
            const enviar = await axios.post('http://localhost:3500/user/', {
                usernames: usernames, fullname: fullname, email: email, phone: phone, address: address, password: password, detail: detail, active: active, id_agents: id_agents, id_clients: id_clients, id_policy: id_policy, passport: passport
            }
            )
            const x = enviar.status;
            if (x === 200) {
                setSi(true)
                const n = parseInt(id_person) + 1
                setId_person(n)
            }
        } catch (error) {
            console.log(error)
        }
        console.log("enviado")
        capturarTemp();






    }

    const capturarTemp = async () => {




        const result = await axios.get(`http://localhost:3500/temp/`);
        // console.log(result.data[0])
        if (result.data > 0) {
            console.log("No tiene valores")
        } else {

            const result = await axios.get(`http://localhost:3500/temp/`);
            const id = result.data[0].id_temp;
            console.log("tiene valores", id)

            try {
                const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
                    id_person: id_person, usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps, phone, fullname
                })
                console.log(resultP.data)

                const resultt = await axios.get(`http://localhost:3500/temp/${id}`);
                const xx = resultt.data[0];
                // console.log(xx)
            } catch (error) {
                console.log(error)
            }


        }
    }

    const crearTemp = async (e) => {
        e.preventDefault()

    }

    const busquedas = async (e) => {
        e.preventDefault();
        // console.log(getD) 

        const filtrar = await getD.filter(item => (busqueda === item.usernames || busqueda === item.fullname || busqueda === item.id_person || busqueda === item.email || busqueda === item.phone))
        console.log(filtrar)
        setFilt(filtrar)
        setfiltv(true)

    }


    const pruebaDeId = async (id) => {
        alert(id)

        const resultU = await axios.get(`http://localhost:3500/user/${id}`);
        const x = (resultU.data[0]);

        console.log("*****************************************************")

        console.log(x.usernames)
        console.log("*****************************************************")
        setId_person(x.id_person)
        setUsernames(x.usernames)
        setFullname(x.fullname)
        setEmail(x.email)
        setPhone(x.phone)
        // inSelected()
        try {
            const resultP = await axios.post(`http://localhost:3500/temp/2`, {
                id_person: x.id_person, usernames: x.usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps, phone: x.phone, fullname: x.fullname
            })
            console.log(resultP.data)
        } catch (error) {
            alert(error)
        }

    }



    const capturarU = (i) => {
        const resultado = getD.filter(item => item.id_person === i)
        const x = resultado[0];



        console.log("*******************")
        console.log(x.fullname)
        console.log("*******************")
        setId_person(x.id_person)
        setUsernames(x.usernames)
        setFullname(x.fullname)
        setEmail(x.email)
        setPhone(x.phone)
        prueba()
        prueba()

    }
    const prueba = () => {
        console.log(id_person, usernames, fullname, email, phone)
        capturarTemp()

    }



    return (
        <div>
            <br />
            <button className="btn btn-primary btn-sm mr-1" onClick={() => setCre(true)}>Ir a Crear</button>
            <button className="btn btn-primary btn-sm" onClick={() => setCre(false)}>Ir a Buscar</button>
            {/* <button className="btn btn-primary btn-sm" onClick={prueba}>pruebas</button> */}



            {
                cre ? (

                    <div className="container">







                        <form onSubmit={crearUsuairo}>
                            {
                                si ? (<div class="alert alert-success" role="alert">
                                    <h4 class="alert-heading">Se ha insertado el usuario con exito!</h4>

                                    <hr />

                                </div>) : ("")
                            }

                            <div className="row">
                                <div className="col-sm-6">



                                    <div>

                                        <label >usuario</label>
                                        <input name="usernames" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setUsernames(event.target.value)}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Apellido</label>
                                        <input name="fullname" type="text" class="form-control" placeholder="Apellido" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setFullname(event.target.value)}

                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >DNI</label>
                                        <input name="passport" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setPassport(event.target.value)}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Email</label>
                                        <input name="email" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setEmail(event.target.value)}

                                        />

                                    </div>
                                    <br />

                                    <br />
                                </div>
                                <div className="col-sm-6">

                                    <div>
                                        <label >Teléfono</label>
                                        <input name="phone" type="number" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setPhone(event.target.value)}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Direccion</label>
                                        <input name="address" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setAddress(event.target.value)}
                                        />

                                    </div>
                                    <br />
                                    <div>
                                        <label >Estado</label>
                                        <input name="active" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setActive(event.target.value)}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Detalle</label>
                                        <input name="detail" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            onChange={(event) => setDetail(event.target.value)}
                                        />

                                    </div>
                                    <br />

                                    <br />


                                </div>

                                <div>

                                </div>
                                {
                                    si ?
                                        (
                                            ""
                                        ) :

                                        (<button type="submit" class="btn btn-primary btn-sm btn-block">Enviar</button>
                                        )
                                }


                            </div>
                            <hr /><hr />


                        </form>
                        <button type="submit" class="btn btn-primary btn-sm btn-block" onClick={capturarTemp}>temp</button>
                    </div>
                ) : (
                    <div>
                        Buscar usuario

                        <br />
                        <form onSubmit={busquedas}>
                            <input name="busqueda" type="text" className="form-control" placeholder={`ejemplo de busqueda:${busqueda}`}
                                onChange={(event) => setBusqueda(event.target.value)} />
                            <button type="submit" className="btn btn-primary"> buscar</button>

                        </form>

                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Nombre Completo</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Acción</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filt.map((item) =>

                                            <tr>

                                                <th key={item.id_person}  >{item.id_person} </th>
                                                <td>{item.usernames}  </td>
                                                <td>{item.fullname} </td>
                                                <td>{item.email} </td>
                                                <td>{item.phone}  </td>
                                                <td>{item.address} </td>
                                                <td>
                                                    {/* <button value={item.id_person} onChange={(event) => setId_person(event.target.value)} type="submit" className="btn btn-primary" onClick={capturarU}>Seleccionar</button> */}
                                                    <button value={item.id_person}
                                                        onChange={(event) => setId_person(event.target.value)}
                                                        type="submit" className="btn btn-primary"
                                                        // onClick={() => capturarU(item.id_person)}
                                                        onClick={() => pruebaDeId(item.id_person)}

                                         

                                                    >Seleccionar{item.id_person}</button>





                                                </td>




                                            </tr>
                                        )

                                    }

                                </tbody>
                            </table>
                        </div>




                    </div>

                )




            }
            {/* <TableUser filt={filt} /> */}

        </div>
    )
}

export default UserCreate
