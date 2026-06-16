import { useState } from 'react'
import './App.css'
import { ComponenteDePrueba } from './components/ComponenteDePrueba'
import { listaEscalas } from '../public/data/listaEscalas';

function App() {
  const [intervalos, setIntervalos] = useState({...listaEscalas[Math.floor(Math.random()*(0 - 14)+14)]});
  const cambiarEscala = () => {
    const varAux = Math.floor(Math.random()*(0 - 14)+14)
    setIntervalos({...listaEscalas[varAux]});
  }
  const Card = ({Nota}) =>{
    const [texto, setTexto] = useState(Nota);
    return (
      <>
        <div>
          <h1>{texto}</h1>
          <div>
            <button onClick={()=>{setTexto(Nota)}}>
              {Nota}
            </button>
            <button onClick={()=>{setTexto(Nota+'#')}}>
              {Nota}#
            </button>
          </div>
        </div>
      </>
    )
  };
const listaCards = intervalos.Intervalos.map(grado=> <Card key={grado} Nota={grado}></Card>);
  return (
    <>
      <ComponenteDePrueba Nombre={intervalos.Nombre}></ComponenteDePrueba>
      <div className='cards'>
        {listaCards}
      </div>
      <button onClick={cambiarEscala}>Cambiar Escala</button>
    </>
  )
}

export default App
