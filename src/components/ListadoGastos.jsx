import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setEditarGasto, eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? 'Gastos' : 'Aún no hay gastos creados'}</h2>

        {gastos.map( gasto =>(
            <Gasto
              key = {gasto.id}
              gasto= {gasto}
              setEditarGasto = {setEditarGasto}
              eliminarGasto={eliminarGasto}
            />
        ))}
    </div>
  )
}

export default ListadoGastos