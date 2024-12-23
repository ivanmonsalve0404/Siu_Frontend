export class ServicioDelete {
    public static async peticionDelete(urlServicio: string): Promise<any>{
        const token = localStorage.getItem("TOKEN_AUTORIZACION") as string;

        const datosEnviar = {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json; charset=UTF-8",
                "authorization": token
            }
        }

        const respuesta: Promise<any> = fetch(urlServicio, datosEnviar)
            .then((res) => {
                return res.json();
            }).then((losDatos) => {
                return losDatos;
            }).catch((elError) => {
                return elError
            });
        return respuesta;
    }
}