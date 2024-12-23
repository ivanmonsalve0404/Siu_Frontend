import React, { useEffect, useState } from "react";
import { Departamento } from "../../../models/Departamento";
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { ServicioPut } from "../../../services/ServicioPut";
import { useParams, useNavigate, Link } from "react-router-dom";
import { crearMensaje } from "../../../utilities/functions/mensajes";

export const DepartamentoActualizar = () => {
    const navigate = useNavigate();
    const { codDepartament } = useParams();

    const [formData, setFormData] = useState({
        nameDepartment: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const [enProceso, setEnProceso] = useState(false);
    const [errors, setErrors] = useState({
        nameDepartment: ''
    });

    useEffect(() => {
        buscarDepartamento();
    }, []);

    const buscarDepartamento = async () => {
        try {
            const urlServicio = `${URLS.URL_BASE}${URLS.UN_DEPARTAMENTO}/${codDepartament}`;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            if (resultado) {
                setFormData({
                    nameDepartment: resultado.nameDepartment || ''
                });
            } else {
                crearMensaje('error', 'Departamento no encontrado');
            }
        } catch (error) {
            crearMensaje('error', 'Error al cargar el departamento');
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            nameDepartment: ''
        };

        if (!formData.nameDepartment.trim()) {
            newErrors.nameDepartment = 'El nombre del departamento es requerido';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
            const departamentoData = new Departamento(
                Number(codDepartament),
                formData.nameDepartment
            );

            const urlServicio = `${URLS.URL_BASE}${URLS.ACTUALIZAR_DEPARTAMENTOS}`;
            const resultado = await ServicioPut.peticionPut(urlServicio, departamentoData);

            if (resultado.status === 200) {
                crearMensaje('success', 'Departamento actualizado exitosamente');
                navigate('/dashboard/adminDepartament');
            } else {
                crearMensaje('error', 'Error al actualizar el departamento: ' + resultado.message);
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
            <h4 className="fst-italic fw-bold display-5">Actualizar Departamento</h4>
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
                                        <label className="form-label">Nombre del Departamento</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.nameDepartment ? 'is-invalid' : ''}`}
                                            name="nameDepartment"
                                            value={formData.nameDepartment}
                                            onChange={handleInputChange}
                                        />
                                        {errors.nameDepartment && (
                                            <div className="invalid-feedback">{errors.nameDepartment}</div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to="/dashboard/adminDepartament" className="btn btn-secondary">
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