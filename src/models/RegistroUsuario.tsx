export class RegistroUsuario {
    public codUser: number;
    public codRol: number;
    public nombreUser: string;
    public fechaNacimientoUser: Date;
    public telefonoUser: string;
    public generoUser: string;
    public nombreAccess: string;
    public claveAccess: string;

    constructor(codeUser: number, codeRol: number, nombreUsuario: string, fechaNacimientoUsuario: Date, telefonoUsuario: string, generoUsuario: string, nombreAcceso: string, claveAcceso: string) {
        this.codUser = codeUser;
        this.codRol = codeRol;
        this.nombreUser = nombreUsuario;
        this.fechaNacimientoUser = fechaNacimientoUsuario;
        this.telefonoUser = telefonoUsuario;
        this.generoUser = generoUsuario;
        this.nombreAccess = nombreAcceso;
        this.claveAccess = claveAcceso;
    }
}