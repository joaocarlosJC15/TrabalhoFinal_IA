import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HorarioPorDiaService } from 'app/shared/services/horarioPorDia.service';
import { DiaSemanaService } from 'app/shared/services/diaSemana.service';

import { FormatTimePipe } from 'app/shared/pipes/format-time.pipe';

import { HorarioPorDia } from 'app/shared/models/horarioPorDia.model';
import { DiaSemana } from 'app/shared/models/diaSemana.model';

@Component({
  selector: 'horarioPorDia-edit-cmp',
  templateUrl: 'horarioPorDia-edit.component.html'
})

export class HorarioPorDiaEditComponent implements OnInit{

  horarioPorDiaForm: FormGroup;
  horarioPorDia: HorarioPorDia;
  diasSemanas: DiaSemana[];
  submissionForm: boolean;
  action: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private horarioPorDiaService: HorarioPorDiaService,
    private diaSemanaService: DiaSemanaService,
    private formatTimePipe: FormatTimePipe
  ) {}

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'novo') {
      this.action = 'novo';
      this.initializeForm();
    } else if (this.route.snapshot.url[1].path === 'editar') {
      this.action = 'editar';
      this.actionEdit();
    }

    this.diaSemanaService.list().subscribe(diasSemanas => {
      this.diasSemanas = diasSemanas;
    });
  }

  actionEdit(): void {
    this.route.params.subscribe(params => {
      this.horarioPorDiaService.get(params['id_horario_por_dia']).toPromise()
      .then(horarioPorDia => {
        this.initializeForm(horarioPorDia);
        this.horarioPorDia = horarioPorDia;
      })
    });
  }

  initializeForm(horarioPorDia: HorarioPorDia = null) {
    this.horarioPorDiaForm = new FormGroup({
      id: new FormControl({value: horarioPorDia ? horarioPorDia.id : null, disabled: true}),
      fk_dia_semana: new FormControl(horarioPorDia ? horarioPorDia.fk_dia_semana : null, Validators.required),
      horario_inicio: new FormControl(horarioPorDia ? this.formatTimePipe.transform(horarioPorDia.horario_inicio) : null, Validators.required),
      horario_termino: new FormControl(horarioPorDia ? this.formatTimePipe.transform(horarioPorDia.horario_termino) : null, Validators.required),
      qtde_aulas_simultaneas: new FormControl({value: horarioPorDia ? horarioPorDia.qtde_aulas_simultaneas : null, disabled: true}),
    });
  }

  sendForm() {
    this.horarioPorDiaForm.markAllAsTouched();

    if (this.horarioPorDiaForm.valid) {
      this.submissionForm = true;

      const { id, horario_inicio, horario_termino, fk_dia_semana } = this.horarioPorDiaForm.getRawValue();
      
      const horario = new HorarioPorDia(id, horario_inicio, horario_termino, Number(fk_dia_semana));

      this.horarioPorDiaService.add(horario).subscribe(horarioPorDia => {
        alert("Novo horário criado criado com sucesso!");

        this.router.navigate(['horariospordia']);
      })
    }
  }
}
