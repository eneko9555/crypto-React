import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import Error from './Error'

import useSelectMonedas from '../hooks/useSelectMonedas'


const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 10px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
        
    }
`
const Formulario = ({setMonedas}) => {
    const monedas = [
        {id : "EUR", nombre: "Euro"},
        {id : "USD", nombre: "Dolor de Estados Unidos"},
        {id : "MXN", nombre: "Peso Mexicano"},
        {id : "GBP", nombre: "Libra Esterlina"}
    ]

    const [criptos, setCriptos] = useState([])
    const [ moneda, SelectMonedas ]  = useSelectMonedas("Elige tu Moneda", monedas)
    const [ criptoElegida, SelectCriptos ]  = useSelectMonedas("Elige tu Criptomoneda", criptos)

    const [error, setError] = useState(false)

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD"
            
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id : cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
           setCriptos(arrayCriptos);
        }
        consultarApi()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if([moneda, criptoElegida].includes("")){
            setError(true)
            return
        }

        setMonedas({moneda, criptoElegida})
    }
 
  return (
    <>
    {error && <Error
        setError={setError}
    >Todos los campos son obligatorios</Error>}
    <form
        onSubmit={handleSubmit}
    >
        <SelectMonedas/>
        <SelectCriptos />
        <InputSubmit type="submit" value="Cotizar"  /> 
    </form>
    </>
  )
}

export default Formulario