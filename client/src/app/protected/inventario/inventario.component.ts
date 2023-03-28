import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { InventarioResponse, Producto } from './interfaces/inventario.interfaces';
import { InventarioService } from './services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html'
})
export class InventarioComponent implements OnInit{

  displayDialog = false; // provide an initializer here
  globalFilter: string;
  rowsOptions = [10, 50, 100];
  rows = 10;


logout() {
  this.router.navigateByUrl('/auth');
  this.authService.logout();
}

  productos: Producto[] = [];
  productosHtml: string[] = [];

  time!: Date;
  date3!: Date;
  showTime="true"

  sidebarOpen = false;

closeSidebar() {
  this.sidebarOpen = false;
}

openSidebar() {
  this.sidebarOpen = true;
}
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
    codigoProducto: ['123Kjh8n', [Validators.required]],
    name: ['Guantes de látex', [Validators.required]],
    categoria: ['Material deshechable', [Validators.required]],
    marca: ['Guantex', [Validators.required]],
    descripcion: ['Guantes de látex azules talla M', [Validators.required]],
    precio: ['20', [Validators.required]],
    unidades: ['1', [Validators.required]],
    fecha: ['12/05/2019'],
  });



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventarioService: InventarioService,
    private authService: AuthService,
  ) {this.globalFilter = '';}

  inventario() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const { codigoProducto,
      name,
      categoria,
      marca,
      descripcion,
      precio,
      unidades,
      fecha,} = this.miFormulario.value;

    this.inventarioService.inventario(codigoProducto,
      name,
      categoria,
      marca,
      descripcion,
      precio,
      unidades,
      fecha).subscribe(
      (resp) => {
        console.log(resp);
        Swal.fire('Éxito', 'Producto añadido correctamente', 'success');
        this.router.navigateByUrl('/inventario');
        this.displayDialog = false;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
  }

 // Call the service to get the inventory list
 ngOnInit(): void {
  this.getInventario();
}


getInventario() {
  this.inventarioService.getInventario().subscribe(
    (response) => {
      this.productos = response.producto;
    },
    (error) => {
      console.log('Error al obtener el inventario:', error);
    }
  );
}

deleteProducto(_id: string) {
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
      this.inventarioService.deleteProducto(_id).subscribe(
        (resp) => {
          Swal.fire(
            'Borrado', 'Doctor eliminado correctamente', 'success');
        this.getInventario(); // refresh the doctor's list after deletion
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
  this.productos = this.productos.filter((producto) => {
    return producto && producto.name && producto.name.toLowerCase().includes(this.globalFilter.toLowerCase());
  });
}


onRowsChange(value: number) {
  this.rows = value;
}
}

