import { Routes } from '@angular/router';
import { GradeListComponent } from './list/grade-list.component';
import { GradeEditComponent } from './edit/grade-edit.component';

export const GradeRoutes: Routes = [
  { path: 'grades', component: GradeListComponent },
  { path: 'grades/novo', component: GradeEditComponent },
];
