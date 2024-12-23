export class DatoSesion {
    public id: number;
    public nombre: string;
    public rol: string;
    public telefono: string;
    public acceso: string;

    constructor(id: number, nombre: string, rol: string, telefono: string, acceso: string) {
        this.id = id;
        this.nombre = nombre;
        this.rol = rol;
        this.telefono = telefono;
        this.acceso = acceso;
    }
}