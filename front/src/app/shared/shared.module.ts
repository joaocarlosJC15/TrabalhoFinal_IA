import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { FormatTimePipe } from './pipes/format-time.pipe';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DatatableComponent,
    FormatTimePipe
  ],
  imports: [
    NgxDatatableModule,
    NgbModule,
    NgbNavModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NgxDatatableModule,
    NgbModule,
    NgbNavModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DatatableComponent,
    FormatTimePipe
  ],
  providers: [
    FormatTimePipe
  ],
})

export class SharedModule { }
