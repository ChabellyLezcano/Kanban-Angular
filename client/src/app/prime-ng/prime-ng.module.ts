import { NgModule } from '@angular/core';


//Prime NG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TreeSelectModule} from 'primeng/treeselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  exports: [ButtonModule, CardModule, InputTextModule,
     CalendarModule, SidebarModule, InputTextareaModule, ConfirmDialogModule, MessageModule, MessagesModule, TreeSelectModule],
  declarations: [],
  imports: [
    
  ]
})
export class PrimeNgModule { }
