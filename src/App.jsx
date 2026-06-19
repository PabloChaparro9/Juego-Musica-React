import { useState } from 'react'
import './App.css'
import { ComponenteDePrueba } from './components/ComponenteDePrueba'
import { listaEscalas } from '../public/data/listaEscalas';

function App() {
  const [dataescala, setDataescala] = useState({...listaEscalas[Math.floor(Math.random()*(0 - 14)+14)]});
  const [intervalos, setIntervalos] = useState([...dataescala.Intervalos]);
  const cambiarEscala = () => {
    const NotasAcordesValue = document.getElementById('notasAcordes').value;
    const varAux = Math.floor(Math.random()*(0 - 14)+14)
    if(listaEscalas[varAux].Tipo == document.getElementById('tipoEscala').value && listaEscalas[varAux].Nombre != listaEscalas.Nombre){
      setDataescala({...listaEscalas[varAux]});
      if(NotasAcordesValue == 'Notas'){
        console.log(NotasAcordesValue)
        setIntervalos(dataescala.Intervalos);
      }else{
        console.log(NotasAcordesValue)
        setIntervalos(dataescala.Acordes);
      }
    }else{
      cambiarEscala();
    }
  }
  const definirNota = (a, b)=>{
    const NotasAcordesValue = document.getElementById('notasAcordes').value;
    if(NotasAcordesValue == 'Notas'){
      if(a.slice(-2) == '##' && b==true){
        return a.slice(0,2)
      }else if(a.slice(-1) == '#' && b==true){
        return a.slice(0,1)
      }else if(a.slice(-1) == 'b' && b==true){
        return a
      }else if (a.slice(-2)== '##' && b==false){
        return a.slice(0,2)
      }else if(a.slice(-2)== 'b#' && b==false){
        return a.slice(0,1)
      }else{
        return a
      }
    }else{
      return a
    }
  }
  const Card = ({Nota}) =>{
    const [texto, setTexto] = useState(Nota);
    return (
      <>
        <div>
          <span>{texto}</span>
          <div>
            <button onClick={()=>{setTexto(definirNota(Nota,true))}}>
              {definirNota(Nota,true)}
            </button>
            <button onClick={()=>{setTexto(definirNota(Nota+'#',false))}}>
              {definirNota(Nota+'#',false)}
            </button>
          </div>
        </div>
      </>
    )
  };
  
  const listaCards = intervalos.map(grado=> <Card key={grado} Nota={grado}></Card>);

  return (
    <>
      <ComponenteDePrueba Nombre={dataescala.Nombre}></ComponenteDePrueba>
      <select id='tipoEscala'>
        <option value='Escala Mayor'>Escala Mayor</option>
        <option value="Escala Menor">Escala Menor</option>
      </select>
      <select id='notasAcordes'>
        <option value='Notas'>Notas</option>
        <option value="Acordes">Acordes</option>
      </select>
      <div className='cards'>
        {listaCards}
      </div>
      <button onClick={cambiarEscala}>Cambiar Escala</button>
    </>
  )
}

export default App
