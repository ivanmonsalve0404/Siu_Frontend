import { useEffect, useState } from "react"
import { Municipio } from "../../../models/Municipio"
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { Link } from "react-router-dom";
import { ServicioDelete } from "../../../services/ServicioDelete";
import { idText } from "typescript";
import { crearMensaje } from "../../../utilities/functions/mensajes";
import { Button, Modal } from "react-bootstrap";

export const MunicipioAdministrar = () => {
    /**Inicio Lógica de Negocio */
    /**Variables */
    const [arrMunicipios, setArrMunicipios] = useState<Municipio[]>([]);
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState<Municipio>(new Municipio(0, "", "", 0));

    /**Variables del modal */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    /**Metodos */
    const consultarMunicipios = async () => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_MUNICIPIOS;
        const resultado = await ServicioGet.peticionGet(urlServicio);

        setArrMunicipios(resultado);
    }

    const eliminarMunicipio = async (codigo: number) => {
        try {
            const urlServicio = URLS.URL_BASE + URLS.ELIMINAR_MUNICIPIOS + '/' + codigo;
            const resultado = await ServicioDelete.peticionDelete(urlServicio);
    
            if (resultado.affected) {
                crearMensaje("success", "Municipio eliminado");
            } else {
                crearMensaje("error", "Fallo al eliminar el municipio");
            }
            consultarMunicipios();
        } catch (error) {
            console.error("Error:", error);
            crearMensaje('error', "Error al eliminar el municipio");
        }
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
                    <h4 className="fst-italic fw-bold display-5">Administrar Municipios</h4>
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
                                <a href="" className="text-warning">Administrar</a>
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
                                <th style={{ width: "25%" }}>Nombre</th>
                                <th style={{ width: "20%" }}>Capital</th>
                                <th style={{ width: "25%" }}>Departamento</th>
                                <th style={{ width: "20%" }}>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrMunicipios.map((objMunicipio, indice) => (
                                    <tr key={indice}>
                                        <td>{objMunicipio.codMunicipio}</td>
                                        <td>{objMunicipio.nombreMunicipio}</td>
                                        <td>{objMunicipio.capitalMunicipio === "1" ? 'Es capital' : 'No es capital'}</td>
                                        <td>{objMunicipio.codDepartmentoMun?.nameDepartment}</td>
                                        <td>
                                            <Link to={`/dashboard/updateMunicipality/${objMunicipio.codMunicipio}`} className="btn btn-primary btn-sm mx-2">
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <a href="" className="btn btn-danger btn-sm mx-2"
                                                onClick={(evento) => {
                                                    evento.preventDefault();
                                                    setMunicipioSeleccionado(objMunicipio);
                                                    setShow(true);
                                                }}>
                                                <i className="fa fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {/**Inicio Ventana Modal */}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton className="bg-primary text-warning">
                        <Modal.Title>Eliminar Municipio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Está seguro de eliminar el municipio <strong>{ municipioSeleccionado.nombreMunicipio}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={(evento) => {
                            evento.preventDefault();
                            eliminarMunicipio(municipioSeleccionado.codMunicipio);
                            setShow(false);    
                        }}>Eliminar</Button>
                    </Modal.Footer>
                </Modal>
                {/**Fin Ventana Modal */}
            </div>
        </div>
    )
}
