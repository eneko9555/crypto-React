import { useState, useEffect } from 'react'
import styled from "@emotion/styled"
import Imagen2 from "./img/imagen-criptos.png"
import Formulario from './Components/Formulario'
import Resultado from './Components/Resultado'

import Spinner from "./Components/Spinner"

const Contenedor = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 150px;
  }

`

const Imagen = styled.img`
  max-width: 500px;
  width: 90%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family : "Golos text";
  color: #FFF;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 34px;

`


function App() {

  const [monedas, setMonedas] = useState({})
  const [data ,  setData] = useState({})
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const {criptoElegida, moneda} = monedas
    if(Object.keys(monedas).length > 0){
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoElegida}&tsyms=${moneda}`
      

      const apiCall = async () => {
        
        setCargando(true)
        setData({})
        
        const api =  await fetch(url)
        const resultado = await api.json()
        setData(resultado.DISPLAY  [criptoElegida][moneda])
        setMostrarResultado(true)
        setCargando(false)
      }
      apiCall()
    }
  }, [monedas])
 
  return (
    <Contenedor>
      <Imagen
        src={Imagen2}
        alt="imagenes-criptomonedas"
      ></Imagen>
      <div>
        <Heading> Cotiza Criptomonedas </Heading>
        <Formulario 
          setMonedas={setMonedas}
        />


      {cargando ? <Spinner/> : mostrarResultado && 
        <Resultado 
          data={data}
        />}
      


      </div>
      
    </Contenedor>

    
  )
}

export default App
