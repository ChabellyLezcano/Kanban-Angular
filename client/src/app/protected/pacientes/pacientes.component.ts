import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PacientesService } from './services/pacientes.service';
import { Paciente } from './interfaces/pacientes.interface';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent implements OnInit {
  displayDialog = false;
  displayEditDialog = false; // add this variable

  globalFilter: string;
  rowsOptions = [10, 50, 100];
  rows = 10;


   showModalDialog() {
    this.displayDialog = true;
  }

  onHideDialog() {
    this.displayDialog = false;
  }

  pacientes: Paciente[] = [];
  pacienteSeleccionado: any;

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pacientesService: PacientesService
  ) {
    this.globalFilter = '';
  }

 

  addPaciente() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const {
      name,
      apellidos,
      email,
      direccion,
      telefono_movil,
      dni,
      cp,
      municipio,
      provincia,
    } = this.miFormulario.value;

    this.pacientesService
      .paciente(
        name,
        apellidos,
        email,
        direccion,
        telefono_movil,
        dni,
        cp,
        municipio,
        provincia
      )
      .subscribe(
        (resp) => {
          Swal.fire('Éxito', 'Paciente creado correctamente', 'success');
          this.router.navigateByUrl('/pacientes');
          this.displayDialog = false;
          this.getPacientes();
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }

    ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.pacientesService.getPaciente().subscribe(
      (response) => {
        this.pacientes = response.pacientes;
        console.log(response.pacientes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
  }



  deletePaciente(_id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacientesService.deletePaciente(_id).subscribe(
          (resp) => {
            Swal.fire(
              'Borrado', 'Doctor eliminado correctamente', 'success');
          this.getPacientes(); // refresh the doctor's list after deletion
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
    }
  });
}

// Implement the search function
applyGlobalFilter() {
  this.pacientes = this.pacientes.filter((paciente) => {
    return paciente && paciente.name && paciente.name.toLowerCase().includes(this.globalFilter.toLowerCase());
  });
}


onRowsChange(value: number) {
  this.rows = value;
}

verPaciente(id: string) {
  this.pacientesService.getPacienteById(id).subscribe(
    (response) => {
      console.log(response); // Aquí podemos mostrar la respuesta en la consola o asignarla a una variable en el componente
      // Asignamos los valores del paciente encontrado a la propiedad pacienteSeleccionado
      this.pacienteSeleccionado = response;
    },
    (error) => {
      console.log('Error al obtener el paciente:', error);
    }
  );
}

}
