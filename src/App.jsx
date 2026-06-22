import { useState } from 'react'
import './App.css'
import { ComponenteDePrueba } from './components/ComponenteDePrueba'
import { listaEscalas } from '../public/data/listaEscalas';

function App() {
  const [dataescala, setDataescala] = useState({ ...listaEscalas[Math.floor(Math.random() * (0 - 14) + 14)] });
  const [intervalos, setIntervalos] = useState([...dataescala.Intervalos]);
  const [tipoEscala, setTipoEscala] = useState('Escala Mayor');
  const [notasAcordes, setNotasAcordes] = useState('Notas');
  const cambiarEscala = async (event) => {
    const escala = event.get('tipoEscala');
    const NoAc = event.get('notasAcordes');
    const varAux = Math.floor(Math.random() * (0 - 14) + 14);
    if (listaEscalas[varAux].Tipo == escala) {
      setDataescala({...listaEscalas[varAux]})
      if(NoAc == 'Notas'){
        setIntervalos(dataescala.Intervalos)
      }else{
        setIntervalos(dataescala.Acordes)
      }
    }else{
      await cambiarEscala(event)
    }
  }
  const definirNota = (a, b) => {
    if (notasAcordes == 'Notas') {
      if ((a.slice(-1) == 'b' && b == false) || (a.slice(-1) == '#' && b == true)) {
        return a.slice(0, 1)
      } else if (a.slice(-1) != '#' && b == false) {
        return a + '#'
      } else {
        return a
      }
    } else {
      if (a.slice(-1) == '°' && b == true) {
        return a.slice(0, 1) + '°'
      } else if (a.slice(-1) == 'm' && b == false) {
        return a.slice(0, 1)
      } else if (a.slice(-1) == '#' && b == true) {
        return a + 'm'
      } else if ((a.slice(-1) == '°' && a.slice(-2) != '#°') && b == false) {
        return a.slice(0, 1) + '#' + a.slice(1, 2)
      } else if ((a.slice(-1) != '#' && a.slice(-1) != 'm' && a.slice(-1) != '°') && b == true) {
        return a + 'm'
      } else {
        return a
      }
    }
  }
  const Card = ({ Nota }) => {
    const [texto, setTexto] = useState(Nota);
    return (
      <>
        <div className='Card'>
          <span>{texto}</span>
          <div className='BtnContainer'>
            <button className='CardBtn' onClick={() => { setTexto(definirNota(Nota, true)) }}>
              {definirNota(Nota, true)}
            </button>
            <button className='CardBtn' onClick={() => { setTexto(definirNota(Nota, false)) }}>
              {definirNota(Nota, false)}
            </button>
          </div>
        </div>
      </>
    )
  };

  const listaCards = intervalos.map(grado => <Card key={grado} Nota={grado}></Card>);

  return (
    <>
      <ComponenteDePrueba Nombre={dataescala.Nombre}></ComponenteDePrueba>
      <form action={cambiarEscala}>
        <select name='tipoEscala'>
          <option value='Escala Mayor'>Escala Mayor</option>
          <option value="Escala Menor">Escala Menor</option>
        </select>
        <select name='notasAcordes'>
          <option value='Notas'>Notas</option>
          <option value="Acordes">Acordes</option>
        </select>
        <button type='submit'>Cambiar Escala</button>
      </form>
      <div className='cards'>
        {listaCards}
      </div>
    </>
  )
}

export default App
