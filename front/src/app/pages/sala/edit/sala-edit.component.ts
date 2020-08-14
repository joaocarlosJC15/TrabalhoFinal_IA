import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SalaService } from 'app/shared/services/sala.service';
import { RestricaoSalaHorarioPorDiaService } from 'app/shared/services/restricaoSalaHorarioPorDia.service';
import { DiaSemanaService } from 'app/shared/services/diaSemana.service';

import { FormatTimePipe } from 'app/shared/pipes/format-time.pipe';

import { Sala } from 'app/shared/models/Sala.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { HorarioPorDia } from 'app/shared/models/horarioPorDia.model';
import { HorarioPorDiaDiaSemana } from 'app/shared/models/horarioPorDiaDiaSemana';
import { DiaSemana } from 'app/shared/models/diaSemana.model';
import { RestricaoSalaHorarioPorDia } from 'app/shared/models/restricaoSalaHorarioPorDia.model';

@Component({
  selector: 'sala-edit-cmp',
  templateUrl: 'sala-edit.component.html'
})

export class SalaEditComponent implements OnInit{

  salaForm: FormGroup;
  sala: Sala;
  submissionForm: boolean;

  restricoes: HorarioPorDiaDiaSemana[] = [];
  columnsRestricoes: ColumnDatatable[] = [
    { name: 'ID', prop: 'id', maxWidth: 100 },
    { name: 'Horário início', prop: 'horario_inicio', minWidth: 200, maxWidth: 200, pipe: this.formatTimePipe },
    { name: 'Horário término', prop: 'horario_termino', minWidth: 300, maxWidth: 300, pipe: this.formatTimePipe }
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private salaService: SalaService,
    private restricaoSalaHorarioPorDiaService: RestricaoSalaHorarioPorDiaService,
    private diaSemanaService: DiaSemanaService,
    private modalService: NgbModal,
    private formatTimePipe: FormatTimePipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let diasSemana: DiaSemana[];

      this.salaService.get(params['id_sala']).toPromise()
      .then(sala => {
        this.initializeForm(sala);
        this.sala = sala;

        return this.diaSemanaService.list().toPromise();
      })
      .then(diasSemanaResponse => {
        diasSemana = diasSemanaResponse;
        return this.restricaoSalaHorarioPorDiaService.get(params['id_sala']).toPromise();
      })
      .then(restricoes => {
        this.restricoes = this.generateRestricoesHorarios(diasSemana, restricoes);
      })
    });
  }

  initializeForm(sala: Sala) {
    this.salaForm = new FormGroup({
      id: new FormControl({value: sala.id, disabled: true}),
      nome: new FormControl(sala.nome, Validators.required),
      descricao: new FormControl(sala.descricao)
    });
  }

  generateRestricoesHorarios(diasSemana: DiaSemana[], restricoes: RestricaoSalaHorarioPorDia[]): HorarioPorDiaDiaSemana[] {
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

      this.addRestricao(this.sala, horario);
    } else {
      alert("O período já possui restrição para o horário selecionado! Selecione outro horário.");
    }
  }

  addRestricao(sala: Sala, horario: HorarioPorDia) {
    this.restricaoSalaHorarioPorDiaService.add(sala.id, horario.id).subscribe(restricao => {
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
