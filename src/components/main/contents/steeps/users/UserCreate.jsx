import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';



const UserCreate = () => {

    const [configuration, setConfiguration] = useState({
        busqueda: "nico",
        // getD: [],
        // filt: [],
    })
    const [cre, setCre] = useState(false);
    const [si, setSi] = useState(false);
    const [filtv, setFiltv] = useState(false)
    const [getD, setGetD] = useState([])
    const [filt, setFilt] = useState([])
    const [me, setMe] = useState(true);
    const [err, setErr] = useState(false)



    const [datosUser, setDatosUser] = useState({
        id_person: "",
        usernames: "guanicode",
        fullname: "",
        email: "guanicode@gmail.com",
        phone: "5492612444106",
        address: "",
        password: "",
        detail: "n",
        active: "true",
        id_agents: '1',
        id_clients: '1',
        id_policy: '1',
        passport: '1'
    })

    const [datosTemp, setDatosTemp] = useState({
        id_company: "1",
        name: "contigliani",
        id_policy_type: "1",
        name_policy: "",
        datail: "",
        numberreal: "",
        create: "1988-06-03",
        id_message: "1",
        type: "",
        message: "",
        steeps: 2

    })



    useEffect(() => {
        getDataUser();

    }, [])
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
    } = datosUser

    const {
        id_company,
        name,
        id_policy_type,
        name_policy,
        datail,
        numberreal,
        create,
        id_message,
        type,
        message,
        steeps
    } = datosTemp;


    const {
        busqueda,
    } = configuration;



    const getDataUser = async () => {
        const resultU = await axios.get(`http://localhost:3500/user/`);
        setGetD(resultU.data)
        console.log((resultU.data).length)

    }


    const handleInputChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setDatosUser({
            ...datosUser,
            [e.target.name]: e.target.value
        })

    }

    const createUser = (e) => {
        e.preventDefault();
        // console.log(datosUser)
        insertUser()
    }
    const insertUser = async (x) => {
        try {

            const enviar = await axios.post('http://localhost:3500/user/', {
                usernames: usernames, fullname: fullname, email: email, phone: phone, address: address, password: password, detail: detail, active: active, id_agents: id_agents, id_clients: id_clients, id_policy: id_policy, passport: passport
            }
            )
            if (enviar.status === 200) {
                setMe(true)
                setSi(true)
            }
            if (enviar.status === 200) {

                alert("insertado")
                const resultU = await axios.get(`http://localhost:3500/user/`);
                console.log(resultU.data[0])
                const id_person = resultU.data[0].id_person;
                const usernames = resultU.data[0].usernames;
                const phone = resultU.data[0].phone;
                const fullname = resultU.data[0].fullname;

                try {
                    const resultP = await axios.post(`http://localhost:3500/temp/2`, {
                        id_person: id_person, usernames: usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps:2, phone: phone, fullname: fullname
                    })
                    console.log(resultP.data)
                    if (resultP.status === 200) {
                        setMe("true")
                    }
                    if (resultP.status === 400) {
                        setErr("true")
                    }

                } catch (error) {
                    console.lo(error)
                }


            }

        } catch (error) {
            console.log(error)

        }
    }




    const handleInputChangeFind = (e) => {
        e.preventDefault();
        setConfiguration({
            ...configuration,
            [e.target.name]: e.target.value
        })

    }
    const finds = async (e) => {
        e.preventDefault()
        console.log(configuration.busqueda)
        console.log(getD)

        const filtrar = await getD.filter(item => (busqueda === item.usernames || busqueda === item.fullname || busqueda === item.id_person || busqueda === item.email || busqueda === item.phone))

        setFilt(filtrar)
        setFiltv(true)
    }
    const catchU = async (id) => {
        alert(id)
        const resultU = await axios.get(`http://localhost:3500/user/${id}`);
        const x = (resultU.data[0]);
        console.log(x.id_person)

        try {

            const resultP = await axios.post(`http://localhost:3500/temp/2`, {
                id_person: x.id_person, usernames: x.usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps:2, phone: x.phone, fullname: x.fullname
            })
            console.log(resultP.status)
            setMe(false)
            if (resultP.status === 200) {
                setMe(false)
            }
            if (resultP.status === 400) {
                setErr("true")
            }

        } catch (error) {
            console.lo(error)
        }
    }


    const catchTemp = async (x) => {
        const result = await axios.get(`http://localhost:3500/temp/`);
        console.log(result.data[0])


        try {

            const resultP = await axios.post(`http://localhost:3500/temp/2`, {
                id_person: x.id_person, usernames: x.usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create, id_message, type, message, steeps, phone: x.phone, fullname: x.fullname
            })
            console.log(resultP.data)
        } catch (error) {
            alert(error)
        }

    }

    const change = (e) => {
        e.preventDefault()
        setMe(false)
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


                        <form onSubmit={createUser}>


                            <div className="row">
                                <div className="col-sm-6">



                                    <div>

                                        <label >usuario</label>
                                        <input name="usernames" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setUsernames(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.usernames}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Apellido</label>
                                        <input name="fullname" type="text" class="form-control" placeholder="Apellido" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setFullname(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.fullname}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >DNI</label>
                                        <input name="passport" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setPassport(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.passport}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Email</label>
                                        <input name="email" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setEmail(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.email}
                                        />

                                    </div>
                                    <br />

                                    <br />
                                </div>
                                <div className="col-sm-6">

                                    <div>
                                        <label >Teléfono</label>
                                        <input name="phone" type="number" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setPhone(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.phone}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Direccion</label>
                                        <input name="address" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setAddress(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.address}
                                        />

                                    </div>
                                    <br />
                                    <div>
                                        <label >Estado</label>
                                        <input name="active" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setActive(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.active}
                                        />

                                    </div>
                                    <br />

                                    <div>
                                        <label >Detalle</label>
                                        <input name="detail" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            // onChange={(event) => setDetail(event.target.value)}
                                            onChange={handleInputChange}

                                            defaultValue={datosUser.detail}
                                        />

                                    </div>

                                    {/* <button type="submit" class="btn btn-primary btn-sm btn-block">Enviar</button> */}
                                    <br />

                                    <br />


                                </div>

                                <div>

                                </div>
                                {
                                    si ?
                                        (
                                            <div class="alert alert-success" role="alert">
                                                <div className="container">
                                                    ¡Cliente Creado!
                                                </div>
                                            </div>
                                        ) :

                                        (
                                            <button type="submit" class="btn btn-primary btn-sm btn-block" onClick={createUser}>Enviar</button>
                                        )
                                }


                            </div>
                        </form>


                        {/* 
                        {
                            me ? ("") : ("hola")
                        } */}


                        {/* {
                            err ? ("") : ("hola")
                        } */}



                    </div>

                ) : (
                    <div>
                        Buscar usuario

                        <br />
                        <form onSubmit={finds}>
                            <input name="busqueda" type="text" className="form-control" placeholder={`ejemplo de busqueda:${configuration.busqueda}`}
                                // onChange={(event) => setBusqueda(event.target.value)}
                                onChange={handleInputChangeFind}

                                defaultValue={configuration.busqueda}
                            />
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

                                            <tr key={item.id_person}>

                                                <th key={item.id_person}  >{item.id_person} </th>
                                                <td>{item.usernames}  </td>
                                                <td>{item.fullname} </td>
                                                <td>{item.email} </td>
                                                <td>{item.phone}  </td>
                                                <td>{item.address} </td>
                                                <td>
                                                    {/* <button value={item.id_person} onChange={(event) => setId_person(event.target.value)} type="submit" className="btn btn-primary" onClick={capturarU}>Seleccionar</button> */}
                                                    <button value={item.id_person}
                                                        type="submit" className="btn btn-primary"
                                                        onClick={() => catchU(item.id_person)}
                                                        onChange={change}

                                                    >Seleccionar   {item.id_person}</button>

                                                </td>

                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            {
                                me ? (""
                                ) : (

                                    <div class="alert alert-success" role="alert">
                                        <div className="container">
                                            ¡Cliente Seleccionado!
                                        </div>
                                    </div>
                                )
                            }


                            {/* {
                                err ? ("") : ("hola")
                            } */}
                        </div>
                    </div>

                )




            }








        </div>
    )
}

export default UserCreate
