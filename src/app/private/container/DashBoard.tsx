import { useEffect, useState } from "react";
import { RuteoInterno } from "../../../routes/RuteoInterno";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export const DashBoard = () => {

    /**Inicio lógica del negocio */
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        
        return () => {
            // Limpiar cualquier suscripción o efecto pendiente
        };
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    /**Fin lógica del negocio */

    return (
        <div className="dashboard-container">
            <SideBar />
            <main className="content">
                <Header />
                <div className="m-2">
                    <RuteoInterno />
                </div>
            </main>
        </div>
    );
}