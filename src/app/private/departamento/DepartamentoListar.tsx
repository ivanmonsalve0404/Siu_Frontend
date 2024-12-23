import { useEffect, useState } from "react"
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { Link } from "react-router-dom";
import { Departamento } from "../../../models/Departamento";

export const DepartamentoListar = () => {
    /**Inicio Lógica de Negocio */
    /**Variables */
    const [arrDepartamentos, setArrDepartamentos] = useState<Departamento[]>([]);

    /**Metodos */
    const consultarDepartamentos = async () => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_DEPARTAMENTOS;
        const resultado = await ServicioGet.peticionGet(urlServicio);

        setArrDepartamentos(resultado);
    }

    /**Implementación de el Hock de refresco */
    useEffect(() => {
        consultarDepartamentos();
    }, [])
    /**Fin Lógica de Negocio */

    return (
        <div className="m-3">
            <div className="row">
                <div className="col-4">
                    <h4 className="fst-italic fw-bold display-5">Listar Departamentos</h4>
                </div>
                <div className="col-8">
                    <div className="d-flex justify-content-end">
                        <ol className="breadcrumb breadcrum-dark breadcrumb-transparent">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">
                                    <i className="fa fa-home"></i></Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Departamentos</a>
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
                                <th style={{ width: "50%" }}>Código</th>
                                <th style={{ width: "50%" }}>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrDepartamentos.map((objDepartamento, indice) => (
                                    <tr key={indice}>
                                        <td>{objDepartamento.codDepartament}</td>
                                        <td>{objDepartamento.nameDepartment}</td>
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
