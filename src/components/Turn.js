import React from 'react';
import PropTypes from 'prop-types';

const Turn = ({turn, deleteTurn}) => (
    <div className="card mb-2">
        <div className="card-body">
            <p><img src="img/user.png" 
                    alt="Nombre" /> 
            <b> Nombre</b>: <span>{turn.name}</span>
            </p>

            <p><img src="img/user.png" 
                    alt="Apellido" /> 
            <b> Apellido</b>: <span>{turn.surname}</span>
            </p>

            <p><img src="img/date.png" 
                    alt="Fecha" /> 
            <b> Fecha</b>: <span>{turn.date}</span>
            </p>

            <p><img src="img/hour.png" 
                    alt="Hora" /> 
            <b> Hora</b>: <span>{turn.hour}</span>
            </p>

            <p><img src="img/social.png" 
                    alt="social" /> 
            <b> Obra Social</b>: <span>{turn.social}</span>
            </p>
            
            <p><img src="img/observation.png" 
                    alt="observation" />
            <b> Observación</b>: <span>{turn.observation}</span>
            </p>

            <button
                className="btn btn-danger btn-block"
                onClick={ () => deleteTurn(turn.id) }
            >Eliminar</button>
        </div>
    </div>
);

Turn.propTypes = {
    turn: PropTypes.object.isRequired,
    deleteTurn: PropTypes.func.isRequired
}

export default Turn;