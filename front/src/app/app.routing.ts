import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { ALL_ROUTES } from './shared/routes/all.routes';
import { GradeRoutes } from './pages/grade/grade.routing';

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
    children: ALL_ROUTES
  },
  {
    path: '**',
    redirectTo: 'grades'
  }
]
