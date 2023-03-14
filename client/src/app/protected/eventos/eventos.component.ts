import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';
import { EventoService } from '../eventos/services/evento.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
})
export class EventosComponent {
  displayDialog = false; // provide an initializer here

  time!: Date;
  date3!: Date;
  showTime="true"

  showModalDialog() {
    this.displayDialog = true;
  }

  onHideDialog() {
    this.displayDialog = false;
  }
  get usuario() {
    const usr = this.authService.usuario;
    return usr;
  }

  miFormulario: FormGroup = this.fb.group({
    titulo: ['Visita comercial de Colgate', [Validators.required]],
    descripcion: ['Prueba de productos de la nueva colección. Viene Elena', [Validators.required]],
    fecha: [new Date(), [Validators.required]],
    hora: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventoService: EventoService,
    private authService: AuthService
  ) {}

  evento() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const { titulo, descripcion, fecha , hora } = this.miFormulario.value;

    this.eventoService.evento(titulo, descripcion, fecha, hora).subscribe(
      (resp) => {
        console.log(resp);
        Swal.fire('Éxito', 'Evento creado correctamente', 'success');
        this.router.navigateByUrl('/eventos');
        this.displayDialog = false;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
  }
}
