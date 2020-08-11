import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SharedModule} from 'app/shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { MainLayoutComponent } from './layouts/main/main-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
