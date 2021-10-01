import axios from 'axios'
import React, { useEffect, useState } from 'react'

import ReactPaginate from "react-paginate";







const TablePerson = () => {
    // const [users, setUsers] = useState(JsonData.slice(0, 50));

    const [pageNumber, setPageNumber] = useState(0);
    const [active, setActive] = useState('')
    const [emergente, setEmergente] = useState(false)


    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;


    const [usuarios, setUsuarios] = useState([])
    const [editar, setEditar] = useState(true)
    const [ids, setIds] = useState()
    const [busqueda, setBusqueda] = useState("")
    const [filtro, setFiltro] = useState("")
    const [n, setN] = useState("")
    const [borrar, setBorrar] = useState([])

    const [count, setCount] = useState()


    const [todo, setTodo] = useState()


    const [person, setPerson] = useState({
        id_person: "",
        usernames: "guanicode",
        fullname: "1",
        email: "guanicode@gmail.com",
        phone: "5492612444106",
        address: "where",
        password: "1",
        detail: "n",
        active: "true",
        id_agents: '1',
        id_clients: '1',
        id_policy: '1',
        passport: '1'
    })

    useEffect(() => {
        getData();
    }, [])



    const getData = async () => {
        const result = await axios.get(`http://localhost:3500/user/`);
        const x = result.data
        console.log(x)
        filtroUsuarioDesafectados(x)
    }

    const filtroUsuarioDesafectados = (x) => {
        console.log(x)
        const fi = x.filter(item => item.active === "true"

        )
        console.log(fi)
        setUsuarios(fi)
        setCount(usuarios.length)
    }

    const handleOnChange = () => {
        setActive(!active);
        alert("en caso de equivocarse en no dejar marcado la casilla y desea recuperar luego counicarse con 2612444106")
    };



    const filtrar = (e) => {
        e.preventDefault()
        // getData()
        console.log(usuarios)
        if (usuarios === '' || usuarios === 'Null') {
            alert('las busquedas no pueden ser sin contenido')
        } else {

            const fi = usuarios.filter(item => item.usernames === busqueda
                || item.id_person === parseInt(busqueda)
                || item.fullname === busqueda
                || item.email === busqueda
                || item.phone === busqueda
            )
            console.log(fi)
            setUsuarios(fi)
        }

    }


    const editarr = (id) => {
        // alert(id)
        // setEditar(false)
        setIds(id)
        editarUsuario(id)
    }





    const editarUsuario = async (id) => {
        try {
            const result = await axios.get(`http://localhost:3500/user/${id}`)
            const x = result.data[0];
            console.log(x)
            setPerson(x)
            setActive(x.active)
            setEditar(false)
            // console.log(`${id}   usernames: ${usernames}, fullname: ${fullname}, email: ${email}, phone: ${phone}, address:${address}, password: ${password}, detail: ${detail}, active: ${active}, id_agents: ${id_agents}, id_clients: ${id_clients}, id_policy: ${id_policy}, passport: ${passport}
            // `)
        } catch (error) {
            console.log(error)
        }

    }




    const onchengeUser = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        })

    }
    const saveUSer = async (e) => {
        e.preventDefault()
        console.log(person)
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
        } = person;


        try {

            const enviar = await axios.post(`http://localhost:3500/user/${id_person}`, {
                usernames, fullname, email, phone, address, password, detail, active: active, id_agents: 1, id_clients: 1, id_policy, passport
            }
            );
            if (enviar.status === 200) {
                setEmergente(true)

                setTimeout(() => {
                    getData()
                    setEditar(true)
                    setEmergente(false)

                }, 3000);

            }

        } catch (error) {
            console.log(error)
        }


        //   try {
        //     const enviar = await axios.post(`http://localhost:3500/user/${ids.id}`, {
        //         usernames: person.usernames, fullname: person.fullname, email: person.email, phone: person.phone, address: person.address, password: person.password, detail: person.detail, active: active.active, id_agents: 1, id_clients: 1, id_policy: person.id_policy, passport: person.passport
        //     }

        //     );

        //     console.log("enviado")
        //     console.log(enviar.data)
        //     console.log(enviar.status)

        //     if (enviar.status === 200) {
        //         //    if (usernames==='undefined' && fullname==='undefined'&&  email==='undefined' && phone==='undefined' &&  address==='undefined' && password==='undefined' && detail==='undefined'&& active==='undefined'&& passport ==='undefined'
        //         //    ){
        //         //        alert("no hay nulos");
        //         //    }else{
        //         //        alert("si hay nulos");
        //         //    }

        //         setEditar(true)

        //     }

        //     // window.location.reload();

        // } catch (error) {
        //     console.log(error)

        // }



    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    const displayUsers =

        <div>
            {

                editar ? (
                    <div className="container">
                        <h5>Tabla Cliente</h5>
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
                                                    <th scope="col">#</th>
                                                    <th scope="col">Usuario</th>
                                                    <th scope="col">Apellido </th>
                                                    <th scope="col">DNI</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Teléfono</th>
                                                    <th scope="col">Direccion</th>
                                                    <th scope="col">Detalle</th>
                                                    {/* <th scope="col">Estado</th> */}
                                                    {/* <th scope="col">Agente</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Poliza</th> */}
                                                    <th scope="col">Acción</th>



                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    usuarios.slice(pagesVisited, pagesVisited + usersPerPage).map((item, index) =>
                                                        <tr key={index}>
                                                            <th scope="row">{item.id_person}
                                                            </th>
                                                            <td>{item.usernames}</td>
                                                            <td>{item.fullname}</td>
                                                            <td>{item.passport}</td>

                                                            <td>{item.email}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.detail}</td>
                                                            {/* <td>{item.active}</td> */}
                                                            {/* <td>{item.id_agents}</td>
                                               <td>{item.id_clients}</td>
                                              <td>{item.id_policy}</td> */}
                                                            {/* <td>
                                               <th>
                                                  <td>
                                                    <button className="btn-primary btn-sm" onClick={(() => editarr(item.id_person))}>Editar</button>

                                                  </td>
                                                  <td>
                                                    <button className="btn-danger btn-sm" onClick={() => borrar(item.id_person)}> Borrar</button>

                                                  </td>
                                                </th>
                                            
                                            </td> */}

                                                            <td>
                                                                <th>
                                                                    <td>
                                                                        <button className="btn-primary btn-sm" onClick={(() => editarr(item.id_person))}>Editar</button>

                                                                    </td>
                                                                    {/* <td>
                                                    <button className="btn-danger btn-sm" onClick={() => borrar(item.id_person)}> Borrar</button>

                                                  </td> */}
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
                    // (<EditarCliente ids={ids} />)

                    (


                        <div >
                            <div className="container">



                                <h5>
                                    Formulario Para Usuarios Editar
                                </h5>
                                <form onSubmit={saveUSer}>

                                    <div className="row">

                                        <div className="col-sm-6">



                                            <div>

                                                <label >usuario</label>

                                                <input name="usernames"
                                                    type="text"
                                                    className="form-control mb-2"
                                                    aria-label="Recipient's username"
                                                    onChange={onchengeUser}
                                                    defaultValue={person.usernames}
                                                />



                                            </div>
                                            <br />

                                            <div>
                                                <label >Apellido</label>
                                                <input name="fullname" type="text" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                    onChange={onchengeUser}
                                                    defaultValue={person.fullname}
                                                />

                                            </div>
                                            <br />

                                            <div>
                                                <label >DNI</label>
                                                <input name="passport" type="text" class="form-control" placeholder={person.passport} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                    onChange={onchengeUser}
                                                    defaultValue={person.passport}
                                                />

                                            </div>
                                            <br />

                                            <div>
                                                <label >Email</label>
                                                <input name="email" type="text" class="form-control" placeholder={person.email} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                    onChange={onchengeUser}
                                                    defaultValue={person.email}
                                                />

                                            </div>
                                            <br />

                                            <br />
                                        </div>
                                        <div className="col-sm-6">

                                            <div>
                                                <label >Teléfono</label>
                                                <input name="phone" type="text" class="form-control" placeholder={person.phone} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                    onChange={onchengeUser}
                                                    defaultValue={person.phone}
                                                />

                                            </div>
                                            <br />

                                            <div>
                                                <label >Direccion</label>
                                                <input name="address" type="text" class="form-control" placeholder={person.address} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                    onChange={onchengeUser}
                                                    defaultValue={person.address}
                                                />

                                            </div>
                                            <br />
                                            <div>
                                                <label >Estado </label>(es equivalente a eliminar si lo deja sin marcar)
                                                {/* <input name="active" type="text" class="form-control" placeholder={todo.active} aria-label="Recipient's username" aria-describedby="basic-addon2"
            onChange={(event) => setActive(event.target.value)}
            defaultValue={todo.active}
        /> */}

                                                <div className="form-group form-check">
                                                    {/* <input name="active" type="checkbox" checked={todo.active} defaultValue={todo.active} id="active" onChange={(event) => setActive(event.target.value)} /> */}
                                                    {/* <input onClick={handleClick} checked={checked} type="checkbox" /> */}
                                                    {/* <label for="acceptTerms" className="form-check-label">Active defaultValue={todo.active}</label> */}

                                                    <input
                                                        type="checkbox"
                                                        id="active"
                                                        name="active"
                                                        // value="Paneer"
                                                        defaultValue={person.active}
                                                        checked={active}
                                                        onChange={handleOnChange}
                                                    />
                                                    Activo - -
                                                    <br />
                                                    <input
                                                        type="checkbox"
                                                        id="active"
                                                        name="active"
                                                        // value="Paneer"
                                                        defaultValue={person.active}
                                                        checked={!active}
                                                        onChange={handleOnChange}
                                                    />  Desactivado - -
                                                    <br />

                                                    {active ? "(activo)" : "borrado"}.
                                                </div>

                                                {/* <div className="result">
            Above checkbox is {active ? "checked" : "un-checked"}.
        </div> */}

                                            </div>
                                            <br />

                                            <div>
                                                <label >Detalle</label>
                                                <input name="detail" type="text" class="form-control" placeholder={person.detail} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                    onChange={onchengeUser}
                                                    defaultValue={person.detail}
                                                />

                                            </div>
                                            <br />

                                            <br />


                                        </div>
                                        {/* <div className="col-sm-4">
    <div>
        <label >Agente</label>
        <input name="id_agents" type="text" class="form-control" placeholder={todo.id_agents} aria-label="Recipient's username" aria-describedby="basic-addon2"
            onChange={(event) => setId_agents(event.target.value)}
        />

    </div>
    <br />

    <div>
        <label >Cliente</label>
        <input name="id_clients" type="text" class="form-control" placeholder={todo.id_clients} aria-label="Recipient's username" aria-describedby="basic-addon2"
            onChange={(event) => setId_clients(event.target.value)}
        />

    </div>
    <br />

    <div>
        <label >id_policy</label>
        <input name="id_policy" type="text" class="form-control" placeholder={todo.id_policy} aria-label="Recipient's username" aria-describedby="basic-addon2"
            onChange={(event) => setId_Policy(event.target.value)}
        />

    </div>
    <br />
    <div>
        <label >Password</label>
        <input name="password" type="text" class="form-control" placeholder={todo.password} aria-label="Recipient's username" aria-describedby="basic-addon2"
            onChange={(event) => setPassword(event.target.value)}
        />

    </div>


</div> */}


                                    </div>
                                    <hr /><hr />
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                    {/* <div className="btn btn-info d-none">  <Tc vivo="false /></div> */}


                                </form>
                                {
                                    emergente ? (

                                        <div class="alert alert-primary btn-outline-secondary alert-dismissible fade show" role="alert">
                                            <strong>Fecha de la poliza virtual  ingresados</strong> presione siguiente para pasar a la próxima pantalla.

                                        </div>

                                    ) : ("")
                                }
                            </div>
                        </div>



                    )










            }
        </div>

        ;





    ////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////







    const pageCount = Math.ceil(usuarios.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <div>

            <div className="App">
                {displayUsers}
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
                {

                    editar ? (
                        <div className="container">
                            <h5>Tabla Cliente</h5>
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
                                                        <th scope="col">#</th>
                                                        <th scope="col">Usuario</th>
                                                        <th scope="col">Nombre completo </th>
                                                        <th scope="col">DNI</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Teléfono</th>
                                                        <th scope="col">Direccion</th>
                                                        <th scope="col">Detalle</th>
                                                   
                                                        <th scope="col">Acción</th>



                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        usuarios.map((item, index) =>
                                                            <tr key={index}>
                                                                <th scope="row">{item.id_person}
                                                                </th>
                                                                <td>{item.usernames}</td>
                                                                <td>{item.fullname}</td>
                                                                <td>{item.passport}</td>

                                                                <td>{item.email}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.address}</td>
                                                                <td>{item.detail}</td>
                                                      

                                                                <td>
                                                                    <th>
                                                                        <td>
                                                                            <button className="btn-primary btn-sm" onClick={(() => editarr(item.id_person))}>Editar</button>

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


                            <div >
                                <div className="container">



                                    <h5>
                                        Formulario Para Usuarios Editar
                                    </h5>
                                    <form onSubmit={GuardareditarUsuario}>

                                        <div className="row">

                                            <div className="col-sm-6">



                                                <div>

                                                    <label >usuario</label>

                                                    <input name="usernames"
                                                        type="text"
                                                        className="form-control mb-2"
                                                        aria-label="Recipient's username"
                                                        onChange={event => setUsernames(event.target.value)}
                                                        defaultValue={todo.usernames}
                                                    />



                                                </div>
                                                <br />

                                                <div>
                                                    <label >Nombre completo</label>
                                                    <input name="fullname" type="text" class="form-control" placeholder={todo.fullname} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                        onChange={(event) => setFullname(event.target.value)}
                                                        defaultValue={todo.fullname}
                                                    />

                                                </div>
                                                <br />

                                                <div>
                                                    <label >DNI</label>
                                                    <input name="passport" type="text" class="form-control" placeholder={todo.passport} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                        onChange={(event) => setPassport(event.target.value)}
                                                        defaultValue={todo.passport}
                                                    />

                                                </div>
                                                <br />

                                                <div>
                                                    <label >Email</label>
                                                    <input name="email" type="text" class="form-control" placeholder={todo.email} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                        onChange={(event) => setEmail(event.target.value)}
                                                        defaultValue={todo.email}
                                                    />

                                                </div>
                                                <br />

                                                <br />
                                            </div>
                                            <div className="col-sm-6">

                                                <div>
                                                    <label >Teléfono</label>
                                                    <input name="phone" type="text" class="form-control" placeholder={todo.phone} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                        onChange={(event) => setPhone(event.target.value)}
                                                        defaultValue={todo.phone}
                                                    />

                                                </div>
                                                <br />

                                                <div>
                                                    <label >Direccion</label>
                                                    <input name="address" type="text" class="form-control" placeholder={todo.address} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                        onChange={(event) => setAddress(event.target.value)}
                                                        defaultValue={todo.address}
                                                    />

                                                </div>
                                                <br />
                                                <div>
                                                    <label >Estado </label>(es equivalente a eliminar si lo deja sin marcar)
                   

                                                    <div className="form-group form-check">
                                                
                                                        <input
                                                            type="checkbox"
                                                            id="active"
                                                            name="active"
                                                            // value="Paneer"
                                                            defaultValue={todo.active}
                                                            checked={active}
                                                            onChange={handleOnChange}
                                                        />
                                                        Activo - -
                                                        <br />
                                                        <input
                                                            type="checkbox"
                                                            id="active"
                                                            name="active"
                                                            // value="Paneer"
                                                            defaultValue={todo.active}
                                                            checked={!active}
                                                            onChange={handleOnChange}
                                                        />  Desactivado - -
                                                        <br />

                                                        {active ? "(activo)" : "borrado"}.
                                                    </div>



                                                </div>
                                                <br />

                                                <div>
                                                    <label >Detalle</label>
                                                    <input name="detail" type="text" class="form-control" placeholder={todo.detail} aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                        onChange={(event) => setDetail(event.target.value)}
                                                        defaultValue={todo.detail}
                                                    />

                                                </div>
                                                <br />

                                                <br />


                                            </div>
                                           


                                        </div>
                                        <hr /><hr />
                                        <button type="submit" class="btn btn-primary">Submit</button>


                                    </form>
                                </div>
                            </div>



                        )


                }
            </div> */}
        </div>
    )
}

export default TablePerson
