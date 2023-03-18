export interface PacientesResponse {
    ok:       boolean;
    pacientes: Paciente[];
}

export interface Paciente {
    _id?:            string;
    name?:           string;
    email?:          string;
    apellidos?:      string;
    direccion?:      string;
    cp?:             string;
    dni?:            string;
    telefono_movil?: string;
    municipio?:      string;
    provincia?:      string;
    usuario?:        string;
    __v?:            number;
}