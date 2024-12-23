import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormulario } from "../../utilities/myHocks/useFormulario";
import { Acceso } from "../../models/Acceso";
import jsSHA from "jssha";
import { AccesoServicio } from "../../services/AccesoServicio";
import { DatoSesion } from "../../models/DatoSesion";
import { jwtDecode } from "jwt-decode";
import { crearMensaje } from "../../utilities/functions/mensajes";

export const Sesion = () => {
    /**Inicio lógica del negocio */
    type formulario = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false); //Encargada de la validación del formulario
    let { nombreAccess, claveAccess, dobleEnlace, objeto } = useFormulario<Acceso>(new Acceso(0, "", ""));
    let navegacion = useNavigate();

    const enviarFormulario = async (frm: formulario) => {
        frm.preventDefault(); //No recarga la página
        setEnProceso(true); //Cambia el estado para validar el formulario
        const objFrm = frm.currentTarget;//Carga la interacción del formulario
        objFrm.classList.add("was-validated"); //Agrega la clase de validación al formulario
        if (objFrm.checkValidity() == false) {
            frm.preventDefault();
            frm.stopPropagation(); //Detiene la propagación del evento
        } else {
            const cifrado = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" }); //Define una instancia del cifrado
            const claveCifrar = cifrado.update(claveAccess).getHash("HEX"); //Cifra la clave con letras y numeros
            objeto.claveAccess = claveCifrar;
            const respuesta = await AccesoServicio.iniciarSesion(objeto);

            const token = respuesta.response;

            if (token.tokenApp) {
                /**Acá se sacan los datos */
                const objRecibido: any = jwtDecode(token.tokenApp);
                const datosUsuario = new DatoSesion(
                    objRecibido.id,
                    objRecibido.nombre,
                    objRecibido.rol,
                    objRecibido.telefono,
                    objRecibido.acceso);
                    console.log(objRecibido);
                    
                /**Mensaje Iniciaste Sesion */
                crearMensaje("success", "Bienvenido " + datosUsuario.nombre);
                localStorage.setItem("TOKEN_AUTORIZACION", token.tokenApp);
                navegacion("/dashboard");
            } else {
                switch (respuesta.status) {
                    case 400:
                        /**Mensaje de usuario registrado */
                        crearMensaje("error", "El usuario no existe");
                        break;
                    case 406:
                        /**Mensaje para clave invalida */
                        crearMensaje("error", "Error en la contraseña");
                        break;
                    default:
                        /**Fallo al realizar la autenticación */
                        crearMensaje("error", "Fallo al realizar la autenticación");
                        break;
                }

            }
            setEnProceso(false);
            limpiarFormulario(objFrm);

        }
    }

    const limpiarFormulario = (formulario: HTMLFormElement) => {
        formulario.reset();
        objeto.nombreAccess = "";
        objeto.claveAccess = "";

        formulario.nombreAccess.value = "";
        formulario.claveAccess.value = "";
        formulario.classList.remove("was-validated");
    }

    /**Fin lógica del negocio */


    return (
        <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div className="container-fluid">
                <div className="row justify-content-center form-bg-image" data-background-lg="../../assets/img/illustrations/signin.svg">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                                <h1 className="mb-0 h3 fs-4 fst-italic">Sistema de Información Ubicaciones</h1>
                            </div>
                            <Form className="mt-4" validated={enProceso} onSubmit={enviarFormulario}>
                                <Form.Group controlId="nombreAccess" className="mb-4">
                                    <Form.Label>
                                        <span className="rojito fs-4">*</span> &nbsp; Correo Electrónico
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className='fa fa-envelope'></i>
                                        </InputGroup.Text>
                                        <Form.Control type="email"
                                            name="nombreAccess"
                                            value={nombreAccess}
                                            onChange={dobleEnlace}
                                            autoFocus required />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Group controlId="claveAccess" className="mb-4">
                                        <Form.Label>
                                            <span className="rojito fs-4">*</span> &nbsp; Contraseña
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <i className='fa fa-key'></i>
                                            </InputGroup.Text>
                                            <Form.Control type="password"
                                                name="claveAccess"
                                                value={claveAccess}
                                                onChange={dobleEnlace}
                                                required />
                                        </InputGroup>
                                    </Form.Group>

                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Acceder
                                </Button>
                            </Form>

                            <div className="d-flex justify-content-center align-items-center mt-4">
                                <span className="fw-normal">
                                    ¿No tienes una cuenta? &nbsp;
                                    <Link to="/register" className="fw-bold text-primary">Registrarse</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};