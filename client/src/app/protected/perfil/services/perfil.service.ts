import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  perfil(
    direccion: string,
    telefono_movil: string,
    telefono_fijo: string,
    cp: string,
    nif: string,
    municipio: string,
    provincia: string
  ) {
    const url = `${this.baseUrl}/perfil/addPerfil`;
    const body = {
      direccion,
      telefono_movil,
      telefono_fijo,
      municipio,
      provincia,
      cp,
      nif,
    };

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<any>(url, body, { headers });
  }
}
