import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GerarHorarioService } from 'app/shared/services/gerarHorario.service';

import { GerarHorario } from 'app/shared/models/gerarHorario.model';

@Component({
  selector: 'gerarHorario-cmp',
  templateUrl: 'gerarHorario.component.html'
})

export class GerarHorarioComponent implements OnInit{

  gerarHorarioForm: FormGroup;
  submissionForm: boolean;

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private gerarHorarioService: GerarHorarioService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.gerarHorarioForm = new FormGroup({
      tamanhoPopulacao: new FormControl(0, Validators.required),
      numeroGeracoes: new FormControl(0, Validators.required),
      tamanhoTorneio: new FormControl(0, Validators.required),
      taxaCruzamento: new FormControl(0, Validators.required),
      taxaMutacao: new FormControl(0, Validators.required),
      elitismo: new FormControl(false, Validators.required),
      tamanhoElitismo: new FormControl(0)
    });
  }

  gerarHorario(modal: any) {
    this.gerarHorarioForm.markAllAsTouched();

    if (this.gerarHorarioForm.valid) {
      this.submissionForm = true;
      const values: GerarHorario = this.gerarHorarioForm.getRawValue();

      this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static'})

      this.gerarHorarioService.generate(values).subscribe(result => {
        this.modalService.dismissAll();

        alert("Grade gerada com sucesso!");

        this.router.navigate(['resultados']);
      })
    }
  }
}
