import { NgModule } from '@angular/core';

import { GerarHorarioComponent } from './gerarHorario.component';
import { RouterModule } from '@angular/router';
import { GerarHorarioRoutes } from './gerarHorario.routing';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    GerarHorarioComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(GerarHorarioRoutes),
  ],
  exports: [
    GerarHorarioComponent
  ],
  providers: [],
})

export class GerarHorarioModule { }
