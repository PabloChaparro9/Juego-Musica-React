import { useState } from 'react'
import './App.css'
import { ComponenteDePrueba } from './components/ComponenteDePrueba'
import { listaEscalas } from '../public/data/listaEscalas';

function App() {
  const [intervalos, setIntervalos] = useState([...listaEscalas[0].Intervalos]);
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
const listaCards = intervalos.map(grado=> <Card key={grado} Nota={grado}></Card>);
  return (
    <>
      <ComponenteDePrueba></ComponenteDePrueba>
      <div className='cards'>
        {listaCards}
      </div>
    </>
  )
}

export default App
