import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
  ],
  providers: [],
})

export class SharedModule { }
