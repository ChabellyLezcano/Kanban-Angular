import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['Juana', [Validators.required]],
    email: ['juana@gmail.com', [Validators.required, Validators.email]],
    password: ['Hola123456@', [Validators.required, Validators.minLength(8)]],
    validatePassword: [
      'Hola123456@',
      [Validators.required, Validators.minLength(8)],
    ],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  registro() {
    const { nombre, email, password, validatePassword } = this.miFormulario.value;

    this.authService.registro( nombre, email, password, validatePassword )
      .subscribe( ok => {

        if ( ok === true ) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });

  }
}
