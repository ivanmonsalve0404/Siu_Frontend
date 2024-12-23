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
import { Rol } from "../../../models/Rol";

export const RolAdministrar = () => {
    /**Inicio Lógica de Negocio */
    /**Variables */
    const [arrRoles, setArrRoles] = useState<Rol[]>([]);
    const [rolSeleccionado, setRolSeleccionado] = useState<Rol>(new Rol(0, "", 0));

    /**Variables del modal */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    /**Metodos */
    const consultarRoles = async () => {
        const urlServicio = URLS.URL_BASE + URLS.LISTAR_ROLES;
        const resultado = await ServicioGet.peticionGet(urlServicio);

        setArrRoles(resultado);
    }

    const eliminarRol = async (codigo: number) => {
        try {
            const urlServicio = URLS.URL_BASE + URLS.ELIMINAR_ROLES + '/' + codigo;
            const resultado = await ServicioDelete.peticionDelete(urlServicio);

            if (resultado.affected) {
                crearMensaje("success", "Rol eliminado");
            } else {
                crearMensaje("error", "Fallo al eliminar el rol");
            }
            consultarRoles();
        } catch (error) {
            console.error("Error:", error);
            crearMensaje('error', "Error al eliminar el rol");
        }
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
                    <h4 className="fst-italic fw-bold display-5">Administrar Roles</h4>
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
                                <th style={{ width: "30%" }}>Nombre</th>
                                <th style={{ width: "30%" }}>Estado</th>
                                <th style={{ width: "20%" }}>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrRoles.map((objRol, indice) => (
                                    <tr key={indice}>
                                        <td>{objRol.codRol}</td>
                                        <td>{objRol.nombreRol}</td>
                                        <td>{renderEstado(objRol.estadoRol)}</td>
                                        <td>
                                            <Link to={`/dashboard/updateRole/${objRol.codRol}`} className="btn btn-primary btn-sm mx-2">
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <a href="" className="btn btn-danger btn-sm mx-2"
                                                onClick={(evento) => {
                                                    evento.preventDefault();
                                                    setRolSeleccionado(objRol);
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
                        <Modal.Title>Eliminar Rol</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Está seguro de eliminar el rol <strong>{rolSeleccionado.nombreRol}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={(evento) => {
                            evento.preventDefault();
                            eliminarRol(rolSeleccionado.codRol);
                            setShow(false);
                        }}>Eliminar</Button>
                    </Modal.Footer>
                </Modal>
                {/**Fin Ventana Modal */}
            </div>
        </div>
    )
}