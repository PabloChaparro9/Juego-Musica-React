import { useState } from 'react'
import './App.css'
import { ComponenteDePrueba } from './components/ComponenteDePrueba'
import { listaEscalas } from '../public/data/listaEscalas';

function App() {
  const [dataescala, setDataescala] = useState({ ...listaEscalas[Math.floor(Math.random() * (0 - 14) + 14)] });
  const [intervalos, setIntervalos] = useState([...dataescala.Intervalos]);
  const [tipoEscala, setTipoEscala] = useState('Escala Mayor');
  const [notasAcordes, setNotasAcordes] = useState('Notas');
  const cambiarEscala = (event) => {
    const tipoSeleccionado = event.get('tipoEscala');
    const notasAcordesSeleccionado = event.get('notasAcordes');
    let varAux = Math.floor(Math.random() * (0 - 14) + 14);

    while (listaEscalas[varAux].Tipo !== tipoSeleccionado) {
      varAux = Math.floor(Math.random() * (0 - 14) + 14);
    }

    const nuevaEscala = { ...listaEscalas[varAux] };

    setTipoEscala(tipoSeleccionado);
    setNotasAcordes(notasAcordesSeleccionado);
    setDataescala(nuevaEscala);
    setIntervalos(
      notasAcordesSeleccionado === 'Notas'
        ? [...nuevaEscala.Intervalos]
        : [...nuevaEscala.Acordes]
    );
  }
  const definirNota = (a, b) => {
    const lastDigit = a.slice(-1);
    const lastTwoDigits = a.slice(-2);
    const baseNote = a.slice(0,1);
    if (notasAcordes == 'Notas') {
      if ((lastDigit == 'b' && b == false) || (lastDigit == '#' && b == true)) {
        return baseNote
      } else if (lastDigit != '#' && b == false) {
        return a + '#'
      } else {
        return a
      }
    } else {
      if (b == true) {
        if (lastDigit == '°') {
          return baseNote + '°'
        } else if (lastDigit == '#') {
          return baseNote
        } else if (lastDigit != '#' && lastDigit != 'm' && lastDigit != '°') {
          return a + 'm'
        } else {
          return a
        }
      } else if (b == false) {
        if (lastDigit == 'm' || lastTwoDigits == '#m') {
          return baseNote
        } else if (lastDigit == '°' && lastTwoDigits != '#°') {
          return baseNote + '#' + a.slice(1, 2)
        } else if (lastTwoDigits == '#°') {
          return a
        } else {
          return a
        }
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
