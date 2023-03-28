import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DoctoresComponent } from './doctores/doctores.component';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
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
import {ToolbarModule} from 'primeng/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import {SidebarModule} from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import {HeadbarComponent} from '../shared/headbar/headbar.component'


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
    PresupuestosComponent,
    HeadbarComponent // add this line
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule, 
    PrimeNgModule,
    ButtonModule,
    DialogModule, TableModule,
    TreeSelectModule,
    FormsModule,
    ToolbarModule,
    FontAwesomeModule,
    PanelModule,
    DropdownModule,
    SidebarModule,
    MenuModule
  ]
})
export class ProtectedModule { }