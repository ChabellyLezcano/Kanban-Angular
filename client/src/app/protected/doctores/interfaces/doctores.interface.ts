export interface DoctoresResponse {
    ok:       boolean;
    doctores: Doctores[];
}

export interface Doctores {
    _id:            string;
    cabecera:       string;
    name:           string;
    apellidos:      string;
    email:          string;
    numColegiado:   string;
    telefono_movil: string;
    especialidad:   string;
    __v:            number;
    foto?:          string;
    dni?:           string;
    usuario?:       string;
}