import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Error } from "../app/shared/Error";
import { Welcome } from "../app/private/container/Welcome";
import { MunicipioListar } from "../app/private/municipio/MunicipioListar";
import { MunicipioAdministrar } from "../app/private/municipio/MunicipioAdministrar";
import { MunicipioCrear } from "../app/private/municipio/MunicipioCrear";
import { MunicipioActualizar } from "../app/private/municipio/MunicipioActualizar";
import { DepartamentoListar } from "../app/private/departamento/DepartamentoListar";
import { DepartamentoAdministrar } from "../app/private/departamento/DepartamentoAdministrar";
import { DepartamentoCrear } from "../app/private/departamento/DepartamentoCrear";
import { DepartamentoActualizar } from "../app/private/departamento/DepartamentoActualizar";
import { RolListar } from "../app/private/rol/RolListar";
import { RolAdministrar } from "../app/private/rol/RolAdministrar";
import { RolCrear } from "../app/private/rol/RolCrear";
import { RolActualizar } from "../app/private/rol/RolActualizar";
import { UsuarioListar } from "../app/private/usuario/UsuarioListar";
import { UsuarioAdministrar } from "../app/private/usuario/UsuarioAdministrar";
import { UsuarioCrear } from "../app/private/usuario/UsuarioCrear";
import { UsuarioActualizar } from "../app/private/usuario/UsuarioActualizar";

const LazyBienvenida = lazy(() => import('../app/private/container/Welcome').then(() => ({ default: Welcome })));
const LazyError = lazy(() => import('../app/shared/Error').then(() => ({ default: Error })));

/**Rutas componente privado */

const LazyMunicipioListar = lazy(() => import('../app/private/municipio/MunicipioListar').then(() => ({ default: MunicipioListar })));
const LazyMunicipioAdministrar = lazy(() => import('../app/private/municipio/MunicipioAdministrar').then(() => ({ default: MunicipioAdministrar })));
const LazyMunicipioCrear = lazy(() => import('../app/private/municipio/MunicipioCrear').then(() => ({ default: MunicipioCrear })));
const LazyMunicipioActualizar = lazy(() => import('../app/private/municipio/MunicipioActualizar').then(() => ({ default: MunicipioActualizar })));

const LazyDepartamentoListar = lazy(() => import('../app/private/departamento/DepartamentoListar').then(() => ({ default: DepartamentoListar })));
const LazyDepartamentoAdministrar = lazy(() => import('../app/private/departamento/DepartamentoAdministrar').then(() => ({ default: DepartamentoAdministrar })));
const LazyDepartamentoCrear = lazy(() => import('../app/private/departamento/DepartamentoCrear').then(() => ({ default: DepartamentoCrear })));
const LazyDepartamentoActualizar = lazy(() => import('../app/private/departamento/DepartamentoActualizar').then(() => ({ default: DepartamentoActualizar })));

const LazyRolListar = lazy(() => import('../app/private/rol/RolListar').then(() => ({ default: RolListar })));
const LazyRolAdministrar = lazy(() => import('../app/private/rol/RolAdministrar').then(() => ({ default: RolAdministrar })));
const LazyRolCrear = lazy(() => import('../app/private/rol/RolCrear').then(() => ({ default: RolCrear })));
const LazyRolActualizar = lazy(() => import('../app/private/rol/RolActualizar').then(() => ({ default: RolActualizar })));

const LazyUsuarioListar = lazy(() => import('../app/private/usuario/UsuarioListar').then(() => ({ default: UsuarioListar })));
const LazyUsuarioAdministrar = lazy(() => import('../app/private/usuario/UsuarioAdministrar').then(() => ({ default: UsuarioAdministrar })));
const LazyUsuarioCrear = lazy(() => import('../app/private/usuario/UsuarioCrear').then(() => ({ default: UsuarioCrear })));
const LazyUsuarioActualizar = lazy(() => import('../app/private/usuario/UsuarioActualizar').then(() => ({ default: UsuarioActualizar })));

export const RuteoInterno = () => {
    return (
        <Routes>
            {/* Rutas contenido */}
            <Route path="/welcome" element={<LazyBienvenida />} />
            <Route path="/listMunicipality" element={<LazyMunicipioListar />} />
            <Route path="/adminMunicipality" element={<LazyMunicipioAdministrar />} />
            <Route path="/addMunicipality" element={<LazyMunicipioCrear />} />
            <Route path="/updateMunicipality/:codMunicipio" element={<LazyMunicipioActualizar />} />

            <Route path="/listDepartament" element={<LazyDepartamentoListar />} />
            <Route path="/adminDepartament" element={<LazyDepartamentoAdministrar />} />
            <Route path="/addDepartament" element={<LazyDepartamentoCrear />} />
            <Route path="/updateDepartament/:codDepartament" element={<LazyDepartamentoActualizar />} />

            <Route path="/listRole" element={<LazyRolListar />} />
            <Route path="/adminRole" element={<LazyRolAdministrar />} />
            <Route path="/addRole" element={<LazyRolCrear />} />
            <Route path="/updateRole/:codRol" element={<LazyRolActualizar />} />

            <Route path="/listUser" element={<LazyUsuarioListar />} />
            <Route path="/adminUser" element={<LazyUsuarioAdministrar />} />
            <Route path="/addUser" element={<LazyUsuarioCrear />} />
            <Route path="/updateUser/:codUser" element={<LazyUsuarioActualizar />} />

            {/** <Route path="*" element={<lazyError />} />*/}

            {/* Rutas obligatorias */}
            <Route path="/" element={<LazyBienvenida />} />
            <Route path="*" element={<LazyError />} />
        </Routes>
    );
}