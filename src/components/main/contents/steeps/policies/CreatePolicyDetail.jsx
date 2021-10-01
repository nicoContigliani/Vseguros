import axios from 'axios'
import React, { useState, useEffect } from 'react'

const CreatePolicy = () => {

    const [emergente, setEmergente] = useState(false)
    const [temporality, setTemporality] = useState({

        id_person: "",
        usernames: "",
        id_company: "",
        name: "",
        id_policy_type: "",
        name_policy: "",
        datail: "",
        numberreal: "",
        create: "",
        id_message: "",
        type: "",
        message: "",
        steeps: "",
        phone: "",
        fullname: ""

    })

    const [datas, setDatas] = useState("")

    const updateData = async (e) => {
        e.preventDefault();
        console.log(datas.numberreal)

        const temporal = await axios.get(`http://localhost:3500/temp/2`);
        const temp = temporal.data[0]
        const {
            id_person,
            usernames,
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
            steeps,
            phone,
            fullname
        } = temp;
        console.log(temp)

        const id = 2;
        const resultP = await axios.post(`http://localhost:3500/temp/${id}`, {
            id_person, usernames, id_company, name, id_policy_type, name_policy, datail, numberreal: datas.numberreal, create, id_message, type, message, steeps, phone, fullname
        })
        if (resultP.status === 200) {
            setEmergente(true)
        }


    }


    const onchangeData = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })

    }


    return (
        <div>
            <h5>
                Ingrese el número de poliza real
            </h5>
            <form onSubmit={updateData}>

                <input name="numberreal" minlength="1" required type="text" class="form-control" placeholder={`ingrese numero de poliza`} aria-label="Recipient's username" aria-describedby="basic-addon2"
                    onChange={onchangeData}
                />


                <button type="submit" class="btn btn-primary btn-sm">Crear</button>
            </form><br /><br />

            {
                emergente ? (

                    <div class="alert alert-primary btn-outline-secondary alert-dismissible fade show" role="alert">
                        <strong>Número de la poliza Real  ingresada</strong> presione siguiente para pasar a la próxima pantalla.

                    </div>

                ) : ("")
            }
        </div>
    )
}

export default CreatePolicy
