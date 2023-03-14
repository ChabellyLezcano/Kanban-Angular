export interface TratamientosResponse {
    tratamientos: Tratamiento[];
}

export interface Tratamiento {
    _id:       string;
    name:      string;
    categoria: string;
    precio:    number;
    usuario:   string;
    __v:       number;
}