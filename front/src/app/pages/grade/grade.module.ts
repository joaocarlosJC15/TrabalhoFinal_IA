import { NgModule } from '@angular/core';

import { GradeComponent } from './grade.component';
import { RouterModule } from '@angular/router';
import { GradeRoutes } from './grade.routing';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    GradeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(GradeRoutes),
  ],
  exports: [
    GradeComponent
  ],
  providers: [],
})

export class GradeModule { }
