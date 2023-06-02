import styled from "@emotion/styled"

const ResultadoDiv = styled.div`
    color: #fff;
    font-family: "Lato";
    display: flex;
    gap: 5px;
    margin-top: 20px;
    align-items: center;
    img {
       width:30%;
    }
    @media (max-width: 558px){
        display: flex;
        flex-direction: column;
      
        img{
            width: 35%;;
            
        };
    }
`

const Texto = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 30px;
    span {
        font-weight: 700;
    }
`

const Resultado = ({ data }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = data
    return (

        <ResultadoDiv>
            <img src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
            <div>
                <Precio>El precio es de: <span>{PRICE}</span></Precio>
                <Texto>Precio mas alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>El precio mas bajo del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR} %</span></Texto>
                <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </ResultadoDiv>


    )
}

export default Resultado