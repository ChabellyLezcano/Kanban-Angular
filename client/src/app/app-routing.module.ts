import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { DoctoresComponent } from './protected/doctores/doctores.component';
import { EstadisticasComponent } from './protected/estadisticas/estadisticas.component';
import { EventosComponent } from './protected/eventos/eventos.component';
import { InventarioComponent } from './protected/inventario/inventario.component';
import { PacientesComponent } from './protected/pacientes/pacientes.component';
import { PerfilComponent } from './protected/perfil/perfil.component';
import { PresupuestosComponent } from './protected/presupuestos/presupuestos.component';
import { TratamientosComponent } from './protected/tratamientos/tratamientos.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'pacientes',
    component: PacientesComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'doctores',
    component: DoctoresComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'tratamientos',
    component: TratamientosComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'eventos',
    component: EventosComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'presupuestos',
    component: PresupuestosComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'inventario',
    component: InventarioComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
