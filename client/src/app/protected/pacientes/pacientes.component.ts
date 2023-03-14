import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PacientesService } from './services/pacientes.service';
import { Paciente } from './interfaces/pacientes.interface';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent implements OnInit {
  displayDialog = false; // provide an initializer here
  get usuario() {
    return this.authService.usuario
  }

  pacientes: Paciente[] = [];

  miFormulario: FormGroup = this.fb.group({
    name: ['Sara', [Validators.required]],
    apellidos: ['Cerdeña Lara', [Validators.required]],
    telefono_movil: ['622747447', [Validators.required]],
    email: ['sara@gmail.com', [Validators.required, Validators.email]],
    dni: ['567840292-P', [Validators.required]],
    direccion: ['Avenida Fierro 12', [Validators.required]],
    cp: ['28004', [Validators.required]],
    municipio: ['Madrid', [Validators.required]],
    provincia: ['Madrid', [Validators.required]]
  });

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private pacientesService: PacientesService) {}

  showModalDialog() {
    this.displayDialog= true;
}

onHideDialog() {
  this.displayDialog = false;
}

paciente(){
  console.log(this.miFormulario.value)
  console.log(this.miFormulario.valid)

  const {name,
    apellidos,
    email,
    direccion,
    telefono_movil,
    dni,
    cp,
    municipio,
    provincia, } = this.miFormulario.value;

  this.pacientesService.paciente(name,
    apellidos,
    email,
    direccion,
    telefono_movil,
    dni,
    cp,
    municipio,
    provincia )
  .subscribe(
  (resp) => {
  Swal.fire('Éxito', 'Paciente creado correctamente', 'success');
  this.router.navigateByUrl('/pacientes');
  this.displayDialog = false;
  },
  (error) => {
  console.log(error);
  Swal.fire('Error', error.error.msg, 'error');


  }
  );
}

getPaciente() {
  this.pacientesService.getPaciente().subscribe(
    (response) => {
      this.pacientes = response.pacientes;
      console.log(response.pacientes)
    },
    (error) => {
      console.log(error);
      Swal.fire('Error', error.error.msg, 'error');
    }
  );
}

ngOnInit(): void {
  this.getPaciente();
}

}
