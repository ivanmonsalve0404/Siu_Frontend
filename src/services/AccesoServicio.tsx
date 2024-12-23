import { Acceso } from "../models/Acceso";
import { URLS } from "../utilities/domains/urls";

export class AccesoServicio {
    
    public static async iniciarSesion(objetoAcceso: Acceso): Promise<any> {
        const datosEnviar = {
            method: 'POST',
            body: JSON.stringify(objetoAcceso),
            headers: {"Content-Type": "application/json; charset=utf-8"}
        }

        const urlEnviar = URLS.URL_BASE + URLS.INICIO_SESION;
        const respuesta = await fetch(urlEnviar, datosEnviar)
        .then((res) => res.json())
        .then((datos)=>{return datos}).catch((error) => {return error});

        return respuesta;
    }
}