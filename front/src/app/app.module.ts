import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SharedModule} from 'app/shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { GradeGuard } from './shared/guards/grade-guard.service'

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
  providers: [GradeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
