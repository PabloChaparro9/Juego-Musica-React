import { listaEscalas } from "../../public/data/listaEscalas"
export const ComponenteDePrueba = () =>{
    return(
        <>
            <h1>Escala de {listaEscalas[0].Nombre}</h1>
        </>
    )
}