import { useState, useEffect } from 'react'
import BotonCerrar from '../img/cerrar.svg'


const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, editarGasto}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')

    useEffect(() => {
        if( Object.keys(editarGasto).length >0){
            setNombre(editarGasto.nombre)
            setCantidad(editarGasto.cantidad)
            setCategoria(editarGasto.categoria)
        }
    }, [])
    

    const ocultarModal =()=>{
        
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e =>{
        e.preventDefault()

        guardarGasto({nombre, cantidad, categoria})
    }

    return (

        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={BotonCerrar} alt="cerrar modal" onClick={ocultarModal} />
            </div>

            <form
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                onSubmit= {handleSubmit}
            >
                <legend>{editarGasto.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre"
                        type="text"
                        placeholder='Añade el nombre del gasto' 
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id="cantidad"
                        type="number"
                        placeholder='Añade la cantidad del gasto'
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}
                        required
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>

                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                    <input type="submit" value={editarGasto.nombre ? 'Guardar cambios' : 'Añadir nuevo gasto'} />
                   
                </div>
            </form>
            
        </div>
    )
}

export default Modal