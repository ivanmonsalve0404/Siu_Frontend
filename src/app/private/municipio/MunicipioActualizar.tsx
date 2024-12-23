import React, { useEffect, useState } from "react";
import { Municipio } from "../../../models/Municipio";
import { URLS } from "../../../utilities/domains/urls";
import { ServicioGet } from "../../../services/ServicioGet";
import { ServicioPut } from "../../../services/ServicioPut";
import { useParams, useNavigate, Link } from "react-router-dom";
import { crearMensaje } from "../../../utilities/functions/mensajes";
import { Button, Form } from "react-bootstrap";
import { Departamento } from "../../../models/Departamento";
import { useFormulario } from "../../../utilities/myHocks/useFormulario";

export const MunicipioActualizar = () => {
    const navigate = useNavigate();
    const { codMunicipio } = useParams();

    const [formData, setFormData] = useState({
        nombreMunicipio: '',
        capitalMunicipio: '0',
        codDepartament: 0
    });

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [enProceso, setEnProceso] = useState(false);
    const [errors, setErrors] = useState({
        nombreMunicipio: '',
        codDepartament: ''
    });

    useEffect(() => {
        consultarDepartamentos();
        buscarMunicipio();
    }, []);

    const consultarDepartamentos = async () => {
        try {
            const urlServicio = `${URLS.URL_BASE}${URLS.LISTAR_DEPARTAMENTOS}`;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            if (Array.isArray(resultado)) {
                setDepartamentos(resultado);
            } else {
                crearMensaje('error', 'Error al cargar los departamentos: formato inválido');
            }
        } catch (error) {
            crearMensaje('error', 'Error al cargar los departamentos');
        } finally {
            setIsLoading(false);
        }
    };

    const buscarMunicipio = async () => {
        try {
            const urlServicio = `${URLS.URL_BASE}${URLS.UN_MUNICIPIO}/${codMunicipio}`;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            if (resultado) {
                setFormData({
                    nombreMunicipio: resultado.nombreMunicipio || '',
                    capitalMunicipio: resultado.capitalMunicipio?.toString() || '0',
                    codDepartament: resultado.codDepartament || 0
                });
            } else {
                crearMensaje('error', 'Municipio no encontrado');
            }
        } catch (error) {
            crearMensaje('error', 'Error al cargar el municipio');
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            nombreMunicipio: '',
            codDepartament: ''
        };

        if (!formData.nombreMunicipio.trim()) {
            newErrors.nombreMunicipio = 'El nombre del municipio es requerido';
            isValid = false;
        }

        if (!formData.codDepartament) {
            newErrors.codDepartament = 'Debe seleccionar un departamento';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'codDepartament' ? Number(value) : value
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
            const municipioData = new Municipio(
                Number(codMunicipio),
                formData.nombreMunicipio,
                formData.capitalMunicipio,
                formData.codDepartament
            );

            const urlServicio = `${URLS.URL_BASE}${URLS.ACTUALIZAR_MUNICIPIOS}`;
            const resultado = await ServicioPut.peticionPut(urlServicio, municipioData);
            console.log('Resultado de la actualización:', resultado); // Para depuración

            // Cambia esta verificación
            if (resultado.status === 200) {
                crearMensaje('success', 'Municipio actualizado exitosamente');
                navigate('/dashboard/adminMunicipality');
            } else {
                crearMensaje('error', 'Error al actualizar el municipio: ' + resultado.message);
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
            <h4 className="fst-italic fw-bold display-5">Actualizar Municipio</h4>
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
                                        <label className="form-label">Nombre del Municipio</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.nombreMunicipio ? 'is-invalid' : ''}`}
                                            name="nombreMunicipio"
                                            value={formData.nombreMunicipio}
                                            onChange={handleInputChange}
                                        />
                                        {errors.nombreMunicipio && (
                                            <div className="invalid-feedback">{errors.nombreMunicipio}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Departamento</label>
                                        <select
                                            className={`form-select ${errors.codDepartament ? 'is-invalid' : ''}`}
                                            name="codDepartament"
                                            value={formData.codDepartament}
                                            onChange={handleInputChange}
                                        >
                                            <option value={0}>Seleccione un departamento</option>
                                            {departamentos && departamentos.map((dept) => (
                                                <option key={dept.codDepartament} value={dept.codDepartament}>
                                                    {dept.nameDepartment}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.codDepartament && (
                                            <div className="invalid-feedback">{errors.codDepartament}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">¿Es Capital?</label>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="capitalMunicipio"
                                                value="1"
                                                checked={formData.capitalMunicipio === "1"}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="capitalMunicipio"
                                                value="2"
                                                checked={formData.capitalMunicipio === "2"}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to="/dashboard/adminMunicipality" className="btn btn-secondary">
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
