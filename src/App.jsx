import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Filtro from "./components/Filtro";
import ListadoGastos from "./components/ListadoGastos";
import iconoBotonAgregar from "./img/nuevo-gasto.svg";

//lleva llaves porque no es un export default
import { generarId } from "./helpers";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem('presupuesto') ?? 0
  );
  const [validacion, setValidacion] = useState(false);
  const [modal, setModal] = useState(false);
  //Hook para la transición css
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [editarGasto, setEditarGasto] = useState({});

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      console.log("entraste a editar un gasto");
      setModal(true);

      setTimeout(() => {
        console.log("Tiempito 0.5s");
        setAnimarModal(true);
      }, 500);
    }
  }, [editarGasto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0){
      setValidacion(true)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  
  

  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({});

    setTimeout(() => {
      console.log("Tiempito 0.5s");
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar con edición
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setEditarGasto({});
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    console.log("Eliminando gasto", id);
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);

    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validacion={validacion}
        setValidacion={setValidacion}
      />

      {validacion && (
        <>
          <main>
            <Filtro
              filtro ={filtro}
              setFiltro ={setFiltro}
            
            />
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={iconoBotonAgregar}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;
