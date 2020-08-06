import { HorarioGerado } from "./HorarioGerado";

export interface AddResultadosAlgortimoGenetico {
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
	horarioGerado: HorarioGerado[];
}