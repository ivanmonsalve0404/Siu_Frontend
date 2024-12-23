import { jwtDecode } from "jwt-decode";

export const Welcome = () => {
    /**Inicio: Logica del Negocio */

    const token: any = localStorage.getItem("TOKEN_AUTORIZACION");
    const datosUsuario: any = jwtDecode(token);
    /**Fin: Logica del Negocio */

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        <h5>Datos Usuario</h5>
                    </div>
                    <ul className="p-3 m-5">
                        <li>{datosUsuario.nombre}</li>
                        <li>{datosUsuario.telefono}</li>
                        <li>{datosUsuario.acceso}</li>
                        <li>{datosUsuario.rol}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}