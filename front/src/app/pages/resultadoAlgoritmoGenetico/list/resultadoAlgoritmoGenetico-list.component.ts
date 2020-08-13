import { Component, OnInit } from '@angular/core';

import { ResultadoAlgoritmoGeneticoService } from 'app/shared/services/resultadoAlgoritmoGenetico.service';

import { ResultadoAlgoritmoGenetico } from 'app/shared/models/resultadoAlgoritmoGenetico.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { Router } from '@angular/router';

@Component({
  selector: 'resultadoAlgo-list-cmp',
  templateUrl: 'resultadoAlgoritmoGenetico-list.component.html'
})

export class ResultadoAlgoritmoGeneticoListComponent implements OnInit{

  rows: ResultadoAlgoritmoGenetico[];
  columns: ColumnDatatable[] = [
    { name: 'ID', prop: 'id', maxWidth: 100},
    { name: 'Tamanho população', prop: 'tamanho_populacao', minWidth: 180, maxWidth: 180},
    { name: 'Gerações necessárias', prop: 'numero_geracoes_necessario', minWidth: 180, maxWidth: 180},
    { name: 'Tamanho torneio', prop: 'tamanho_torneio', minWidth: 150, maxWidth: 150},
    { name: 'Taxa cruzamento', prop: 'taxa_cruzamento', minWidth: 150, maxWidth: 150},
    { name: 'Taxa mutação', prop: 'taxa_mutacao', minWidth: 140, maxWidth: 140},
    { name: 'Elitismo', prop: 'elitismo', minWidth: 100, maxWidth: 100},
    { name: 'Tamanho elitismo', prop: 'tamanho_elitismo', minWidth: 180, maxWidth: 180},
    { name: 'Aptidão', prop: 'aptidao', minWidth: 100, maxWidth: 100},
    { name: 'Data Inicio', prop: 'data_inicio',minWidth: 200, maxWidth: 200},
    { name: 'Data Término', prop: 'data_termino', minWidth: 200, maxWidth: 200},
  ];

  constructor(
    public resultadoAlgoritmoGeneticoService: ResultadoAlgoritmoGeneticoService,
    public router: Router
  ) {
  }

  ngOnInit(){
    this.resultadoAlgoritmoGeneticoService.list().subscribe(result => {
      this.rows = result;
    });
  }

  doubleClick(resultadoAlgoritmo: ResultadoAlgoritmoGenetico) {
    this.router.navigate(['resultados/'+resultadoAlgoritmo.id+'/horarios']);
  }
}
