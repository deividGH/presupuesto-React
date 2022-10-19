import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import iconoBotonAgregar from './img/nuevo-gasto.svg'

//lleva llaves porque no es un export default
import { generarId } from './helpers'


function App() {

  const [presupuesto, setPresupuesto] = useState(0)
  const [validacion, setValidacion] = useState(false)
  const [modal, setModal] = useState(false)
  //Hook para la transición css 
  const [animarModal, setAnimarModal] = useState(false)


  const [gastos, setGastos] = useState([])

  const [editarGasto, setEditarGasto] = useState({})

  useEffect(() => {
    if( Object.keys(editarGasto).length >0){
      console.log('entraste a editar un gasto')
      setModal(true)
      
      setTimeout(() => {
        console.log('Tiempito 0.5s')
        setAnimarModal(true)
      }, 500);
    }
      
  }, [editarGasto])
  

  const handleNuevoGasto = ()=>{
    setModal(true)
    setEditarGasto({})
    
    setTimeout(() => {
      console.log('Tiempito 0.5s')
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto =>{
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])

    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos = {gastos}
        presupuesto={presupuesto}
        setPresupuesto = {setPresupuesto}
        validacion ={validacion}
        setValidacion = {setValidacion}
      />

      {validacion && (
        <>
          <main>
            <ListadoGastos 
              gastos = {gastos}
              setEditarGasto ={setEditarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={iconoBotonAgregar}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )} 

      {modal && <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto = {guardarGasto}
                  editarGasto = {editarGasto}
                />}
    </div>
  )

}

export default App
