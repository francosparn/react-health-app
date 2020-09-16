import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

const Form = ({createTurn}) => {

    // Create dating 'States'
    const [ turn, updateTurn ] = useState({
        name: '',
        surname: '',
        date: '',
        hour: '',
        social: '',
        observation: '' 
    });

    const [ error, updateError ] = useState(false);

    const stateUpdate = e => {
        updateTurn({
            ...turn,
            [e.target.name] : e.target.value
        })
    }

    // Extract the values
    const { name, surname, date, hour, social, observation } = turn;

    // When the user submits the form
    const submitTurn = e => {
        e.preventDefault();

            // Validation
            if(!isNaN(name) || name.trim() === '' || !isNaN(surname) || 
                surname.trim() === '' || date.trim() === '' || hour.trim() === '' ||
                observation.trim() === ''){
                updateError(true);
                return;
            }

            if(social !== 'Pública' && social !== 'Privada'){
                updateError(true);
                return;
            }
    
        // Delete previous message
        updateError(false);

        // Assign I
        turn.id = uuidv4();

        // Create the appointment
        swal({
            title: "Cita agregada",
            text: "La cita ha sido agregada correctamente",
            icon: "success",
            button: "Continuar",
          });

        createTurn(turn);

        // Restart the form
        updateTurn({
            name: '',
            surname: '',
            date: '',
            hour: '',
            social: '',
            observation: '' 
        });
    }

    return ( 
        <Fragment>
            <div className="main-title my-3">
                <h2>Crear Cita</h2>
                <hr />
            </div>

            { error ? <p className="alert alert-danger text-center">
                      <img src="img/alert.png" 
                           alt="error"
                      /> Todos los campos del formulario son obligatorios.</p> : null }

            <form 
                className="form"
                onSubmit={submitTurn}
            >
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>Nombre: <span className="required">*</span></label>
                        <input 
                            type="text" 
                            name="name"
                            className="form-control"
                            placeholder="Nombre del paciente"
                            onChange={stateUpdate}
                            value={name}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label>Apellido: <span className="required">*</span></label>
                        <input 
                            type="text" 
                            name="surname"
                            className="form-control"
                            placeholder="Apellido del paciente"
                            onChange={stateUpdate}
                            value={surname}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Fecha: <span className="required">*</span></label>
                    <input 
                        type="date" 
                        name="date"
                        className="form-control"
                        onChange={stateUpdate}
                        value={date}
                    />
                </div>

                <div className="form-group">
                    <label>Hora: <span className="required">*</span></label>
                    <input 
                        type="time" 
                        name="hour"
                        className="form-control"
                        onChange={stateUpdate}
                        value={hour}
                    />
                </div>

                <div className="form-group">
                    <label>Cobertura Médica: <span className="required">*</span></label>
                    <select className="form-control"
                            onChange={stateUpdate}
                            name="social"
                            defaultValue="social">
                        <option defaultValue>Seleccione su cobertura médica</option>
                        <option>Pública</option>
                        <option>Privada</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Observación: <span className="required">*</span></label>
                    <textarea
                        name="observation"
                        className="form-control"
                        onChange={stateUpdate}
                        value={observation}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn button btn-block"
                    onChange={stateUpdate}
                ><img src="img/send.png"
                      alt="Enviar" /> Agregar</button>

            </form>
        </Fragment>
     );
}

Form.propTypes = {
    createTurn: PropTypes.func.isRequired
}
 
export default Form;