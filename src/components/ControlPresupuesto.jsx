import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  presupuesto,
  setGastos,
  setPresupuesto,
  setValidacion
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    console.log(totalGastado);
    setGastado(totalGastado);

    //Calculando lo disponible
    const totalDisponible = presupuesto - totalGastado;
    setDisponible(totalDisponible);

    //calculando porcentaje para la gráfica
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 700);
  }, [gastos]);

  const formatearCantidad = (c) => {
    return c.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const resetearApp = () => {
    const decision = confirm('¿Desea resetear la app?')

    if(decision){
        setGastos([])
        setPresupuesto(0)
        setValidacion(false)
    }else{

    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={resetearApp}>
            Resetear app
        </button>
        <p>
          <span>Presupuesto:</span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
