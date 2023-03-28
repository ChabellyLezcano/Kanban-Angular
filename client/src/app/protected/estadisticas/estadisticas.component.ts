import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent {
  sidebarOpen = false;

closeSidebar() {
  this.sidebarOpen = false;
}

openSidebar() {
  this.sidebarOpen = true;
}
constructor(private router: Router, private authService: AuthService){}
logout() {
  this.router.navigateByUrl('/auth');
  this.authService.logout();
}
}
