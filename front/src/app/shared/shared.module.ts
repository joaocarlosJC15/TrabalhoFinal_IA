import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
