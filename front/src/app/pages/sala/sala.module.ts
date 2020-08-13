import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SalaListComponent } from './list/sala-list.component';
import { RouterModule } from '@angular/router';
import { SalaRoutes } from './sala.routing';

@NgModule({
  declarations: [
    SalaListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(SalaRoutes),
  ],
  exports: [
    SalaListComponent
  ],
  providers: [],
})

export class SalaModule { }
