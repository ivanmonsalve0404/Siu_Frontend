import { useEffect, useState } from "react"
import { Municipio } from "../../../models/Municipio"
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { Link } from "react-router-dom";
import { ServicioDelete } from "../../../services/ServicioDelete";
import { idText } from "typescript";
import { crearMensaje } from "../../../utilities/functions/mensajes";
import { Button, Modal } from "react-bootstrap";
import { Usuario } from "../../../models/Usuario";

export const UsuarioAdministrar = () => {
    /**Inicio Lógica de Negocio */
    /**Variables */
    const [arrUsuarios, setArrUsuarios] = useState<Usuario[]>([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario>(new Usuario(0, 0, "", new Date(), "", 0));

    /**Variables del modal */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

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

    const eliminarUsuario = async (codigo: number) => {
        try {
            const urlServicio = URLS.URL_BASE + URLS.ELIMINAR_USUARIOS + '/' + codigo;
            const resultado = await ServicioDelete.peticionDelete(urlServicio);
    
            if (resultado.affected) {
                crearMensaje("success", "Usuario eliminado");
            } else {
                crearMensaje("error", "Fallo al eliminar el usuario");
            }
            consultarUsuarios();
        } catch (error) {
            console.error("Error:", error);
            crearMensaje('error', "Error al eliminar el usuario");
        }
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
                    <h4 className="fst-italic fw-bold display-5">Administrar Usuarios</h4>
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
                                <th style={{ width: "20%" }}>Rol</th>
                                <th style={{ width: "20%" }}>Nombre</th>
                                <th style={{ width: "10%" }}>Fecha</th>
                                <th style={{ width: "15%" }}>Telefono</th>
                                <th style={{ width: "15%" }}>Genero</th>
                                <th style={{ width: "10%" }}>&nbsp;</th>
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
                                        <td>
                                            <Link to={`/dashboard/updateUser/${objUsuario.codUser}`} className="btn btn-primary btn-sm mx-2">
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <a href="" className="btn btn-danger btn-sm mx-2"
                                                onClick={(evento) => {
                                                    evento.preventDefault();
                                                    setUsuarioSeleccionado(objUsuario);
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
                        <Modal.Title>Eliminar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Está seguro de eliminar el usuario <strong>{ usuarioSeleccionado.nombreUser}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={(evento) => {
                            evento.preventDefault();
                            eliminarUsuario(usuarioSeleccionado.codUser);
                            setShow(false);    
                        }}>Eliminar</Button>
                    </Modal.Footer>
                </Modal>
                {/**Fin Ventana Modal */}
            </div>
        </div>
    )
}
