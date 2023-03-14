export interface EventosResponse {
    ok:     boolean;
    evento: Evento[];
}

export interface Evento {
    _id:         string;
    titulo:      string;
    descripcion: string;
    hora:        Date;
    fecha:       Date;
    usuario:     string;
    __v:         number;
}