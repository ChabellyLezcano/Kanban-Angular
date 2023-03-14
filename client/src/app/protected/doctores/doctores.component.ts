import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { DoctoresService } from './services/doctores.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
})
export class DoctoresComponent {
  displayDialog = false; // provide an initializer here

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
    cabecera: ['Dra.', [Validators.required]],
    name: ['Elena', [Validators.required]],
    apellidos: ['Rivero Vasco', [Validators.required]],
    email: ['elena@gmail.com', [Validators.required]],
    numColegiado: ['2800292', [Validators.required]],
    telefono_movil: ['623210929', [Validators.required]],
    especialidad: ['Implantología', [Validators.required]],
    dni: ['50234810-Q', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctoresService: DoctoresService,
    private authService: AuthService,
  ) {}

  doctor() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const {
      cabecera,
      name,
      apellidos,
      email,
      numColegiado,
      telefono_movil,
      especialidad,
      dni
    } = this.miFormulario.value;

    this.doctoresService
      .doctor(
        cabecera,
      name,
      apellidos,
      email,
      numColegiado,
      telefono_movil,
      especialidad,
      dni
      )
      .subscribe(
        (resp) => {
          console.log(resp);
          Swal.fire('Éxito', 'Doctor creado correctamente', 'success');
          this.router.navigateByUrl('/doctores');
          this.displayDialog = false;
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }
}
