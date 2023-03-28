import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{
  sidebarOpen = false;
  sidebarWidth = 200;

  closeSidebar() {
    this.sidebarOpen = false;
    setTimeout(() => this.sidebarWidth = 0, 500);
  }

  openSidebar() {
    this.sidebarOpen = true;
    setTimeout(() => this.sidebarWidth = 200, 0);
  }

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.sidebarOpen = false;
        this.sidebarWidth = 0;
      }
    });
  }

  ngOnInit(): void {
  }
}