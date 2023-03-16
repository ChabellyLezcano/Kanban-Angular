import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TratamientosResponse } from '../interfaces/tratamientos.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TratamientosService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

 trataminto(name: string, categoria: string, precio: number) {
    const url = `${this.baseUrl}/tratamientoLista/addTratamientoLista`;
    const body = {
      name,
      categoria,
      precio,
    };

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<TratamientosResponse>(url, body, { headers });
  }

  //Listar tratamientos
  getTratamientos() {
    const url = `${this.baseUrl}/tratamientoLista/listarTratamientoLista`;
  
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
  
    return this.http.get<TratamientosResponse>(url, { headers });
  }

   // Borrar tratamiento

deleteTratamiento(_id: string) {
  const url = `${this.baseUrl}/tratamientoLista/deleteTratamientoLista/${_id}`;
  const headers = new HttpHeaders().set(
    'x-token',
    localStorage.getItem('token') || ''
  );
  return this.http.delete(url, { headers });
}
}
