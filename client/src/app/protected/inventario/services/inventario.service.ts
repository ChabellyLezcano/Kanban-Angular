import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InventarioResponse, Producto } from '../interfaces/inventario.interfaces';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  inventario(
    codigoProducto: string,
    name: string,
    categoria: string,
    marca: string,
    descripcion: string,
    precio: string,
    unidades: string,
    fecha: string
  ) {
    const url = `${this.baseUrl}/inventario/addProducto`;
    const body = {
      codigoProducto,
      name,
      categoria,
      marca,
      descripcion,
      precio,
      unidades,
      fecha,
    };

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<InventarioResponse>(url, body, { headers });
  }

  //Listar productos
  getInventario() {
    const url = `${this.baseUrl}/inventario/listarProductos`;
  
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
  
    return this.http.get<InventarioResponse>(url, { headers });
  }
  
}
