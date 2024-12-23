import { URLS } from "../utilities/domains/urls";
import { Acceso } from "../models/Acceso";
import { RegistroUsuario } from "../models/RegistroUsuario";

export class RegistroServicio {
    public static async registrarUsuario(datosUsuario: RegistroUsuario): Promise<any> {
        const datosEnviar = {
            method: 'POST',
            body: JSON.stringify(datosUsuario),
            headers: {"Content-Type": "application/json; charset=utf-8"}
        }

        const urlEnviar = URLS.URL_BASE + URLS.REGISTRO_USUARIO;
        const respuesta = await fetch(urlEnviar, datosEnviar)
        .then((res) => {return res.json()}) 
        .then((datos)=>{return datos}).catch((error) => {return error});

        return respuesta;
    }
}