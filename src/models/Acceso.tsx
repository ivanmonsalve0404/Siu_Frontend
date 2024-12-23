export class Acceso {
    public codeUser:number;
    public nombreAccess:string;
    public claveAccess:string;

    constructor(cod:number, nombre:string, clave:string){
        this.codeUser = cod;
        this.nombreAccess = nombre;
        this.claveAccess = clave;
    }
}