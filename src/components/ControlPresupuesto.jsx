import {useState, useEffect} from 'react'
import {CircularProgressbar} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, presupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0 )

        console.log(totalGastado)
        setGastado(totalGastado)

        //Calculando lo disponible
        const totalDisponible = presupuesto - totalGastado
        setDisponible(totalDisponible)

        //calculando porcentaje para la gráfica
        const nuevoPorcentaje = (( (presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);
        

    }, [gastos])
    
     

    const formatearCantidad = (c) =>{
        return c.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar

                    value={porcentaje}
                
                />
            </div>

            <div className='contenido-presupuesto'>
                <p>
                    <span>
                        Presupuesto: 
                    </span>
                    {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>
                        Disponible: 
                    </span>
                    {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>
                        Gastado: 
                    </span>
                    {formatearCantidad(gastado)}
                </p>

            </div>
        </div>
  )
}

export default ControlPresupuesto