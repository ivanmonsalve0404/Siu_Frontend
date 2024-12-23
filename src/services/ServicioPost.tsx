export class ServicioPost {

    public static async peticionPost(urlServicio: string, objRegistro: any): Promise<any>{
        const token = localStorage.getItem("TOKEN_AUTORIZACION") as string;

        const datosEnviar = {
            method: "POST",
            headers: {
                "Content-Type":"application/json; charset=UTF-8",
                "authorization": token
            },
            body:JSON.stringify(objRegistro)
        }

        const respuesta = fetch(urlServicio, datosEnviar)
            .then((res) => {
                return res.json();
            }).then((losDatos) => {
                return losDatos;
            }).catch((elError) => {
                return elError;
            })
        return respuesta;  
    }
}