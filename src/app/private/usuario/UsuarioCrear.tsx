import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Usuario } from '../../../models/Usuario';
import { Rol } from '../../../models/Rol';
import { URLS } from '../../../utilities/domains/urls';
import { ServicioPost } from '../../../services/ServicioPost';
import { ServicioGet } from '../../../services/ServicioGet';
import { crearMensaje } from '../../../utilities/functions/mensajes';

export const UsuarioCrear = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombreUser: '',
        codRol: 0,
        fechaNacimientoUser: '',
        telefonoUser: '',
        generoUser: 0
    });
    
    const [errors, setErrors] = useState({
        nombreUser: '',
        codRol: '',
        fechaNacimientoUser: '',
        telefonoUser: '',
        generoUser: ''
    });
    
    const [roles, setRoles] = useState<Rol[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        consultarRoles();
    }, []);
    
    const consultarRoles = async () => {
        try {
            setIsLoading(true);
            const urlServicio = URLS.URL_BASE + URLS.LISTAR_ROLES;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            
            if (Array.isArray(resultado)) {
                setRoles(resultado);
            } else {
                console.error('El resultado no es un array:', resultado);
                setRoles([]);
                crearMensaje('error', 'Error al cargar los roles: formato inválido');
            }
        } catch (error) {
            console.error('Error al cargar roles:', error);
            setRoles([]);
            crearMensaje('error', 'Error al cargar los roles');
        } finally {
            setIsLoading(false);
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
            newErrors.nombreUser = 'El nombre de usuario es requerido';
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
        
        try {
            const usuarioData = new Usuario(
                0,
                formData.codRol,
                formData.nombreUser,
                new Date(formData.fechaNacimientoUser),
                formData.telefonoUser,
                formData.generoUser
            );
            
            const urlServicio = URLS.URL_BASE + URLS.CREAR_USUARIOS;
            const resultado = await ServicioPost.peticionPost(urlServicio, usuarioData);
            
            if (resultado.codUser) {
                crearMensaje('success', 'Usuario creado exitosamente');
                navigate('/dashboard/adminUser');
            } else {
                crearMensaje('error', 'Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);
            crearMensaje('error', 'Error al procesar la solicitud');
        }
    };
    
    return (
        <div className="m-3">
            <div className="row">
                <div className="col-4">
                    <h4 className="fst-italic fw-bold display-5">Crear Usuario</h4>
                </div>
                <div className="col-8">
                    <div className="d-flex justify-content-end">
                        <ol className="breadcrumb breadcrum-dark breadcrumb-transparent">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">
                                    <i className="fa fa-home"></i>
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Usuarios</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="" className="text-warning">Crear</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

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
                                        <label className="form-label">Nombre de Usuario</label>
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
                                        {errors.generoUser && (
                                            <div className="text-danger">{errors.generoUser}</div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to="/dashboard/adminUser" className="btn btn-secondary">
                                            Cancelar
                                        </Link>
                                        <button type="submit" className="btn btn-primary">
                                            Guardar
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