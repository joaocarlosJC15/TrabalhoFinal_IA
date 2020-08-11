import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { GradeService } from '../services/grade.service';

@Injectable()
export class GradeGuard implements CanActivate {
  constructor(private gradeService: GradeService) {}

  canActivate(): boolean {
    if (this.gradeService.getIdGradeOnStorage()) {
      return true;
    }
    alert("Por favor, selecione primeiro uma grade");
    return false;
  }
}