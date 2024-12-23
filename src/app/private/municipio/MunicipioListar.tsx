import { useEffect, useState } from "react"
import { Municipio } from "../../../models/Municipio"
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { Link } from "react-router-dom";

export const MunicipioListar = () => {
    /**Inicio Lógica de Negocio */ 
    /**Variables */
    const [arrMunicipios, setArrMunicipios] = useState<Municipio[]>([]);

    /**Metodos */
    const consultarMunicipios = async() => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_MUNICIPIOS;
        const resultado = await ServicioGet.peticionGet(urlServicio);

        setArrMunicipios(resultado);
    }

    /**Implementación de el Hock de refresco */
    useEffect(() => {
        consultarMunicipios();
    }, [])
    /**Fin Lógica de Negocio */ 

    return (
        <div className="m-3">
            <div className="row">
                <div className="col-4">
                    <h4 className="fst-italic fw-bold display-5">Listar Municipios</h4>
                </div>
                <div className="col-8">
                    <div className="d-flex justify-content-end">
                        <ol className="breadcrumb breadcrum-dark breadcrumb-transparent">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">
                                <i className="fa fa-home"></i></Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Municipios</a>
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
                                <th style={{ width: "20%" }}>Código</th>
                                <th style={{ width: "30%" }}>Nombre</th>
                                <th style={{ width: "20%" }}>Capital</th>
                                <th style={{ width: "30%" }}>Departamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrMunicipios.map((objMunicipio, indice) => (
                                    <tr key={indice}>
                                        <td>{objMunicipio.codMunicipio}</td>
                                        <td>{objMunicipio.nombreMunicipio}</td>
                                        <td>{objMunicipio.capitalMunicipio === "1" ? 'Es capital':'No es capital'}</td>
                                        <td>{objMunicipio.codDepartmentoMun?.nameDepartment}</td>
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
