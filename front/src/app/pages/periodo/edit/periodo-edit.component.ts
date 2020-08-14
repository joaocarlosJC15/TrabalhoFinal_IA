import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PeriodoService } from 'app/shared/services/periodo.service';
import { RestricaoHorarioPorDiaPeriodoService } from 'app/shared/services/restricaoHorarioPorDiaPeriodo.service';
import { DiaSemanaService } from 'app/shared/services/diaSemana.service';

import { Periodo } from 'app/shared/models/periodo.model';
import { RestricaoHorarioPorDiaPeriodo } from 'app/shared/models/restricaoHorarioPorDiaPeriodo.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { HorarioPorDia } from 'app/shared/models/horarioPorDia.model';
import { HorarioPorDiaDiaSemana } from 'app/shared/models/horarioPorDiaDiaSemana';
import { DiaSemana } from 'app/shared/models/diaSemana.model';

@Component({
  selector: 'periodo-edit-cmp',
  templateUrl: 'periodo-edit.component.html'
})

export class PeriodoEditComponent implements OnInit{

  periodoForm: FormGroup;
  periodo: Periodo;
  submissionForm: boolean;
  action: string;

  restricoes: HorarioPorDiaDiaSemana[] = [];
  columnsRestricoes: ColumnDatatable[] = [
    { name: 'ID', prop: 'id', maxWidth: 100 },
    { name: 'Nome', prop: 'horario_inicio', minWidth: 200, maxWidth: 200 },
    { name: 'Descrição', prop: 'horario_termino', minWidth: 300, maxWidth: 300 }
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private periodoService: PeriodoService,
    private restricaoHorarioPorDiaPeriodoService: RestricaoHorarioPorDiaPeriodoService,
    private diaSemanaService: DiaSemanaService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'novo') {
      this.action = 'novo';
      this.initializeForm();
    } else if (this.route.snapshot.url[1].path === 'editar') {
      this.action = 'editar';
      this.actionEdit();
    }
  }

  actionEdit(): void {
    this.route.params.subscribe(params => {
      let diasSemana: DiaSemana[];

      this.periodoService.get(params['id_periodo']).toPromise()
      .then(periodo => {
        this.initializeForm(periodo);
        this.periodo = periodo;

        return this.diaSemanaService.list().toPromise();
      })
      .then(diasSemanaResponse => {
        diasSemana = diasSemanaResponse;
        return this.restricaoHorarioPorDiaPeriodoService.get(params['id_periodo']).toPromise();
      })
      .then(restricoes => {
        this.restricoes = this.generateRestricoesHorarios(diasSemana, restricoes);
      })
    });
  }

  initializeForm(periodo: Periodo = null): void {
    this.periodoForm = new FormGroup({
      id: new FormControl({value: periodo ? periodo.id : null, disabled: true}),
      nome: new FormControl(periodo ? periodo.nome : null, Validators.required),
      descricao: new FormControl(periodo ? periodo.descricao : null)
    });
  }

  sendForm() {
    this.periodoForm.markAllAsTouched();

    if (this.periodoForm.valid) {
      this.submissionForm = true;

      const { id, nome, descricao } = this.periodoForm.getRawValue();
      const periodo = new Periodo(id, nome, descricao);

      this.periodoService.add(periodo).subscribe(periodo => {
        alert("Período criado com sucesso!");

        this.router.navigate(['periodos']);
      })
    }
  }

  generateRestricoesHorarios(diasSemana: DiaSemana[], restricoes: RestricaoHorarioPorDiaPeriodo[]): HorarioPorDiaDiaSemana[] {
    const horarios: HorarioPorDiaDiaSemana[] = [];
    const horariosRestricoes: HorarioPorDia[] = [];

    for (let restricao of restricoes) {
      horariosRestricoes.push(restricao.horario);
    }
    for (const dia of diasSemana){
      const horariosPorDiaDiaSemana = new HorarioPorDiaDiaSemana(dia);
      horariosPorDiaDiaSemana.setHorarios(horariosRestricoes);
      horarios.push(horariosPorDiaDiaSemana);
    }

    return horarios;
  }

  openModalForSelectHorario(modalReference) {
    this.modalService.open(modalReference, { size: 'xl', backdrop: 'static'})
  }

  getSelectedHorario(horario: HorarioPorDia) {
    if (this.searchExistisHorario(this.restricoes, horario) === -1) {
      this.modalService.dismissAll();

      this.addRestricao(this.periodo, horario);
    } else {
      alert("O período já possui restrição para o horário selecionado! Selecione outro horário.");
    }
  }

  addRestricao(periodo: Periodo, horario: HorarioPorDia) {
    this.restricaoHorarioPorDiaPeriodoService.add(periodo.id, horario.id).subscribe(restricao => {
      const index =  this.searchExistisHorario(this.restricoes, horario, true);

      this.restricoes[index].horariosGeradosDiaSemana.unshift(horario);
  
      this.updateRows();

      alert("Restrição adicionada com sucesso!")
    })
  }

  searchExistisHorario(restricoes: HorarioPorDiaDiaSemana[], horario: HorarioPorDia, searchByDiaSemana?: boolean): number {
    let index = -1;
    if (searchByDiaSemana) {
      index = restricoes.findIndex(element => {
        if (element.diaSemana.id === horario.fk_dia_semana) {
          return true;
        }
      })
    } else {
      for (let i = 0; i < restricoes.length; i = i + 1) {
        index = restricoes[i].horariosGeradosDiaSemana.findIndex(horarioDia => {
          if (horarioDia.id === horario.id) {
            return true;
          }
        });
  
        if (index !== -1) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  updateRows() {
    for (const restricao of this.restricoes) {
      restricao.horariosGeradosDiaSemana = [...restricao.horariosGeradosDiaSemana];
    }
  }
}
