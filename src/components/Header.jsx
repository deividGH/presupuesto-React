import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
  presupuesto,
  setPresupuesto,
  validacion,
  setValidacion,
  gastos,
  setGastos
}) => {
  return (

    <header>
      <h1>Planificador de gastos</h1>
      {validacion ? <ControlPresupuesto
                        gastos = {gastos}
                        setGastos={setGastos}
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setValidacion={setValidacion}
                    /> 
      : <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto = {setPresupuesto}
            setValidacion = {setValidacion}
        />}
        
       
    </header>
    
  )
}

export default Header