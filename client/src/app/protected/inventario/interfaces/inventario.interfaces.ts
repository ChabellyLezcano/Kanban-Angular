export interface InventarioResponse{
  //ok: boolean,
  producto: Producto[];
}

export interface Producto {
  _id:            string;
  codigoProducto: string;
  name:           string;
  categoria:      string;
  marca:          string;
  descripcion:    string;
  precio:         string;
  unidades:       string;
  fecha:          Date;
  usuario:        string;
  __v:            number;
}