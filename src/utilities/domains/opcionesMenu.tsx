export const OPCIONES_MENU = [
    {
        titulo: "Inicio",
        ruta: "/dashboard/welcome",
        icono: "fa fa-home text-warning"
    },
    {
        titulo: "Roles",
        ruta: "/dashboard/roles",
        icono: "fa fa-user text-warning",
        hijos: [
            {
                titulo: "Administrar",
                ruta: "/dashboard/adminRole"
            },
            {
                titulo: "Listar",
                ruta: "/dashboard/listRole"
            },
            {
                titulo: "Registrar",
                ruta: "/dashboard/addRole"
            }
        ]
    },
    {
        titulo: "Usuarios",
        ruta: "/dashboard/usuarios",
        icono: "fa fa-user text-warning",
        hijos: [
            {
                titulo: "Administrar",
                ruta: "/dashboard/adminUser"
            },
            {
                titulo: "Listar",
                ruta: "/dashboard/listUser"
            },
            {
                titulo: "Registrar",
                ruta: "/dashboard/addUser"
            }
        ]
    },
    {
        titulo: "Departamentos",
        ruta: "/dashboard/departamentos",
        icono: "fa fa-user text-warning",
        hijos: [
            {
                titulo: "Administrar",
                ruta: "/dashboard/adminDepartament"
            },
            {
                titulo: "Listar",
                ruta: "/dashboard/listDepartament"
            },
            {
                titulo: "Registrar",
                ruta: "/dashboard/addDepartament"
            }
        ]
    },
    {
        titulo: "Municipios",
        ruta: "/dashboard/municipality",
        icono: "fa fa-map text-warning",
        hijos: [
            {
                titulo: "Administrar",
                ruta: "/dashboard/adminMunicipality"
            },
            {
                titulo: "Listar",
                ruta: "/dashboard/listMunicipality"
            },
            {
                titulo: "Registrar",
                ruta: "/dashboard/addMunicipality"
            }
        ]
    },
]