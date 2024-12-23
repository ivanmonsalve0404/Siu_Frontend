import { useEffect, useState } from "react"
import { Municipio } from "../../../models/Municipio"
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { Link } from "react-router-dom";
import { Usuario } from "../../../models/Usuario";

export const UsuarioListar = () => {
    /**Inicio Lógica de Negocio */ 
    /**Variables */
    const [arrUsuarios, setArrUsuarios] = useState<Usuario[]>([]);

    /**Metodos */
    const consultarUsuarios = async () => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_USUARIOS;
        const resultado = await ServicioGet.peticionGet(urlServicio);
    
        // Convertir fechas a objetos Date
        const usuariosConFechas = resultado.map((usuario: Usuario) => ({
            ...usuario,
            fechaNacimientoUser: new Date(usuario.fechaNacimientoUser), // Transformar string a Date
        }));
    
        setArrUsuarios(usuariosConFechas);
    }

    /**Implementación de el Hock de refresco */
    useEffect(() => {
        consultarUsuarios();
    }, [])
    /**Fin Lógica de Negocio */ 

    return (
        <div className="m-3">
            <div className="row">
                <div className="col-4">
                    <h4 className="fst-italic fw-bold display-5">Listar Usuarios</h4>
                </div>
                <div className="col-8">
                    <div className="d-flex justify-content-end">
                        <ol className="breadcrumb breadcrum-dark breadcrumb-transparent">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">
                                <i className="fa fa-home"></i></Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Usuarios</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="" className="text-warning">Listar</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center">
            <div className="col-md-10">
                    <table className="table table-sm table-striped table-hover">
                        <thead className="table-primary text-white fs-2">
                            <tr>
                                <th style={{ width: "10%" }}>Código</th>
                                <th style={{ width: "20%" }}>Rol</th>
                                <th style={{ width: "25%" }}>Nombre</th>
                                <th style={{ width: "20%" }}>Fecha</th>
                                <th style={{ width: "15%" }}>Telefono</th>
                                <th style={{ width: "20%" }}>Genero</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsuarios.map((objUsuario, indice) => (
                                    <tr key={indice}>
                                        <td>{objUsuario.codUser}</td>
                                        <td>{objUsuario.codRoleUser?.nombreRol}</td>
                                        <td>{objUsuario.nombreUser}</td>
                                        <td>{objUsuario.fechaNacimientoUser.toLocaleDateString()}</td>
                                        <td>{objUsuario.telefonoUser}</td>
                                        <td>{objUsuario.generoUser}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
