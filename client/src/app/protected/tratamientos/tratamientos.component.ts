import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TratamientosService } from './services/tratamientos.service';
import { Tratamiento } from './interfaces/tratamientos.interfaces';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
})
export class TratamientosComponent {
  displayDialog = false; // provide an initializer here

  get usuario() {
    return this.authService.usuario;
  }

logout() {
  this.router.navigateByUrl('/auth');
  this.authService.logout();
}

  sidebarOpen = false;

  closeSidebar() {
    this.sidebarOpen = false;
  }
  
  openSidebar() {
    this.sidebarOpen = true;
  }

  tratamientos: Tratamiento[] = [];
  globalFilter: string;
  rowsOptions = [10, 50, 100];
rows = 10;

  miFormulario: FormGroup = this.fb.group({
    name: ['Ortodoncia infantil', [Validators.required]],
    categoria: ['Ortodoncia', [Validators.required]],
    precio: ['500', [Validators.required]],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private tratamientoService: TratamientosService,
  ) { this.globalFilter = ''; }

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
    this.getTratamiento();
    },
    (error) => {
    console.log(error);
    Swal.fire('Error', error.error.msg, 'error');
    }
    );
  }

   // Call the service to get the inventory list
 ngOnInit(): void {
  this.getTratamiento();
}


getTratamiento() {
  this.tratamientoService.getTratamientos().subscribe(
    (response) => {
      this.tratamientos = response.tratamientos;
    },
    (error) => {
      console.log('Error al obtener el inventario:', error);
    }
  );
}
  // Implement the search function
  applyGlobalFilter() {
    this.tratamientos = this.tratamientos.filter((tratamiento: Tratamiento) => {
      return tratamiento.name.toLowerCase().includes(this.globalFilter.toLowerCase()) ||
             tratamiento.categoria.toLowerCase().includes(this.globalFilter.toLowerCase()) ||
             tratamiento.precio.toString().toLowerCase().includes(this.globalFilter.toLowerCase());
    });
  }

  onRowsChange(value: number) {
    this.rows = value;
  }


  deleteTratamiento(_id: string) {
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
        this.tratamientoService.deleteTratamiento(_id).subscribe(
          () => {
            Swal.fire('Eliminado', 'Doctor eliminado correctamente', 'success');
            this.getTratamiento(); // refresh the doctor's list after deletion
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.error.msg, 'error');
          }
        );
      }
    });
  }
}
