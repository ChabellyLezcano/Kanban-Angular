import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { HeadbarComponent } from './headbar/headbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeadbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    MenuModule
  ]
})
export class SharedModule { }