import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    email: ['juana@gmail.com', [Validators.required, Validators.email]],
    password: ['Hola123456@', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  login() {
    const {email, password} = this.miFormulario.value

    this.authService.login(email, password)
    .subscribe( ok => {
      if(ok === true){
      this.router.navigateByUrl('/dashboard');
      }
      else {
        Swal.fire('Error', ok, 'error');
      }
    })

    
  }
}
