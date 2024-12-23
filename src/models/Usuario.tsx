import { Rol } from "./Rol";

export class Usuario {
    public codUser: number;
    public codRol: number;
    public nombreUser: string;
    public fechaNacimientoUser: Date;
    public telefonoUser: string;
    public generoUser: number;
    
    public codRoleUser?: Rol;

    constructor(codUsuario: number, codRol: number, nombreUsuario: string, fechaNacimientoUsuario: Date, telefonoUser: string, generoUseer: number) {
        this.codUser = codUsuario;
        this.codRol = codRol;
        this.nombreUser = nombreUsuario;
        this.fechaNacimientoUser = fechaNacimientoUsuario;
        this.telefonoUser = telefonoUser;
        this.generoUser = generoUseer;
    }
}