import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatatableComponent } from './components/datatable/datatable.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DatatableComponent
  ],
  imports: [
    NgxDatatableModule,
    NgbModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxDatatableModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DatatableComponent
  ],
  providers: [],
})

export class SharedModule { }
