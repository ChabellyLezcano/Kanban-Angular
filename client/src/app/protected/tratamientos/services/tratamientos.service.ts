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
}
