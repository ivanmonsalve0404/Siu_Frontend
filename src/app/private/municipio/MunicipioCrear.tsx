import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from 'react-bootstrap';
import { Form, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Municipio } from '../../../models/Municipio';
import { URLS } from '../../../utilities/domains/urls';
import { ServicioPost } from '../../../services/ServicioPost';
import { crearMensaje } from '../../../utilities/functions/mensajes';
import { Departamento } from '../../../models/Departamento';
import { ServicioGet } from '../../../services/ServicioGet';

export const MunicipioCrear = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombreMunicipio: '',
        capitalMunicipio: '0',
        codDepartament: 0
    });
    
    const [errors, setErrors] = useState({
        nombreMunicipio: '',
        codDepartament: ''
    });
    
    // Inicializamos departamentos como un array vacío
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    // Agregamos estado para manejar la carga
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        consultarDepartamentos();
    }, []);
    
    const consultarDepartamentos = async () => {
        try {
            setIsLoading(true);
            const urlServicio = URLS.URL_BASE + URLS.LISTAR_DEPARTAMENTOS;
            const resultado = await ServicioGet.peticionGet(urlServicio);
            
            // Validamos que resultado sea un array
            if (Array.isArray(resultado)) {
                setDepartamentos(resultado);
            } else {
                console.error('El resultado no es un array:', resultado);
                setDepartamentos([]);
                crearMensaje('error', 'Error al cargar los departamentos: formato inválido');
            }
        } catch (error) {
            console.error('Error al cargar departamentos:', error);
            setDepartamentos([]);
            crearMensaje('error', 'Error al cargar los departamentos');
        } finally {
            setIsLoading(false);
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
        
        try {
            const municipioData = new Municipio(
                0,
                formData.nombreMunicipio,
                formData.capitalMunicipio,
                formData.codDepartament
            );
            
            const urlServicio = URLS.URL_BASE + URLS.CREAR_MUNICIPIOS;
            const resultado = await ServicioPost.peticionPost(urlServicio, municipioData);
            
            if (resultado.codMunicipio) {
                crearMensaje('success', 'Municipio creado exitosamente');
                navigate('/dashboard/adminMunicipality');
            } else {
                crearMensaje('error', 'Error al crear el municipio');
            }
        } catch (error) {
            console.error('Error al crear municipio:', error);
            crearMensaje('error', 'Error al procesar la solicitud');
        }
    };
    
    return (
        <div className="m-3">
            <div className="row">
                <div className="col-4">
                    <h4 className="fst-italic fw-bold display-5">Crear Municipio</h4>
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
                                <a href="#">Municipios</a>
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
                                        <Link to="/municipios/administrar" className="btn btn-secondary">
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