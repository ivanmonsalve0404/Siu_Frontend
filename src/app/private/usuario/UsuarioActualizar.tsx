import React, { useEffect, useState } from "react";
import { Usuario } from "../../../models/Usuario";
import { Rol } from "../../../models/Rol";
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { ServicioPut } from "../../../services/ServicioPut";
import { useParams, useNavigate, Link } from "react-router-dom";
import { crearMensaje } from "../../../utilities/functions/mensajes";
import { Button, Form } from "react-bootstrap";
import { useFormulario } from "../../../utilities/myHocks/useFormulario";

export const UsuarioActualizar = () => {
    const navigate = useNavigate();
    const { codUser } = useParams();

    const [formData, setFormData] = useState({
        nombreUser: '',
        codRol: 0,
        fechaNacimientoUser: '',
        telefonoUser: '',
        generoUser: 0
    });

    const [roles, setRoles] = useState<Rol[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [enProceso, setEnProceso] = useState(false);
    const [errors, setErrors] = useState({
        nombreUser: '',
        codRol: '',
        fechaNacimientoUser: '',
        telefonoUser: '',
        generoUser: ''
    });

    useEffect(() => {
        consultarRoles();
        buscarUsuario();
    }, []);

    const consultarRoles = async () => {
        try {
            const urlServicio = `${URLS.URL_BASE}${URLS.LISTAR_ROLES}`;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            if (Array.isArray(resultado)) {
                setRoles(resultado);
            } else {
                crearMensaje('error', 'Error al cargar los roles: formato inválido');
            }
        } catch (error) {
            crearMensaje('error', 'Error al cargar los roles');
        } finally {
            setIsLoading(false);
        }
    };

    const buscarUsuario = async () => {
        try {
            const urlServicio = `${URLS.URL_BASE}${URLS.UN_USUARIO}/${codUser}`;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            if (resultado) {
                setFormData({
                    nombreUser: resultado.nombreUser || '',
                    codRol: resultado.codRol || 0,
                    fechaNacimientoUser: resultado.fechaNacimientoUser ?
                        new Date(resultado.fechaNacimientoUser).toISOString().split('T')[0] : '',
                    telefonoUser: resultado.telefonoUser || '',
                    generoUser: resultado.generoUser || 0
                });
            } else {
                crearMensaje('error', 'Usuario no encontrado');
            }
        } catch (error) {
            crearMensaje('error', 'Error al cargar el usuario');
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            nombreUser: '',
            codRol: '',
            fechaNacimientoUser: '',
            telefonoUser: '',
            generoUser: ''
        };

        if (!formData.nombreUser.trim()) {
            newErrors.nombreUser = 'El nombre del usuario es requerido';
            isValid = false;
        }

        if (!formData.codRol) {
            newErrors.codRol = 'Debe seleccionar un rol';
            isValid = false;
        }

        if (!formData.fechaNacimientoUser) {
            newErrors.fechaNacimientoUser = 'La fecha de nacimiento es requerida';
            isValid = false;
        }

        if (!formData.telefonoUser.trim()) {
            newErrors.telefonoUser = 'El teléfono es requerido';
            isValid = false;
        }

        if (!formData.generoUser) {
            newErrors.generoUser = 'Debe seleccionar un género';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['codRol', 'generoUser'].includes(name) ? Number(value) : value
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setEnProceso(true);
        try {
            const usuarioData = new Usuario(
                Number(codUser),
                formData.codRol,
                formData.nombreUser,
                new Date(formData.fechaNacimientoUser),
                formData.telefonoUser,
                formData.generoUser
            );

            const urlServicio = `${URLS.URL_BASE}${URLS.ACTUALIZAR_USUARIOS}`;
            const resultado = await ServicioPut.peticionPut(urlServicio, usuarioData);
            console.log('Resultado de la actualización:', resultado);

            if (resultado.status === 200) {
                crearMensaje('success', 'Usuario actualizado exitosamente');
                navigate('/dashboard/adminUser');
            } else {
                crearMensaje('error', 'Error al actualizar el usuario: ' + resultado.message);
            }
        } catch (error) {
            console.error('Error en la actualización:', error);
            crearMensaje('error', 'Error al procesar la solicitud');
        } finally {
            setEnProceso(false);
        }
    };

    return (
        <div className="m-3">
            <h4 className="fst-italic fw-bold display-5">Actualizar Usuario</h4>
            <div className="d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            {isLoading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre del Usuario</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.nombreUser ? 'is-invalid' : ''}`}
                                            name="nombreUser"
                                            value={formData.nombreUser}
                                            onChange={handleInputChange}
                                        />
                                        {errors.nombreUser && (
                                            <div className="invalid-feedback">{errors.nombreUser}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Rol</label>
                                        <select
                                            className={`form-select ${errors.codRol ? 'is-invalid' : ''}`}
                                            name="codRol"
                                            value={formData.codRol}
                                            onChange={handleInputChange}
                                        >
                                            <option value={0}>Seleccione un rol</option>
                                            {roles && roles.map((rol) => (
                                                <option key={rol.codRol} value={rol.codRol}>
                                                    {rol.nombreRol}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.codRol && (
                                            <div className="invalid-feedback">{errors.codRol}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.fechaNacimientoUser ? 'is-invalid' : ''}`}
                                            name="fechaNacimientoUser"
                                            value={formData.fechaNacimientoUser}
                                            onChange={handleInputChange}
                                        />
                                        {errors.fechaNacimientoUser && (
                                            <div className="invalid-feedback">{errors.fechaNacimientoUser}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Teléfono</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.telefonoUser ? 'is-invalid' : ''}`}
                                            name="telefonoUser"
                                            value={formData.telefonoUser}
                                            onChange={handleInputChange}
                                        />
                                        {errors.telefonoUser && (
                                            <div className="invalid-feedback">{errors.telefonoUser}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Género</label>
                                        <div>
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="generoUser"
                                                    value="1"
                                                    checked={formData.generoUser === 1}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label">Masculino</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="generoUser"
                                                    value="2"
                                                    checked={formData.generoUser === 2}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label">Femenino</label>
                                            </div>
                                        </div>
                                        {errors.generoUser && (
                                            <div className="text-danger">{errors.generoUser}</div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to="/dashboard/adminUser" className="btn btn-secondary">
                                            Cancelar
                                        </Link>
                                        <button type="submit" className="btn btn-primary" disabled={enProceso}>
                                            {enProceso ? 'Actualizando...' : 'Actualizar'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};