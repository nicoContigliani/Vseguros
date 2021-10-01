import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { detailed } from 'yargs-parser'
import { Details } from '@material-ui/icons'

const CreateInsurance = () => {
    const [emergente, setEmergente] = useState(false)


    const [si, setSi] = useState(false)

    const [cre, setCre] = useState("false");
    const [se, setSe] = useState("false");
    const [filtv, setFiltv] = useState("false")
    const [getD, setGetD] = useState([])
    const [filt, setFilt] = useState([])
    const [me, setMe] = useState("false")

    const [temp, setTemp] = useState([])
    const [comp, setComp] = useState([])
    const [cathCompanyC, setCathCompanyC] = useState("")



    const [onchanePolicyTypes, setOnchanePolicyType] = useState({
        id_policy_type: "1",
        name_policy: "",
        detail_pt: ""
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
    const getDataTemp = async () => {
        const resultt = await axios.get(`http://localhost:3500/temp/2`);
        const re = resultt.data[0]
        setTemp(re)


        console.log("***************************************************************************")
        console.log(re)
        console.log("***************************************************************************")
    }

    const getDataPolicyType = async () => {
        const resultt = await axios.get(`http://localhost:3500/policysType/`);

        setOnchanePolicyType({
            ...onchanePolicyTypes,
            id_policy_type: resultt.data[0].id_policy_type + 1
        })


    }





    useEffect(() => {
        getDataTemp()
        getDataPolicyType()
    }, [])





    const onchanePolicyType = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setOnchanePolicyType({
            ...onchanePolicyTypes,
            [e.target.name]: e.target.value
        })
        console.log(onchanePolicyTypes)
    }



    const insertTypeInsurance = async (e) => {
        e.preventDefault();
        const {
            id_policy_type,
            name_policy,
            detail_pt
        } = onchanePolicyTypes
        console.log(onchanePolicyTypes.id_policy_type)
        try {

            const resultP = await axios.post(`http://localhost:3500/policysType/`, {
                name_policy, detail_pt
            })
            if (resultP.status) {

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
                    id_person, usernames, id_company, name, id_policy_type: onchanePolicyTypes.id_policy_type, name_policy: onchanePolicyTypes.name_policy, datail: onchanePolicyTypes.detail_pt, numberreal, create, id_message, type, message, steeps, phone, fullname
                })
                if (resultP.status === 200) {
                    setEmergente(true)
                }



            }


        } catch (error) {
            console.log(error)

        }

    }


    return (
        <div>
            <div>
                <div>
                    <h3>
                        Polizas
                    </h3>
                    <hr />
                    {/* <input type="text" class="form-control" placeholder="Nombre" /><br /> */}
                    <form onSubmit={insertTypeInsurance}>

                        <div class="input-group">

                            <span class="input-group-text" id="">Poliza y Detalle de Poliza </span>
                        </div>
                        <input name="name_policy" minlength="1" required type="text" class="form-control" placeholder="Nombre: vehiculos, Bicicletas, electrodomesticos, personal... " onChange={onchanePolicyType}
                            defaultValue={onchanePolicyTypes.name_policy}
                        />
                        <input name="detail_pt" minlength="1" required type="text" class="form-control" placeholder="Detalle:número de patente,codigo mac.." onChange={onchanePolicyType}
                            defaultValue={onchanePolicyTypes.detail_pt}
                        />
                        <br />
                        <br />
                        {
                            si ?
                                (
                                    ""
                                ) :

                                (<div class="d-grid gap-2">
                                    <button class="btn btn-primary btn-sm" type="submit">Button</button>
                                </div>
                                )
                        }

                    </form>
                </div>
            </div>
            {
                emergente ? (

                    <div class="alert alert-primary btn-outline-secondary alert-dismissible fade show" role="alert">
                        <strong>Detalles de Poliza ingresados</strong> presione siguiente para pasar a la próxima pantalla.

                    </div>

                ) : ("")
            }
        </div>
    )
}

export default CreateInsurance
