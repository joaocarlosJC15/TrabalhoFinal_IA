import { ResultadoAlgoritmoGenetico } from "../../../entities/resultadoAlgoritmoGenetico";
import { AddHorarioGeradoEntity } from "../../horarioGerado/add/add-horarioGerado";

export interface AddResultadoAlgoritmoGeneticoEntity {
  fk_grade: number;
  tamanho_populacao: number;
	numero_geracoes_necessario: number;
	tamanho_torneio: number;
	taxa_cruzamento: number;
	taxa_mutacao: number;
	elitismo: boolean;
	tamanho_elitismo?: number;
	aptidao: number;
	data_inicio: Date;
  data_termino: Date;
  horariosGerados: AddHorarioGeradoEntity[];
}

export interface AddResultadoAlgoritmoGenetico {
  add(addRResultadoAlgoritmoGeneticoData: AddResultadoAlgoritmoGeneticoEntity): Promise<ResultadoAlgoritmoGenetico>
}