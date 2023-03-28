import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctores, DoctoresResponse } from '../interfaces/doctores.interface';

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

  //Listar doctores
  getDoctores() {
    const url = `${this.baseUrl}/doctor/listarDoctor`;
  
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
  
    return this.http.get<DoctoresResponse>(url, { headers });
  }

  // Borrar doctor

deleteDoctor(_id: string) {
  const url = `${this.baseUrl}/doctor/deleteDoctor/${_id}`;
  const headers = new HttpHeaders().set(
    'x-token',
    localStorage.getItem('token') || ''
  );
  return this.http.delete(url, { headers });
}

  // Ver doctor
  getDoctorById(_id: string) {
    const url = `${this.baseUrl}/doctor/verDoctor/${_id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    console.log(_id)
    return this.http.get<DoctoresResponse>(url, { headers });
  }

  //Servicio editar doctor por id
  editarDoctor(id: string, cabecera: string, name: string, apellidos: string, email: string, numColegiado: string, telefono_movil: string, especialidad: string, dni: string) {
    const url = `${this.baseUrl}/doctor/actualizarDoctor/${id}`;
    const body = {
      cabecera,
      name,
      apellidos,
      email,
      numColegiado,
      telefono_movil,
      especialidad,
      dni
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.put<DoctoresResponse>(url, body, { headers });
  }

}
