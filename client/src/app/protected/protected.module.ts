import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DoctoresComponent } from './doctores/doctores.component';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { PacientesComponent } from './pacientes/pacientes.component';
import { DialogModule } from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {TreeSelectModule} from 'primeng/treeselect';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { EventosComponent } from './eventos/eventos.component';
import { FormsModule } from '@angular/forms';
import { InventarioComponent } from './inventario/inventario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PresupuestosComponent } from './presupuestos/presupuestos.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PerfilComponent,
    PacientesComponent,
    DoctoresComponent,
    TratamientosComponent,
    EventosComponent,
    InventarioComponent,
    EstadisticasComponent,
    PresupuestosComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule, 
    PrimeNgModule,
    SharedModule,
    ButtonModule,
    DialogModule, TableModule,
    TreeSelectModule,
    FormsModule
  ]
})
export class ProtectedModule { }