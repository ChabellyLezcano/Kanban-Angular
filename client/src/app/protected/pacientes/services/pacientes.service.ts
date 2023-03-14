import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PacientesResponse } from '../interfaces/pacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {


  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  paciente(
    name: string,
    apellidos: string,
    email: string,
    direccion: string,
    telefono_movil: string,
    dni: string,
    cp: string,
    municipio: string,
    provincia: string
  )
  
  {
    const url = `${this.baseUrl}/paciente/addPaciente`;
    const body = {
      name,
    apellidos,
    email,
    direccion,
    telefono_movil,
    dni,
    cp,
    municipio,
    provincia,
    };

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<PacientesResponse>(url, body, { headers });
  }

  //Listar pacientes
  getPaciente() {
    const url = `${this.baseUrl}/paciente/listarPaciente`;
  
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
  
    return this.http.get<PacientesResponse>(url, { headers });
  }

}

