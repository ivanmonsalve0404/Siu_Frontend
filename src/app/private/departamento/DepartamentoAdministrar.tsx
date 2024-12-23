import { useEffect, useState } from "react"
import { Municipio } from "../../../models/Municipio"
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { Link } from "react-router-dom";
import { ServicioDelete } from "../../../services/ServicioDelete";
import { idText } from "typescript";
import { crearMensaje } from "../../../utilities/functions/mensajes";
import { Button, Modal } from "react-bootstrap";
import { Departamento } from "../../../models/Departamento";

export const DepartamentoAdministrar = () => {
    /**Inicio Lógica de Negocio */
    /**Variables */
    const [arrDepartamentos, setArrDepartamentos] = useState<Departamento[]>([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<Departamento>(new Departamento(0, ""));

    /**Variables del modal */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    /**Metodos */
    const consultarDepartamentos = async () => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_DEPARTAMENTOS;
        const resultado = await ServicioGet.peticionGet(urlServicio);

        setArrDepartamentos(resultado);
    }

    const eliminarDepartamento = async (codigo: number) => {
        try {
            const urlServicio = URLS.URL_BASE + URLS.ELIMINAR_DEPARTAMENTOS + '/' + codigo;
            const resultado = await ServicioDelete.peticionDelete(urlServicio);
    
            if (resultado.affected) {
                crearMensaje("success", "Departamento eliminado");
            } else {
                crearMensaje("error", "Fallo al eliminar el departamento");
            }
            consultarDepartamentos();
        } catch (error) {
            console.error("Error:", error);
            crearMensaje('error', "Error al eliminar el departamento");
        }
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
                    <h4 className="fst-italic fw-bold display-5">Administrar Departamentos</h4>
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
                                <th style={{ width: "20%" }}>Código</th>
                                <th style={{ width: "60%" }}>Nombre</th>
                                <th style={{ width: "20%" }}>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrDepartamentos.map((objDepartamento, indice) => (
                                    <tr key={indice}>
                                        <td>{objDepartamento.codDepartament}</td>
                                        <td>{objDepartamento.nameDepartment}</td>
                                        <td>
                                            <Link to={`/dashboard/updateDepartament/${objDepartamento.codDepartament}`} className="btn btn-primary btn-sm mx-2">
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <a href="" className="btn btn-danger btn-sm mx-2"
                                                onClick={(evento) => {
                                                    evento.preventDefault();
                                                    setDepartamentoSeleccionado(objDepartamento);
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
                        <Modal.Title>Eliminar Departamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Está seguro de eliminar el departamento <strong>{ departamentoSeleccionado.nameDepartment}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={(evento) => {
                            evento.preventDefault();
                            eliminarDepartamento(departamentoSeleccionado.codDepartament);
                            setShow(false);    
                        }}>Eliminar</Button>
                    </Modal.Footer>
                </Modal>
                {/**Fin Ventana Modal */}
            </div>
        </div>
    )
}
