import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DoctoresResponse } from '../interfaces/doctores.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctoresService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  doctor(
    cabecera: string,
    name: string,
    apellidos: string,
    email: string,
    numColegiado: string,
    telefono_movil: string,
    especialidad: string,
    dni: string
  ) {
    const url = `${this.baseUrl}/doctor/addDoctor`;
    const body = {
      cabecera,
      name,
      apellidos,
      email,
      numColegiado,
      telefono_movil,
      especialidad,
      dni,
    };

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<DoctoresResponse>(url, body, { headers });
  }
}
