import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventosResponse } from '../interfaces/eventos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  evento(
    titulo: string,
    descripcion: string,
    fecha: string,
    hora: string
  ) {
    const url = `${this.baseUrl}/eventos/addEvento`;
    const body = {
      titulo,
    descripcion,
    fecha,
    hora
    };

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<EventosResponse>(url, body, { headers });
  }
}
