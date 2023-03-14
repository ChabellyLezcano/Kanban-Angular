import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TratamientosService } from './services/tratamientos.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
})
export class TratamientosComponent {
  displayDialog = false; // provide an initializer here

  get usuario() {
    return this.authService.usuario;
  }

  miFormulario: FormGroup = this.fb.group({
    name: ['Ortodoncia infantil', [Validators.required]],
    categoria: ['Ortodoncia', [Validators.required]],
    precio: ['500', [Validators.required]],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private tratamientoService: TratamientosService
  ) {}

  showModalDialog() {
    this.displayDialog = true;
  }

  onHideDialog() {
    this.displayDialog = false;
  }

 tratamiento(){
    console.log(this.miFormulario.value)
    console.log(this.miFormulario.valid)
  
    const {name,
      categoria,
      precio } = this.miFormulario.value;
  
    this.tratamientoService.trataminto(name,
      categoria,
      precio)
    .subscribe(
    (resp) => {
    Swal.fire('Éxito', 'Tratamiento creado correctamente', 'success');
    this.router.navigateByUrl('/tratamientos');
    this.displayDialog = false;
    },
    (error) => {
    console.log(error);
    Swal.fire('Error', error.error.msg, 'error');
    }
    );
  }
}
