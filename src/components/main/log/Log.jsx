import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";



const Log = () => {

    const [nom, setNomb] = useState()
    const [cl, setCl] = useState()
    const [data, setData] = useState({
        nombre: "",
        clave: ""
    })



    const enviar = (e) => {
        e.preventDefault();
    }

    const handrleInputChange = (e) => {
        e.preventDefault();
        setData(

            {
                ...data,
                [e.value.name]: e.value.name

            }
        )
        alert(data)
    }

    return (
        <div>
            <br /><br />
            <form >

                <div class="input-group mb-3">
                    <input name="nombre" type="busqueda" defaultValue={"simon"} onChange={handrleInputChange} class="form-control" minlength="1" placeholder="busqueda" aria-label="Recipient's username" aria-describedby="button-addon2" required />
                    <input name="clave" type="busqueda" defaultValue={"contigliani"} onChange={handrleInputChange} class="form-control" minlength="1" placeholder="busqueda" aria-label="Recipient's username" aria-describedby="button-addon2" required />

                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Filtrar</button>
                </div>
            </form>

        </div>
    )
}

export default Log
