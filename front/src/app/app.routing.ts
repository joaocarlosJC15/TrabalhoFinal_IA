import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { ALL_ROUTES } from './shared/routes/all.routes';
import { GradeGuard } from './shared/guards/grade-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'grades',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: 'app/pages/grade/grade.module#GradeModule'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: ALL_ROUTES,
    canActivate: [GradeGuard]
  },
  {
    path: '**',
    redirectTo: 'grades'
  }
]
