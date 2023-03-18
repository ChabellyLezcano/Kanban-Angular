import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Doctores } from './interfaces/doctores.interface';
import { DoctoresService } from './services/doctores.service';


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
})
export class DoctoresComponent {
  displayDialog = false; // provide an initializer here
  displayEditDialog = false; // add this variable
  
  opcionesCabecera = [
    { value: 'Dr.', label: 'Dr.' },
    { value: 'Dra.', label: 'Dra.' }
  ];

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

  doctores: Doctores[] = [];
  doctorSeleccionado: any;

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
          this.getDoctores(); // refresh the doctor's list after creation
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }


  // Call the service to get the inventory list
 ngOnInit(): void {
  this.getDoctores();
}


getDoctores() {
  this.doctoresService.getDoctores().subscribe(
    (response) => {
      this.doctores = response.doctores;
    },
    (error) => {
      console.log('Error al obtener el inventario:', error);
    }
  );
}

// DoctoresComponent

deleteDoctor(_id: string) {
  Swal.fire({
    title: '¿Está seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.doctoresService.deleteDoctor(_id).subscribe(
        () => {
          Swal.fire('Eliminado', 'Doctor eliminado correctamente', 'success');
          this.getDoctores(); // refresh the doctor's list after deletion
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
    }
  });
}

//Ver doctor por id
verDoctor(id: string) {
  this.doctoresService.getDoctorById(id).subscribe(
    (response) => {
      console.log(response); // Aquí podemos mostrar la respuesta en la consola o asignarla a una variable en el componente
      // Por ejemplo:
      const doctor = response.doctores;
      if (doctor) {
        // Asignamos el doctor encontrado a la propiedad doctorSeleccionado
        this.doctorSeleccionado = doctor;
      }
    },
    (error) => {
      console.log('Error al obtener el pacinete:', error);
    }
  );
}

//Editar doctor por Id


}
