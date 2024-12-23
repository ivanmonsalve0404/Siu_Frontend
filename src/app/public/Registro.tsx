import { useState } from "react";
import jsSHA from "jssha";
import { Button, Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { crearMensaje } from "../../utilities/functions/mensajes";
import { RegistroUsuario } from "../../models/RegistroUsuario";
import { RegistroServicio } from "../../services/RegistroServicio";
import { useFormulario } from "../../utilities/myHocks/useFormulario";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { DatoSesion } from "../../models/DatoSesion";

export const Registro = () => {
    /**Inicio lógica del negocio */
    type formulario = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false); //Encargada de la validación del formulario
    const [fecha, setFecha] = useState<Date>(new Date());
    let navegacion = useNavigate();

    let { codUser, codRol, nombreUser, fechaNacimientoUser, telefonoUser, generoUser, nombreAccess, claveAccess, dobleEnlace, objeto } = useFormulario<RegistroUsuario>(new RegistroUsuario(0, 0, "", new Date(), "", "", "", ""));

    const enviarFormulario = async (frm: formulario) => {
        frm.preventDefault();
        setEnProceso(true);
        const objFrm = frm.currentTarget; // Carga la interacción del formulario

        objFrm.classList.add("was-validated"); // Estilos de validación

        console.log("Objeto a registrar:", objeto);

        // Verificar si el formulario es válido
        if (objFrm.checkValidity() === false) {
            frm.preventDefault();
            frm.stopPropagation();
        } else {
            // Cifrar la contraseña
            const cifrado = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
            const claveCifrar = cifrado.update(claveAccess).getHash("HEX");
            objeto.claveAccess = claveCifrar;
            objeto.fechaNacimientoUser = fecha;

            try {
                // Registrar el usuario
                const respuestaRegistro = await RegistroServicio.registrarUsuario(objeto);
                console.log("Respuesta de registro:", respuestaRegistro);

                // Verificar si el registro fue exitoso

                const token = respuestaRegistro.response.tokenApp; // Obtener el token de respuesta

                if (token) {
                    console.log("Token recibido:", token);

                    const objRecibido: any = jwtDecode(token);
                    const datosUsuario = new DatoSesion(
                        objRecibido.id,
                        objRecibido.nombre,
                        objRecibido.rol,
                        objRecibido.telefono,
                        objRecibido.acceso
                    );

                    crearMensaje("success", "Bienvenido " + datosUsuario.nombre);

                    localStorage.setItem("TOKEN_AUTORIZACION", token);
                    navegacion('/dashboard/welcome');
                } else {
                    // Si no se recibe token, gestionar según el código de estado
                    switch (respuestaRegistro.status) {
                        case 400:
                            crearMensaje("error", "Error: el usuario no existe");
                            break;
                        case 406:
                            crearMensaje("error", "Error: contraseña inválida");
                            break;
                        default:
                            crearMensaje("error", "Fallo en la autenticación");
                            break;
                    }
                }
            } catch (error) {
                console.error("Error durante la autenticación:", error);
                crearMensaje("error", "Error al crear la cuenta");
            }

            // Restablecer el estado del formulario y finalizar proceso
            setEnProceso(false);
            limpiarCajas(objFrm);
        }
    };

    const limpiarCajas = (formulario: HTMLFormElement) => {
        if (formulario) {
            formulario.reset();
            objeto.nombreUser = "";
            objeto.codRol = 0;
            objeto.generoUser = "";
            objeto.nombreAccess = "";
            objeto.claveAccess = "";
            formulario.nombreUser.value = "";
            formulario.codRol.value = "";
            formulario.telefonoUser.value = "";
            formulario.nombreAccess.value = "";
            formulario.claveAccess.value = "";
            formulario.classList.remove("was-validated");
        }
    };
    /**Fin lógica del negocio */

    return (
        <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center form-bg-image " data-background-lg="../../assets/img/illustrations/signin.svg">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                                <h1 className="mb-0 h3 mt-5">Crea tu cuenta</h1>
                            </div>
                            <Form className="mt-2" validated={enProceso} onSubmit={enviarFormulario}>
                                <div className="mb-2">
                                    <div className="row">
                                        <Form.Group id="name" className="col-12">
                                            <Form.Label>Nombre</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                                </InputGroup.Text>
                                                <Form.Control name="nombreUser" value={nombreUser} onChange={dobleEnlace} required autoFocus type="name" placeholder="Digite su nombre" />
                                            </InputGroup>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="row">
                                        <Form.Group id="datebirth" className="col-6 mb-2">
                                            <Form.Label>Fecha de Nacimiento</Form.Label>

                                            <DatePicker className="form-control" selected={fecha} onChange={(valor: any) => { setFecha(valor) }} required autoFocus />

                                        </Form.Group>

                                        <Form.Group id="genre" className="col-6 mb-2">
                                            <Form.Label>Género</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="fa fa-male"></i>
                                                </InputGroup.Text>
                                                <Form.Select name="generoUser" value={generoUser} onChange={dobleEnlace} required autoFocus>
                                                    <option value="0">Seleccionar</option>
                                                    <option value="1">Masculino</option>
                                                    <option value="2">Femenino</option>
                                                    <option value="3">Otro</option>
                                                </Form.Select>
                                            </InputGroup >

                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group id="role" className="mb-2">
                                    <Form.Label>Rol</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                        </InputGroup.Text>
                                        <Form.Control name="codRol" value={codRol} onChange={dobleEnlace} required autoFocus type="role" placeholder="Digite el código del rol" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group id="phone" className="mb-2">
                                    <Form.Label>Teléfono</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                        </InputGroup.Text>
                                        <Form.Control name="telefonoUser" value={telefonoUser} onChange={dobleEnlace} required autoFocus type="phone" placeholder="Digite su teléfono" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group id="nameUser" className="mb-2">
                                    <Form.Label>Usuario</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                        </InputGroup.Text>
                                        <Form.Control name="nombreAccess" value={nombreAccess} onChange={dobleEnlace} required autoFocus type="nameUser" placeholder="Digite su nombre de usuario" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group id="password" className="mb-2">
                                    <Form.Label>Contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            {/*    <FontAwesomeIcon icon={faUnlockAlt} /> */}
                                        </InputGroup.Text>
                                        <Form.Control name="claveAccess" value={claveAccess} onChange={dobleEnlace} required type="password" placeholder="Digite su contraseña" />
                                    </InputGroup>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Registrarse
                                </Button>
                            </Form>

                            <div className="d-flex justify-content-center align-items-center mt-4">
                                <span className="fw-normal">
                                    Ya tiene una cuenta? &nbsp;
                                    <a href="./login" className="fw-bold">Iniciar Sesion</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};