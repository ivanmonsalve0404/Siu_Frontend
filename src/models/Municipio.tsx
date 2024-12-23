import { Departamento } from "./Departamento";

export class Municipio {
    public codMunicipio:number;
    public nombreMunicipio:string;
    public capitalMunicipio:string;
    public codDepartament:number;

    public codDepartmentoMun?: Departamento;

    constructor(codMuni:number, nombreMuni:string, capitalMuni:string, codDep:number){
        this.codMunicipio = codMuni;
        this.nombreMunicipio = nombreMuni;
        this.capitalMunicipio = capitalMuni;
        this.codDepartament = codDep;
    }

}