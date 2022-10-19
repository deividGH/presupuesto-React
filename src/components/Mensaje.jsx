import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    //mezclando una clase fija con una dinámica
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje