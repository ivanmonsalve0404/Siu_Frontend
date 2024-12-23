import React, { useEffect, useState } from "react";
import { Rol } from "../../../models/Rol";
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { ServicioPut } from "../../../services/ServicioPut";
import { useParams, useNavigate, Link } from "react-router-dom";
import { crearMensaje } from "../../../utilities/functions/mensajes";

export const RolActualizar = () => {
    const navigate = useNavigate();
    const { codRol } = useParams();

    const [formData, setFormData] = useState({
        nombreRol: '',
        estadoRol: 1  // Default to active state
    });

    const [isLoading, setIsLoading] = useState(true);
    const [enProceso, setEnProceso] = useState(false);
    const [errors, setErrors] = useState({
        nombreRol: ''
    });

    useEffect(() => {
        buscarRol();
    }, []);

    const buscarRol = async () => {
        try {
            const urlServicio = `${URLS.URL_BASE}${URLS.UN_ROLES}/${codRol}`;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            if (resultado) {
                setFormData({
                    nombreRol: resultado.nombreRol || '',
                    estadoRol: resultado.estadoRol || 1
                });
            } else {
                crearMensaje('error', 'Rol no encontrado');
            }
        } catch (error) {
            crearMensaje('error', 'Error al cargar el rol');
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            nombreRol: ''
        };

        if (!formData.nombreRol.trim()) {
            newErrors.nombreRol = 'El nombre del rol es requerido';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'estadoRol' ? Number(value) : value
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
            const rolData = new Rol(
                Number(codRol),
                formData.nombreRol,
                formData.estadoRol
            );

            const urlServicio = `${URLS.URL_BASE}${URLS.ACTUALIZAR_ROLES}`;
            const resultado = await ServicioPut.peticionPut(urlServicio, rolData);

            if (resultado.status === 200) {
                crearMensaje('success', 'Rol actualizado exitosamente');
                navigate('/dashboard/adminRole');
            } else {
                crearMensaje('error', 'Error al actualizar el rol: ' + resultado.message);
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
            <h4 className="fst-italic fw-bold display-5">Actualizar Rol</h4>
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
                                        <label className="form-label">Nombre del Rol</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.nombreRol ? 'is-invalid' : ''}`}
                                            name="nombreRol"
                                            value={formData.nombreRol}
                                            onChange={handleInputChange}
                                        />
                                        {errors.nombreRol && (
                                            <div className="invalid-feedback">{errors.nombreRol}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Estado del Rol</label>
                                        <select
                                            className="form-control"
                                            name="estadoRol"
                                            value={formData.estadoRol}
                                            onChange={handleInputChange}
                                        >
                                            <option value={1}>Activo</option>
                                            <option value={0}>Inactivo</option>
                                        </select>
                                    </div>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to="/dashboard/adminRole" className="btn btn-secondary">
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