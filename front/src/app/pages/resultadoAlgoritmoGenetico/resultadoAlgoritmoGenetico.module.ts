import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { ResultadoAlgoritmoGeneticoListComponent } from './list/resultadoAlgoritmoGenetico-list.component';
import { ResultadoAlgoritmoGeneticoRoutes } from './resultadoAlgoritmoGenetico.routing';
import { HorarioComponent } from './horario/horario.component';


@NgModule({
  declarations: [
    ResultadoAlgoritmoGeneticoListComponent,
    HorarioComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ResultadoAlgoritmoGeneticoRoutes),
  ],
  exports: [
    ResultadoAlgoritmoGeneticoListComponent,
    HorarioComponent
  ],
  providers: [],
})

export class ResultadoAlgoritmoGeneticoModule { }
