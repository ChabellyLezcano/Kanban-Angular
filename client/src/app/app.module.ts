import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { SidebarModule } from 'ng-sidebar';
import { DialogModule } from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TreeSelectModule} from 'primeng/treeselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import {MenuModule} from 'primeng/menu';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNgModule,
    SidebarModule,
    DialogModule,
    BrowserAnimationsModule,
    TreeSelectModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule,
    FontAwesomeModule,
    TableModule,
    MenuModule

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
