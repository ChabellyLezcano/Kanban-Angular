import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  sidebarVisible = false;

  get usuario() {
    console.log(this.authService.usuario)
    return this.authService.usuario
  }

  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.router.navigateByUrl("/auth");
    this.authService.logout();
  }
}
