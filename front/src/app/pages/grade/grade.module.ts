import { NgModule } from '@angular/core';

import { GradeListComponent } from './list/grade-list.component';
import { RouterModule } from '@angular/router';
import { GradeRoutes } from './grade.routing';
import { SharedModule } from 'app/shared/shared.module';
import { GradeEditComponent } from './edit/grade-edit.component';


@NgModule({
  declarations: [
    GradeListComponent,
    GradeEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(GradeRoutes),
  ],
  exports: [
    GradeListComponent,
    GradeEditComponent
  ],
  providers: [],
})

export class GradeModule { }
