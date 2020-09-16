import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Turn from './components/Turn';
import Footer from './components/Footer';
import swal from 'sweetalert';

function App() {

  // Shifts in LocalStorage
  let initialTurns = JSON.parse(localStorage.getItem('turns'));

  if(!initialTurns){
    initialTurns = [];
  }

  // Array of shifts
  const [ turns, saveTurns ] = useState(initialTurns);

  // We use useEffect to do operations when state changes
  useEffect( () => {
    let initialTurns = JSON.parse(localStorage.getItem('turns'));
    
    if(initialTurns){
      localStorage.setItem('turns', JSON.stringify(turns));
    }else{
      localStorage.setItem('turns', JSON.stringify([]));
    }
  }, [turns] );

  // Take current appointments and add new ones
  const createTurn = turn => {
      saveTurns([ ...turns, turn ]);
  }

  // Delete shift by id
  const deleteTurn = id => {
    const newTurns = turns.filter(turn => turn.id !== id);
      swal({
        title: "Cita eliminada",
        text: "La cita ha sido eliminada correctamente",
        icon: "success",
        button: "Continuar",
      });
    saveTurns(newTurns);
  }

  // Conditional message
  const title = turns.length === 0 ? 'No hay citas' : 'Administra tus Citas'

  return (
    <Fragment>

      <Header />
      
      <div className="container">
          <div className="row">
              <div className="col-md-6">
                  <Form 
                    createTurn={createTurn}
                  />
              </div>
              <div className="col-md-6">
                  <h2 className="my-3 text-center">{title}</h2>
                  <hr />
                  {turns.map(turn => (
                    <Turn 
                      key={turn.id}
                      turn={turn}
                      deleteTurn={deleteTurn}
                    />
                  ))}
              </div>
          </div>
      </div>

      <Footer />

    </Fragment>
  );
}

export default App;
