import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

// import DatePicker from 'react-date-picker';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));




const CreateMaturities = () => {
    const classes = useStyles();

    const [fecha, setFecha] = useState("")

    const [value, updateValue] = useState(new Date());

    const onChange = (date) => {
        updateValue(date);
    }



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
  
    useEffect(() => {
      update()
  
    }, [])
  
    const update = () => {
      const hoy = new Date()
      console.log(hoy)
  
  
      const x = hoy.getDate() + '-' + ((hoy.getMonth()) + 1) + '-' + hoy.getFullYear();
  
      setDatas({ create: x })
    }
  
  
    const updateData = async (e) => {
      e.preventDefault();
      console.log(datas.create)
      console.log(datas)
  
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
        id_person, usernames, id_company, name, id_policy_type, name_policy, datail, numberreal, create:datas.create, id_message, type, message, steeps, phone, fullname
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
 <br />
      <h4>Ingrese fecha de Creación</h4>
      <form onSubmit={updateData}>

        <input name="create" type="date" class="form-control" placeholder={`ingrese fecha de creación ej: ${datas}`} aria-label="ingrese fecha de creación" aria-describedby="basic-addon2"
          onChange={onchangeData}
          defaultValue={datas.create}
        />



        <button type="submit" class="btn btn-primary btn-sm">Crear</button>
      </form><br /><br />

      {
           emergente ? (

            <div class="alert alert-primary btn-outline-secondary alert-dismissible fade show" role="alert">
                <strong>Fecha de la poliza virtual  ingresados</strong> presione siguiente para pasar a la próxima pantalla.

            </div>

        ) : ("")
}



        </div>
    )
}

export default CreateMaturities
