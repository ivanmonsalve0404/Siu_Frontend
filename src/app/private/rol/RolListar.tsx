import { useEffect, useState } from "react"
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { Link } from "react-router-dom";
import { Departamento } from "../../../models/Departamento";
import { Rol } from "../../../models/Rol";

export const RolListar = () => {
    /**Inicio Lógica de Negocio */
    /**Variables */
    const [arrRoles, setArrRoles] = useState<Rol[]>([]);

    /**Metodos */
    const consultarRoles = async () => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_ROLES;
        const resultado = await ServicioGet.peticionGet(urlServicio);

        setArrRoles(resultado);
    }

    /**Implementación de el Hock de refresco */
    useEffect(() => {
        consultarRoles();
    }, [])
    /**Fin Lógica de Negocio */

    // Helper function to render colored state
    const renderEstado = (estado: number) => {
        return estado === 1 ? (
            <span className="text-success fw-bold">Activo</span>
        ) : (
            <span className="text-danger fw-bold">Inactivo</span>
        );
    }

    return (
        <div className="m-3">
            <div className="row">
                <div className="col-4">
                    <h4 className="fst-italic fw-bold display-5">Listar Roles</h4>
                </div>
                <div className="col-8">
                    <div className="d-flex justify-content-end">
                        <ol className="breadcrumb breadcrum-dark breadcrumb-transparent">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">
                                    <i className="fa fa-home"></i></Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Roles</a>
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
                                <th style={{ width: "30%" }}>Código</th>
                                <th style={{ width: "40%" }}>Nombre</th>
                                <th style={{ width: "40%" }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrRoles.map((objRol, indice) => (
                                    <tr key={indice}>
                                        <td>{objRol.codRol}</td>
                                        <td>{objRol.nombreRol}</td>
                                        <td>{renderEstado(objRol.estadoRol)}</td>
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