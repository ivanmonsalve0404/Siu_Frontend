import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Sesion } from "../app/public/Sesion";
import { Registro } from "../app/public/Registro";
import { DashBoard } from "../app/private/container/DashBoard";
import { Error } from "../app/shared/Error";
import { Vigilante } from "../security/Vigilante";

const LazySesion = lazy(() => import('../app/public/Sesion').then(() => ({default: Sesion})));
const LazyRegistro = lazy(() => import('../app/public/Registro').then(() => ({default: Registro})));

const LazyError = lazy(() => import('../app/shared/Error').then(() => ({default: Error})));
const LazyDash = lazy(() => import('../app/private/container/DashBoard').then(() => ({default: DashBoard})));
    
export const RuteoPrincipal = () => {
    return (
        <Routes>
            <Route path="/login" element={<LazySesion />} />
            <Route path="/register" element={<LazyRegistro />} />
            <Route element={<Vigilante />}>
                <Route path="/dashboard/*" element={<LazyDash />}/>
            </Route>

            /** Las rutas obligatorias */
            <Route path="/" element={<LazySesion />} />
            <Route path="*" element={<LazyError />} />
        </Routes>
    )
};