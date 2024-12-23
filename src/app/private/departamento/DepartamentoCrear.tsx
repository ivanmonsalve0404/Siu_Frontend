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
import { useFormulario } from '../../../utilities/myHocks/useFormulario';

export const DepartamentoCrear = () => {
    /* Inicio logica de negocio */
    // Variables
    // tipo para administracion del formulario
    type formaHtml = React.FormEvent<HTMLFormElement>;

    const [enProceso, setEnProceso] = useState<boolean>(false);
    let { nameDepartment, dobleEnlace, objeto } = useFormulario<Departamento>(new Departamento(0, ""));

    const navegacion = useNavigate();
    // *******************************************************************


    // Función para limpiar cajas
    const limpiarCajas = (formulario: HTMLFormElement) => {
        formulario.reset();
    
        objeto.codDepartament = 0;
        objeto.nameDepartment = "";
    
        // Utilizar querySelector para obtener los elementos del formulario
        const nombreInput = formulario.querySelector<HTMLInputElement>('input[name="nameDepartment"]');
    
        // Verificar si los inputs existen antes de asignarles un valor
        if (nombreInput) nombreInput.value = "";
    
        formulario.classList.remove("was-validated");
    };


    // Crear el Departamento
    // *******************************************************************
    const enviarFormulario = async (fh: formaHtml) => {
        fh.preventDefault();
        setEnProceso(true);
        const formulario = fh.currentTarget;
        formulario.classList.add("was-validated");

        if (formulario.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {
            const urlServicio = URLS.URL_BASE + URLS.CREAR_DEPARTAMENTOS;
            const resultado = await ServicioPost.peticionPost(urlServicio, objeto);
            console.log(resultado);

            if (resultado.codDepartament) {
                setEnProceso(false);
                crearMensaje("success", "Departamento creado con éxito");
                navegacion("/dashboard/adminDepartament");
            } else {
                crearMensaje("error", "Fallo  al crear el Departamento");
            }
            limpiarCajas(formulario);
        }
    };
    /* Fin logica de negocio */

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="col-md-8">
                <h4 className="fst-italic fw-bold text-center"> Registrar Departamento</h4>

                <div className="card mt-4">
                    <div className="card-header bg-dark text-center text-white">
                        <h5 className="fw-bold">Formulario Registrar</h5>
                    </div>
                    <div className="card-body">
                        <Form className="mt-4" validated={enProceso} onSubmit={enviarFormulario}>
                            <Form.Group className="mb-4" controlId='nameDepartment'>
                                <Form.Label>
                                    <span className='rojito'>*</span>{" "}
                                    Departamento</Form.Label>
                                <Form.Control type="text"
                                    name="nameDepartment"
                                    value={nameDepartment}
                                    onChange={dobleEnlace}
                                    autoFocus required />
                            </Form.Group>
                            
                            <span className="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="col-2" >
                                    Registrar
                                </Button>
                                <Link to="/admin" className="btn btn-danger mx-2 col-2"> Cancelar</Link>
                            </span>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    );
};