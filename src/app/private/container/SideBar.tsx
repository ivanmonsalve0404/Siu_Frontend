import { useState } from "react";
import { NavItem } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import SimpleBar from "simplebar-react";
import logo from "../../../assets/img/logoApp.png";
import fotoAvatar from "../../../assets/img/perfil.jpg";
import { OPCIONES_MENU } from "../../../utilities/domains/opcionesMenu";
import { jwtDecode } from "jwt-decode";


export const SideBar = () => {
    /**Inicio Lógica de Negocio */
    const [show, setShow] = useState(false);
    const showClass = show ? "show" : "";
    const onCollapse = () => setShow(!show);

    const [arrOpciones] = useState<any[]>(OPCIONES_MENU);
    const ubicacion = useLocation();

    const token: any = localStorage.getItem("TOKEN_AUTORIZACION");
    const datosUsuario: any = jwtDecode(token);
    /**Fin Lógica de Negocio */

    const indice = 0;
    const subIndice = 0;
    const opcion = { icono: "fa-icon", titulo: "Option Title" };

    return (
        <div>
            <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
                <Navbar.Brand className="me-lg-5" /* as={Link} to={Routes.DashboardOverview.path} */>
                    <img src="" className="navbar-brand-light" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" onClick={onCollapse}>
                    <span className="navbar-toggler-icon" />
                </Navbar.Toggle>
            </Navbar>
            <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
                <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                    <div className="sidebar-inner px-4 pt-3">
                        <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                            <div className="d-flex align-items-center">
                                <div className="lg-avatar me-4">
                                    <img src={fotoAvatar} className="card-img-top rounded-circle border-white" height={"50px"} width={"50px"} />
                                </div>
                                <div className="d-block">
                                    <h6>{datosUsuario.acceso}</h6>
                                    <button className="btn btn-sm btn-danger">
                                        Cerrar Sesion
                                    </button>
                                </div>
                            </div>
                            <Nav.Link className="collapse-close d-md-none btn-close" onClick={onCollapse}>
                                <i className="fa fa-x"></i>
                            </Nav.Link>
                        </div>
                        {/*  */}
                        <ul className="nav flex-column pt-3 pt-md-0">
                            <li className="nav-item">
                                <Link to="/dash" className="nav-link d-flex align-items-center">
                                    <span className="sidebar-icon">
                                        <img src={logo} alt="" height={"50px"} />
                                    </span>
                                    <span className="fst-italic sidebar-text display-5">SIU</span>
                                </Link>
                            </li>
                            {
                                arrOpciones.map((opcion, indice) => (
                                    opcion.hijos?.length ?
                                        /**Acá va la logica para los hijos */
                                        <NavItem className="nav-item" key={indice}>
                                            <Link to={opcion.ruta} className="nav-link collapsed py-3"
                                                data-bs-toggle="collapse"
                                                data-bs-target={"#menu_" + indice}>
                                                <span className="sidebar-icon">
                                                    <i className={opcion.icono}></i>
                                                </span>
                                                <span className="sidebar-text">{opcion.titulo}</span>
                                            </Link>
                                            <ul id={"menu_" + indice} className="flex-column collapse" data-bs-parent="#sidebar-nav">
                                                {
                                                    opcion.hijos.map((opcionHijo: any, subIndice: number) => (
                                                        <NavItem className="nav-item" key={'menu_' + subIndice}>
                                                            <Link to={opcionHijo.ruta} className={
                                                                ubicacion.pathname === opcionHijo.ruta ?
                                                                    "nav-link active bg-secondary-app"
                                                                    :
                                                                    "nav-link"
                                                            }>
                                                                <span className="sidebar-text">{opcionHijo.titulo}</span>
                                                            </Link>
                                                        </NavItem>
                                                    ))
                                                }
                                            </ul>
                                        </NavItem>
                                        :
                                        /**Acá va la logica para las opciones básicas */
                                        <NavItem className="nav-item" key={indice}>
                                            <Link to={opcion.ruta} className={
                                                ubicacion.pathname === opcion.ruta ? "active bg-secondary-app nav-link"
                                                    :
                                                    "nav-link"
                                            }>
                                                <span className="sidebar-icon">
                                                    <i className={opcion.icono}></i>
                                                </span>
                                                <span className="sidebar-text">{opcion.titulo}</span>
                                            </Link>
                                        </NavItem>

                                ))
                            }
                        </ul>
                    </div>
                </SimpleBar>
            </CSSTransition>

        </div>
    );
}