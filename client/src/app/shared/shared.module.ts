import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'ng-sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [NavbarComponent],
  imports: [SidebarModule.forRoot(),
    CommonModule, ButtonModule, MenuModule
  ]
})
export class SharedModule { }
